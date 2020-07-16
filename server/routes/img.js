const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

// Based on example from https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
router.post('/', function(req, res) {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./public/images/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded.');
  });
});



//async (req, res) => {
//  console.log(req)
//  upload(req, res, function (err) {
 //   if (err instanceof multer.MulterError) {
 //     return res.status(500).json(err)
 ////   } else if (err) {
  //    return res.status(500).json(err)
//    }
//    return res.status(200).send(req.file)
//  })
  /*
  console.log("hiya");
  console.log(req);
  if (!req.body.file || Object.keys(req.body.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log("hiya2");
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.body.file;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("./public/images/filename.jpg", function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
  */
//});

module.exports = router;
