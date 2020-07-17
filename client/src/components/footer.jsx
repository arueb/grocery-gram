import React from "react";
import {
  FaGgCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    // <!-- Footer -->
    <footer className="page-footer font-small cyan darken-3 bg-info">
      {/* <!-- Footer Elements --> */}
      <div className="container">
        {/* <!-- Grid row--> */}
        <div className="row">
          {/* <!-- Grid column --> */}
          <div className="col-md-12 py-5">
            <div className="mb-5 flex-center">
              {/* <!-- Facebook --> */}
              <a className="fb-ic">
                {/* <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> */}
                <FaFacebook color="white" />
              </a>
              {/* <!-- Twitter --> */}
              <a className="tw-ic">
                <FaTwitter color="white" />
              </a>
              {/* <!-- Google +--> */}
              <a className="gplus-ic">
                <FaInstagram color="white" />
              </a>
              {/* <!--Linkedin --> */}
              <a className="li-ic">
                <FaLinkedin color="white" />
              </a>
              {/* <!--Instagram--> */}
              <a className="ins-ic">
                <FaPinterest color="white" />
              </a>
              {/* <!--Pinterest--> */}
              {/* <a class="pin-ic">
                <i class="fab fa-pinterest fa-lg white-text fa-2x"> </i>
              </a> */}
            </div>
          </div>
          {/* <!-- Grid column --> */}
        </div>
        {/* <!-- Grid row--> */}
      </div>
      {/* <!-- Footer Elements --> */}

      {/* <!-- Copyright --> */}
      <div class="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
    // <!-- Footer -->
  );
};

export default Footer;
