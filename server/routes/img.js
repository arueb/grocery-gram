const express = require("express");
const router = express.Router();
//const fileUpload = require("express-fileupload");
const Multer = require('multer');
const CLOUD_BUCKET = 'grocerygramapi_bucket';
const { format } = require('util');
const shortid = require('shortid');
var sizeOf = require('buffer-image-size');
const sharp = require('sharp');

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Creates a client from a Google service account key.
const storage = new Storage({ keyFilename: "gcloud_storage.json" });

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket(CLOUD_BUCKET);

// Modified from GCloud Example: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/appengine/storage/standard/app.js
// Process the file upload and upload to Google Cloud Storage.
router.post('/', multer.single('file'), (req, res, next) => {
  //console.log(req.file);

  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  var dimensions = sizeOf(req.file.buffer);
  req.file.width = dimensions.width;
  req.file.height = dimensions.height;

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(shortid.generate() + "_" + Date.now() + "." + req.file.originalname.split('.').pop());
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    console.log("File uploaded to " + publicUrl);

    const roundedCornerResizer = sharp()
      .resize(200, 200)
      .composite([{
        input: req.file.buffer,
        blend: 'dest-in'
      }])
      .png();

    roundedCornerResizer.createWriteStream()
      .on('error', function (err) { })
      .on('finish', function () { console.log("hey it worked?") })
      .end(fileContents);

    res.status(200).json({
      fullUrl: publicUrl,
      fullHeight: req.file.height,
      fullWidth: req.file.width
    });
  });

  blobStream.end(req.file.buffer);
});
/*
// Based on example from https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
router.post('/', async function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  console.log(sampleFile);

  // Uploads a local file to the bucket
  await storage.bucket(CLOUD_BUCKET).upload(sampleFile, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });

  res.send("file uploaded?");
});
*/
module.exports = router;
