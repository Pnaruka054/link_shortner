import { useState } from 'react';
import axios from 'axios';
import './change_password.css';
import HomePageAdmin from '../Home_page_admin/home_page_admin';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userData, setUserData] = useState([]);
  const [submitProcess, setSubmitProcess] = useState(true);
  const jwtToken_state = localStorage.getItem('jwtToken_state');

  function getUserData(data) {
    setUserData(data);
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New Password & Confirm Password do not match');
      setTimeout(() => setError(''), 5000);
      return;
    }

    if (!jwtToken_state) {
      setError('Unauthorized: No token found.');
      return;
    }

    const obj = {
      currentPassword,
      password: newPassword,
    };

    try {
      setSubmitProcess(false);
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/change_password?jwtToken=${jwtToken_state}`,
        obj
      );

      if (response.status === 200) {
        setSuccess('Password changed successfully!');
        // Reset fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setSuccess('');
          localStorage.removeItem('jwtToken_state');
        }, 5000);
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.msg : 'An error occurred. Please try again.'
      );
    } finally {
      setSubmitProcess(true);
    }
  };

  const element = () => {
    return (
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="col-10 col-sm-8 col-lg-6">
          <h2 className="text-center my-4">Change Password</h2>
          {error && (
            <div className="alert alert-warning" role="alert" id='alert_message_div'>
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert" id='alert_message_div'>
              {success}
            </div>
          )}
          <form onSubmit={handleChangePassword}>
            <div className={`mb-3 ${userData.google_id ? "d-none" : "d-block"}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Current Password"
                name="currentPassword" // Added name attribute
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required={!userData.google_id} // Use boolean for required attribute
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                name="newPassword" // Added name attribute
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
                name="confirmPassword" // Added name attribute
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={!submitProcess}
              className={`btn ${!submitProcess ? "btn-secondary" : "btn-primary"} w-100 mb-md-auto mb-4`}
            >
              {submitProcess ? "Change Password" : <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <HomePageAdmin getUserData={getUserData} element={element()} />
    </div>
  );
};

export default ChangePassword;
