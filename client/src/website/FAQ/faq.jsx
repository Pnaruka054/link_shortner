import Footer from "../Footer/footer";
import Nav_Bar from "../Nav_Bar/nav_bar";
import "./faq.css";
import React, { useState } from "react";

const FAQs = [
  {
    question: `How to Create an Account in ShortnPay.com?`,
    answer: `To create an account, click the “Sign Up” tab in the upper-right corner of the homepage. Then, select the option to register a new membership. You will see a simple form with four fields to fill out: username, email address, password, and confirm password. Accept the terms and conditions, and click the “Submit” button. Your account will be activated, and you’ll be logged in! Start shortening links and earning money!`,
  },
  {
    question: `How to Share Links on Facebook/Instagram?`,
    answer: `To share your shortened links on Facebook or Instagram without any issues, please use https://etextpad.com for guidance. You can also check the article titled 'How to Share ShortnPay.com Links on Facebook or Instagram' for more information.`,
  },
  {
    question: `How to Withdraw Earnings in ShortnPay?`,
    answer: `As an active user, you may want to withdraw the money you've earned. Remember, your profile must be fully completed to make a withdrawal. Fill in all required fields, save your details, and wait for the transfer. Please note that we process payments daily. The minimum withdrawal amount is just $3, and we offer various payment methods including PayPal, Airtm, Paysera, WebMoney, Perfect Money, Payeer, and UPI.`,
  },
  {
    question: `How to Write a Review for ShortnPay?`,
    answer: `ShortnPay is one of the highest-paying and most trusted link shortener sites in the world, having started its service in 2018. If you'd like to write a review for ShortnPay, please visit https://www.reviewfoxy.com/reviews/ShortnPay.com.`,
  },
  {
    question: `Is ShortnPay the Highest Paying URL Shortener Service?`,
    answer: `Yes, ShortnPay is recognized as one of the highest-paying URL shorteners of 2024 and a leading link shortener in the industry.`,
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div>
        <Nav_Bar />
      </div>
      <div id="faq" className="container mb-5">
        <div className="text-center mt-5">
          <h3
            id="faq_downline"
            className="fs-1 text-primary font-weight-bold mb-5"
          >
            FAQ
          </h3>
          <p className="text-warning-emphasis fs-5 mb-4">
            <i>Frequently Asked Questions</i>
          </p>
        </div>
        <div className="accordion" id="faqAccordion">
          {FAQs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${
                    activeIndex === index ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse ${
                  activeIndex === index ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
                style={{
                  maxHeight: activeIndex === index ? "1000px" : "0",
                  opacity: activeIndex === index ? "1" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                }}
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
