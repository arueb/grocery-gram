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
  const size = 25;
  return (
    <footer className="page-footer font-small cyan darken-3 bg-secondary">
      {/* <!-- Footer Elements --> */}
      <div className="container">
        {/* <!-- Grid row--> */}
        <div className="row">
          {/* <!-- Grid column --> */}
          <div className="col-md-12 py-3">
            <div className="mb-5 flex-center social-icons">
              {/* <!-- Facebook --> */}
              <a className="fb-ic mr-3">
                {/* <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> */}
                <FaFacebook color="white" size={size} />
              </a>
              {/* <!-- Twitter --> */}
              <a className="tw-ic mr-3">
                <FaTwitter color="white" size={size} />
              </a>
              {/* <!-- Google +--> */}
              <a className="gplus-ic mr-3">
                <FaInstagram color="white" size={size} />
              </a>
              {/* <!--Linkedin --> */}
              <a className="li-ic mr-3">
                <FaLinkedin color="white" size={size} />
              </a>
              {/* <!--Instagram--> */}
              <a className="ins-ic">
                <FaPinterest color="white" size={size} />
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
        <a href="https://mdbootstrap.com/"> Code Blue Team</a>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
    // <!-- Footer -->
  );
};

export default Footer;
