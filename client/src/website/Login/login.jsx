import { Link, useLocation, useNavigate } from 'react-router-dom';
import './login.css';
import Nav_Bar from '../Nav_Bar/nav_bar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleLogin } from "@react-oauth/google";


const Login = () => {
  const [email_state, setEmail_state] = useState('');
  const [password_state, setPassword_state] = useState('');
  const [rememberMe_state, setRememberMe_state] = useState(false);
  let [submit_process_state, setSubmit_process_state] = useState(true)
  let [error_state, setError_state] = useState('')
  const jwtToken_state = localStorage.getItem('jwtToken_state');
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    if (jwtToken_state) {
      setDashboard(true)
    }
  }, []);

  let navigation = useNavigate()
  let login_error_alert = document.getElementById('login_error_alert')

  let dataBase_login = async (obj) => {
    try {
      let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`, obj)
      setError_state('')
      if (response) {
        navigation('/member/dashboard')
        localStorage.setItem('jwtToken_state', response.data.jwtToken_msg)
      }
      setSubmit_process_state(true)
    } catch (error) {
      setSubmit_process_state(true)
      if (error.response.data.login_invalid_gmailPassword_msg || error.response.data.login_invalid_password_msg || error.response.data.login_error_array_msg) {
        login_error_alert.classList.remove('d-none')
        if (error.response.data.login_invalid_gmailPassword_msg) {
          setError_state(error.response.data.login_invalid_gmailPassword_msg)
          setTimeout(() => {
            login_error_alert.classList.add('d-none')
          }, 4000);
        } else if (error.response.data.login_invalid_password_msg) {
          setError_state(error.response.data.login_invalid_password_msg)
          setTimeout(() => {
            login_error_alert.classList.add('d-none')
          }, 4000);
        } else {
          setError_state(error.response.data.login_error_array_msg[0].msg)
          setTimeout(() => {
            login_error_alert.classList.add('d-none')
          }, 4000);
        }
      }
    }
  }

  const login_submit = (e) => {
    e.preventDefault();
    const obj = {
      gmail_id: email_state,
      password: password_state,
      rememberMe_state,
    };
    dataBase_login(obj)
    setSubmit_process_state(false)
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) { 
        let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user_signUp_login_google?google_code=${authResult.code}&referral_id_signup=undefined&date=undefined`);
        if (response) {
          navigation('/member/dashboard')
          localStorage.setItem('jwtToken_state', response.data.jwtToken_msg)
        }
      } else {
        throw new Error(authResult);
      }
    } catch (error) {
      console.log(error);
      setError_state([error.response.data.error_msg]);
      setTimeout(() => {
        setError_state("");
      }, 4000);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    googleLogin();
  };

  if (dashboard) {
    navigation("/member/dashboard")
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div>
        <Nav_Bar />
      </div>
      <div className="col-md-6">
        <h2 className="text-center mb-4">Login</h2>
        <div id='alert_message_div'>
          <div id='login_jwt_expire_error' className="alert alert-danger alert-dismissible fade show d-none" role="alert">
            <strong>Your token Expired</strong>, Please Login Again
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <div id='login_error_alert' style={{whiteSpace:"nowrap"}}>
            {error_state && (
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                {error_state}
              </div>
            )}
          </div>

        </div>
        <form onSubmit={login_submit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="emailOrUsername"
              placeholder="Enter your email or username"
              value={email_state}
              onChange={(e) => setEmail_state(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password_state}
              onChange={(e) => setPassword_state(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input border border-primary"
              id="rememberMe"
              checked={rememberMe_state}
              onChange={(e) => setRememberMe_state(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <button type="submit" disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} w-100`}>
            {submit_process_state ? "Login" : <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
          <button type='button' onClick={handleGoogleLogin} className="btn btn-outline-dark w-100 mt-3">
            <i className="fa-brands fa-google"></i>
            &nbsp;
            Login with Google
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/forget_password">I Forgot My Password</Link>
        </div>
        <div className="mt-3 text-center">
          <span>Don’t have an account? </span>
          <Link className='text-nowrap' to="/signup">Register a New Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
