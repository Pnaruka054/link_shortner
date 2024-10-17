import { Link } from "react-router-dom";
import "./footer.css"

const Footer = () => {
    return (
      <footer className="bg-primary text-light">
        <div className="payment-methods">
          <div id="home_footer" className="container text-center">
            <img src="/payeer.png" alt="" />
            <img src="/webmoney.png" alt="" />
            <img src="/perfectmoney.png" alt="" />
            <img src="/paypal.png" alt="" />
          </div>
        </div>
        <div className="copyright-container">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-center mb-4">
                <ul className="list-inline d-flex flex-wrap justify-content-center">
                  <li className="mx-3">
                    <Link
                      className="text-light"
                      to="/privacypolicy"
                    >
                      <span>Privacy Policy</span>
                    </Link>
                  </li>
                  <li className="mx-3">
                    <Link
                      className="text-light"
                      to="/termsofuse"
                    >
                      <span>Terms of Use</span>
                    </Link>
                  </li>
                  <li className="mx-3">
                    <Link
                      className="text-light"
                      to="/dmca"
                    >
                      <span>DMCA</span>
                    </Link>
                  </li>
                  <li className="mx-3">
                    <Link
                      className="text-light"
                      to="/contactUs"
                    >
                      <span>Contact Us</span>
                    </Link>
                  </li>
                  <li className="mx-3">
                    <Link className="text-light" to="/faq">
                      <span>FAQ</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-12 text-end text-nowrap text-center mb-4">
                Copyright © ShortnPay 2024
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;
