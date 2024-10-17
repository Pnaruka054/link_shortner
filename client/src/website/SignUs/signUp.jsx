import './signUp.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import Nav_Bar from '../Nav_Bar/nav_bar';
import { useGoogleLogin } from "@react-oauth/google";

const Signup = ({ referral_status }) => {
  let { id } = useParams();
  const jwtToken_state = localStorage.getItem('jwtToken_state');
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    if (jwtToken_state) {
      setDashboard(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    gmail_address: '',
    password: '',
    reenterPassword: '',
    terms: false,
  });

  const [error, setError] = useState([]);
  let [submit_process_state, setSubmit_process_state] = useState(true);

  const navigation = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const dataBase_signUp = async (obj) => {
    try {
      let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/signUp`, obj);
      setSubmit_process_state(true);
      if (response.data.user) {
        sessionStorage.setItem('gmail_id', response.data.user.gmail_address);
        navigation('/verify');
      }
    } catch (error) {
      setSubmit_process_state(true);
      if (typeof (error.response.data.error_msg) === 'object') {
        let error_array = [];
        for (let a of error.response.data.error_msg) {
          error_array.push(a.msg);
        }
        setError(error_array);
        setTimeout(() => {
          setError("");
        }, 4000);
      } else {
        setError([error.response.data.error_msg]);
      }
    }
  };

  const getCurrentTime = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/withdrawal/current_time`);
    return new Date(response.data.time); // Convert server time to Date object
  };

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const formattedDate = date.toLocaleString('en-GB', options).replace(',', '');
    return formattedDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let password = document.getElementById("password");
    let reenterPassword = document.getElementById("reenterPassword");
    if (password.value !== reenterPassword.value) {
      setError(["Password & confirm password do not match."]);
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const now = await getCurrentTime();
    const formattedDate = formatDate(now);

    let obj = {
      name: formData.name,
      mobile_number: Number(formData.mobile_number),
      gmail_address: formData.gmail_address,
      password: formData.password,
      ...(referral_status && { referral_id_signup: id, date: formattedDate }),
    };
    dataBase_signUp(obj);
    setSubmit_process_state(false);
  };

  const responseGoogle = async (authResult) => {
    let referral_track = [];
    const now = await getCurrentTime();
    if (referral_status) {
      referral_track.push(id, formatDate(now))
    }
		try {
			if (authResult["code"]) {
				let response = await axios.get(`http://localhost:8000/api/user_signUp_login_google?google_code=${authResult.code}&referral_id_signup=${referral_track[0]}&date=${referral_track[1]}`); 
        if(response){
          navigation('/member/dashboard')
          localStorage.setItem('jwtToken_state', response.data.jwtToken_msg)
        }
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (error) {
      if (typeof (error.response.data.error_msg) === 'object') {
        let error_array = [];
        for (let a of error.response.data.error_msg) {
          error_array.push(a.msg);
        }
        setError(error_array);
        setTimeout(() => {
          setError("");
        }, 4000);
      } else {
        setError([error.response.data.error_msg]);
        setTimeout(() => {
          setError("");
          navigation('/signup');
        }, 4000);
      }
		}
	};

  const googleSignup = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  
  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    googleSignup(); 
  };
  

  if (dashboard) {
    navigation("/member/dashboard");
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div>
        <Nav_Bar />
      </div>
      <div className="col-md-6 d-inline-block" style={{marginBottom:"-100px"}}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <div id='alert_message_div'>
          {error.length > 0 && error.map((value, index) => (
            <div className="alert alert-danger" key={index}>{value}</div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              id="mobile_number"
              placeholder="Enter your mobile number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="gmail_address"
              placeholder="Enter your email"
              value={formData.gmail_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="reenterPassword"
              placeholder="Re-enter your password"
              value={formData.reenterPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input pointer border border-primary"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label className="form-check-label pointer" htmlFor="terms">
              I agree to the Terms of Use and Privacy Policy.
            </label>
          </div>
          <button type="submit" disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} w-100`}>
            {submit_process_state ? "Sign Up" : <i className="fa-sharp-duotone fa-solid fa-loader fa-spin-pulse"></i>}
          </button>

          {/* Divider and Google Button */}
          <div className="text-center my-3 position-relative">
            <hr className="position-absolute" style={{ top: '0%', width: '45%' }} />
            <span className="bg-white px-2">or</span>
            <hr className="position-absolute" style={{ top: '0%', width: '45%', right: "0" }} />
          </div>
          <button type='button' onClick={handleGoogleSignUp} className="btn btn-danger w-100">
            <i className="fa-brands fa-google"></i>
            &nbsp;
            Sign Up with Google
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already registered? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
