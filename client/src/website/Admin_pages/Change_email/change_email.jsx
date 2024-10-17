import "./change_email.css";
import HomePageAdmin from "../Home_page_admin/home_page_admin";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [gmail_address, setGmail_address] = useState('');
  const [error, setError] = useState('');
  const [submitProcess, setSubmitProcess] = useState(true);

  const jwtToken_state = localStorage.getItem('jwtToken_state');

  const navigation = useNavigate()

  const dataBase_user_get = async () => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/home_dataBase_get?jwtToken=${jwtToken_state}`);
      if (response.data.userData) {
        setCurrentEmail(response.data.userData.gmail_address)
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.jwtToken_message) {
        localStorage.removeItem('jwtToken_state');
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    dataBase_user_get();
  }, [jwtToken_state]);


  const dataBase_verify_resend_email_req = async (obj) => {
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/userVerify_changeEmail_resend_otp`, obj);
      sessionStorage.setItem('currentEmail', currentEmail)
      sessionStorage.setItem('gmail_address', gmail_address)
      navigation('/member/users/verify_change_email')
    } catch (error) {
      setError(error.response.data.msg);
    }
  }

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setSubmitProcess(false)

    if (newEmail !== gmail_address) {
      setError('New email and re-entered email do not match.');
      setSubmitProcess(true)
      return;
    }

    const obj = {
      currentEmail,
      gmail_address,
    };
    dataBase_verify_resend_email_req(obj)
  };

  let element = () => {
    return (
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="col-10 col-sm-8 col-lg-6">
          <h2 className="text-center my-4">Change Email</h2>
          {error && <div className="alert alert-warning" id='alert_message_div'>{error}</div>}
          <form onSubmit={handleChangeEmail}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={currentEmail}
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Re-enter New Email"
                value={gmail_address}
                onChange={(e) => setGmail_address(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={!submitProcess} className={`btn ${!submitProcess ? "btn-secondary" : "btn-primary"} mb-md-auto mb-4 w-100`}>
              {submitProcess ? "Change Email" : <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div>
      <HomePageAdmin element={element()} />
    </div>
  );
};

export default ChangeEmail;
