import Nav_Bar from "../Nav_Bar/nav_bar";
import "./contactUs.css";
import React, { useState } from "react";
import axios from 'axios';

const ContactUs = ({ style }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  let [submit_process_state, setSubmit_process_state] = useState(true)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit_process_state(false); // Set to false when starting to submit
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/add_to_sheet`, formData);
      setSubmit_process_state(true); // Set back to true if successful
    } catch (error) {
      setSubmit_process_state(true); // Set back to true on error
      console.log(error);
    }
  };

  return (
    <div>
      <div className={style}>
        <Nav_Bar />
      </div>
      <div
        id="ContactUs"
        className="container d-flex justify-content-center align-items-center"
      >
        <div className="col-10">
          <h2 className="text-center text-primary fs-1 mt-3">Contact Us</h2>
          <p className="text-center text-warning">Get in touch!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Subject *</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Message *</label>
              <textarea
                name="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="consent"
                className="form-check-input"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">
                I consent to having this website store my submitted information
                so they can respond to my inquiry
              </label>
            </div>
            <button type="submit" disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} w-100 mb-5`}>
              {submit_process_state ? "Send Message" : <i className="fa-sharp-duotone fa-solid fa-loader fa-spin-pulse"></i>}
            </button>
          </form>
          <div className="mb-5 fst-italic">
            Need help or have any questions? We’re here to assist you! Please fill out the contact form below with your details and message, and our support team will reach out to you as soon as possible. We strive to respond promptly and address all inquiries thoroughly. Your feedback is important to us, and we look forward to assisting you! Please note that by submitting this form, you may also receive announcements and promotional emails from us.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
