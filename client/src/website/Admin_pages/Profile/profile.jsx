import React, { useEffect, useState } from 'react';
import HomePageAdmin from '../Home_page_admin/home_page_admin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    place_state: '',
    zip_code: '',
    country: '',
    mobile_number: '',
    withdrawal_method: '',
    withdrawal_account_information: '',
  });

  const [submit_process_state, setSubmit_process_state] = useState(true);
  const [withdrawalMethods_state, setWithdrawalMethods_state] = useState([]);
  const [withdrawal_countryes_state, setwithdrawal_countryes_state] = useState([]);
  const navigate = useNavigate();
  const jwtToken_state = localStorage.getItem('jwtToken_state');

  const dataBase_home_get = async () => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/home_dataBase_get?jwtToken=${jwtToken_state}`);
      setUserData(response.data.userData[0]);
      if (response.data.userData[0]) {
        setFormData({
          name: response.data.userData[0].name || '',
          address: response.data.userData[0].address || '',
          city: response.data.userData[0].city || '',
          place_state: response.data.userData[0].place_state || '',
          zip_code: response.data.userData[0].zip_code || '',
          country: response.data.userData[0].country || '',
          mobile_number: response.data.userData[0].mobile_number || '',
          withdrawal_method: response.data.userData[0].withdrawal_method || '',
          withdrawal_account_information: response.data.userData[0].withdrawal_account_information || '',
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.jwtToken_message) {
        localStorage.removeItem('jwtToken_state');
        setUserData(null);
      }
    }
  };

  const dataBase_withdrawalMethods_get = async () => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/withdrawal/withdrawal_methods`)
      setWithdrawalMethods_state(response.data.msg)
    } catch (error) {
      console.error(error)
    }
  }

  const dataBase_withdrawalCountry_get = async () => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/withdrawal/withdrawal_country_get`)
      setwithdrawal_countryes_state(response.data.msg)
    } catch (error) {
      console.error(error)
    }
  }

  const dataBase_profile_update_patch = async (formData) => {
    try {
      let response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/userSignUp_data_update?gmail_address=${userData.gmail_address}`, formData);
      setSuccess(response.data.update_success_msg)
      setTimeout(() => {
        setSuccess('')
      }, 5000);
      setSubmit_process_state(true);
    } catch (error) {
      setSubmit_process_state(true);
      console.log(error)
    }
  }

  useEffect(() => {
    dataBase_withdrawalMethods_get()
    dataBase_withdrawalCountry_get()
  }, []);

  useEffect(() => {
    if (!jwtToken_state) {
      navigate('/login', { state: { jwt_expire: true } });
    } else {
      dataBase_home_get();
    }
  }, [jwtToken_state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataBase_profile_update_patch(formData)
    setSubmit_process_state(false);
  };

  const element = () => {
    return (
      <div className="box-body p-3">
        <form method="post" onSubmit={handleSubmit}>
          <legend>Profile & Billing Section</legend>
          {success && <div className="alert alert-success" id='alert_message_div'>{success}</div>}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="place_state">State</label>
                <input
                  type="text"
                  name="place_state"
                  className="form-control"
                  id="place_state"
                  value={formData.place_state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="zip_code">ZIP</label>
                <input
                  type="text"
                  name="zip_code"
                  className="form-control"
                  id="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  className="form-control"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose</option>
                  {withdrawal_countryes_state.map((country) => (
                    <option key={country.country_code} value={country.country_code}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Phone Number</label>
            <input
              type="text"
              name="mobile_number"
              className="form-control"
              id="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </div>

          <legend className='mt-3'>Withdrawal Info</legend>
          <div className="row">
            <div className="col-sm-6 order-2 order-md-1">
              <div className="form-group">
                <label htmlFor="withdrawal_method">Withdrawal Method</label>
                <select
                  name="withdrawal_method"
                  className="form-control"
                  id="withdrawal_method"
                  value={formData.withdrawal_method}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose</option>
                  {withdrawalMethods_state.map((method, index) => (
                    <option key={index} value={method.withdrawal_method}>{method.withdrawal_method}</option>
                  ))}
                </select>
              </div>
              <div className='mt-3' style={{fontSize:"14px"}}>
                <p>- For Payeer add your Account number. (Example: P123***)</p>
                <p>- For MM, add phone number.</p>
                <p>- For OVO, add OVO number.</p>
                <p>- For DANA, add DANA number.</p>
                <p>- For bKash, add your bKash number</p>
                <p>- For Airtm, add your email or Airtm username.</p>
                <p>- For UPI, add your UPI id</p>
                <p>- For Paytm, add your phone number</p>
                <p>- For PayPal, add your email.</p>
                <p>- For Bitcoin, add your wallet address or Binance account email address.</p>
                <p>- For USDT, add your USDT wallet address + network name or Binance account email address.</p>
                <p>- For ShopeePay, add phone number.</p>
                <p>- For bank transfer add your account holder name, Bank Name and Account number</p>
                <p>- For bank transfer (India) add your First name, Last name, Account number and IFSC code</p>
                <p>- For bank transfer (Indonesia) add your Bank Account Number and Bank Name</p>
                <p>- For Web Money, add your purse. (Example: Z123***)</p>
              </div>
            </div>
            <div className="col-sm-6 order-1 mt-4 mt-md-0 order-md-2">
              <table className="table table-hover table-striped" style={{ marginTop: "-2rem" }}>
                <thead>
                  <tr>
                    <th>Withdraw Method</th>
                    <th>Minimum Withdrawal Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalMethods_state.map((method, index) => (
                    <tr key={index}>
                      <td>{method.withdrawal_method}</td>
                      <td>${method.minimum_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="withdrawal_account_information">Withdrawal Account</label>
            <textarea
              name="withdrawal_account_information"
              className="form-control"
              id="withdrawal_account_information"
              rows="5"
              value={formData.withdrawal_account_information}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            disabled={!submit_process_state}
            className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} mt-3`}
            type="submit"
          >
            {submit_process_state ? "Submit" : <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <HomePageAdmin element={element()} />
    </div>
  );
};

export default Profile;
