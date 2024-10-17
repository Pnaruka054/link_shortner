import React, { useState } from "react";
import "./home.css";
import Faq from "../FAQ/faq";
import ContactUs from "../ContactUs/contactUs";
import Nav_Bar from "../Nav_Bar/nav_bar";
import Footer from "../Footer/footer";
import {Link} from "react-router-dom"
import { useEffect } from "react";

const Home = () => {
  const jwtToken_state = localStorage.getItem('jwtToken_state');
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    if (jwtToken_state) {
      setDashboard(true)
    }
  }, []);
  return (
    <div>
      <div>
        <Nav_Bar />
      </div>
      <div className="position-relative">
        <div id="home_hero_bg" className="container-fluid full-height-lg">
          <div
            id="home_hero"
            className="container text-center text-light d-flex flex-column justify-content-center"
          >
            <div className="my-5 mt-md-0">
              <h2>EARN CASH BY SHARING YOUR SHORTENED LINKS!</h2>
            </div>
            <div>
              <form className="form-inline">
                <input
                  type="url"
                  id="home_form_input"
                  placeholder="Your URL Here"
                  required
                />
                <span>
                  <Link to={dashboard? '/member/dashboard': '/signup'}>
                    <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
                  </Link>
                </span>
              </form>
            </div>
            <div id="home_hero_three_section" className="row fs-5 mt-5">
              <div className="col">
                <div>
                  <p>
                    Register now and begin shortening your links to earn cash!
                  </p>
                </div>
                <div id="home_hero_first_section"></div>
              </div>
              <div className="col">
                <div>
                  <p>
                    Distribute your links on Facebook, Twitter, Reddit, YouTube,
                    and others to start earning!
                  </p>
                </div>
                <div id="home_hero_second_section"></div>
              </div>
              <div className="col">
                <div>
                  <p>
                    Make money for every click on your link that leads to your
                    URLs!
                  </p>
                </div>
                <div id="home_hero_third_section"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-evenly align-items-center">
        <div id="home_three_section" className="row fs-5 text-primary mt-5">
          <div className="col text-center">
            <div id="home_first_section"></div>
            <p>CREATE AN ACCOUNT</p>
          </div>
          <div className="col text-center">
            <div id="home_second_section"></div>
            <p>SHORTEN YOUR LINK</p>
          </div>
          <div className="col text-center">
            <div id="home_third_section"></div>
            <p>EARN MONEY</p>
          </div>
        </div>
      </div>
      <hr className="container mt-5" />
      <div className="container">
        <div className="text-center">
          <p className="text-warning-emphasis fs-5 m-auto">
            <i>Earn extra money</i>
          </p>
          <h3
            id="why_join_us_downline"
            className="fs-1 text-primary font-weight-bold"
          >
            WHY JOIN US?
          </h3>
        </div>
        <div className="container">
          <div
            id="home_three_three_pair"
            className="row fs-5 text-primary mt-5"
          >
            <div className="col min-width-300 text-center">
              <div id="home_first_first_pair"></div>
              <p>What is ShortnPay?</p>
              <p className="fs-6">
                ShortnPay is the highest-paying URL shortener of 2024 and the
                best option for making money online. Users can create short
                links that are not only free but also allow you to earn money!
                Now, you can generate income from home while managing and
                securing your links.
              </p>
            </div>
            <div className="col min-width-300 text-center">
              <div id="home_first_second_pair"></div>
              <p>How and how much do I earn?</p>
              <p className="fs-6">
                How can you start making money with ShortnPay? It’s simple—just
                follow these three steps: create an account, generate a link,
                and share it. You’ll earn money for every visit to your link.
                It’s that easy! With ShortnPay, you can earn up to $20 CPM.
              </p>
            </div>
            <div className="col min-width-300 text-center">
              <div id="home_first_third_pair"></div>
              <p>20% Referral Bonus</p>
              <p className="fs-6">
                The ShortnPay referral program is an excellent way to promote
                this fantastic service and boost your earnings with short links!
                When you refer friends, you'll receive 20% of their earnings for
                life. Spread the word and maximize your income!
              </p>
            </div>
          </div>
          <div className="row fs-5 text-primary mt-5">
            <div className="col min-width-300 text-center">
              <div id="home_second_first_pair"></div>
              <p>Featured Administration Panel</p>
              <p className="fs-6">
                Manage all features easily from the administration panel with
                just a click. If you're looking for the highest-paying URL
                shortener in India, the best site to shorten URLs and earn
                money, or simply the top URL shortener for 2024, ShortnPay.com
                is your ultimate solution.
              </p>
            </div>
            <div className="col min-width-300 text-center">
              <div id="home_second_second_pair"></div>
              <p>Detailed Stats</p>
              <p className="fs-6">
                Understand your audience and analyze in detail what generates
                the most income for you and which strategies to adopt. If you’re
                looking for alternatives to AdFly, Shorte.st, or OUO.io, then
                ShortnPay is the best link shortener for you.
              </p>
            </div>
            <div className="col min-width-300 text-center">
              <div id="home_second_third_pair"></div>
              <p>Low Minimum Payout</p>
              <p className="fs-6">
                You only need to earn $4.00 before you can get paid. We offer
                payments to all users via PayPal. If you’re searching for the
                best link shortener to earn money, or wondering which link
                shortener pays the most, then ShortnPay is the perfect choice
                for you.
              </p>
            </div>
          </div>
          <div className="row fs-5 text-primary mt-5">
            <div className="col min-width-300 text-center">
              <div id="home_third_first_pair"></div>
              <p>Highest Rates</p>
              <p className="fs-6">
                ShortnPay is one of the highest-paying URL shorteners of 2024,
                offering attractive CPM rates that allow publishers to earn
                money quickly. As a highly trusted URL shortener worldwide,
                ShortnPay.com stands out in the industry. For more information,
                you can check our reviews on sites like ReviewFoxy and
                Trustpilot.
              </p>
            </div>
            <div className="col min-width-300 text-center">
              <div id="home_third_second_pair"></div>
              <p>API</p>
              <p className="fs-6">
                Shorten links quickly and easily with our user-friendly API,
                bringing your creative and advanced ideas to life. Remember,
                ShortnPay is the highest-paying URL shortener of 2024 and the
                best option for making money this year.
              </p>
            </div>
            <div className="col min-width-300 text-center">
              <div id="home_third_third_pair"></div>
              <p>Support</p>
              <p className="fs-6">
                A dedicated support team is ready to help with any questions you
                may have, if you are searching for ShortnPay.com review or
                ShortnPay review then you can check many blogs where 95%
                comments are positive
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="container" />
      <div>
        <ContactUs />
      </div>
      <hr className="container" />
      <div id="home_faq">
        <Faq />
      </div>
      <hr className="container" />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
