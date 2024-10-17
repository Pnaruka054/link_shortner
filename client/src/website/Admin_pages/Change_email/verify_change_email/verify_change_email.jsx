import "./verify_change_email.css"
import HomePageAdmin from '../../Home_page_admin/home_page_admin';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const VerifyChangeEmail = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submit_process_state, setSubmit_process_state] = useState(true);
    const [resend_disabled, setResend_disabled] = useState(false);
    const [email_obj_state, setEmail_obj_state] = useState(true);
    const [timer, setTimer] = useState(60);
    const [otp, setOtp] = useState('');
  
    const navigation = useNavigate();

    useEffect(() => {
        const currentEmail = sessionStorage.getItem('currentEmail');
        const gmail_address = sessionStorage.getItem('gmail_address');
        let obj = {
            gmail_address,
            currentEmail
        }
        setEmail_obj_state(obj);
    }, []);

    
    useEffect(() => {
        if (sessionStorage.getItem('currentEmail') === null || sessionStorage.getItem('gmail_address') === null) {
            navigation('/member/users/change_email');
        }
    }, [navigation]);

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setResend_disabled(false);
        }
        return () => clearInterval(interval);
    }, [timer]);


    const dataBase_verify_resend_email_req = async (obj) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/userVerify_changeEmail_resend_otp`, obj);
            setSuccess(response.data.msg)
            setSubmit_process_state(true)
        } catch (error) {
            setSubmit_process_state(true)
            setSuccess("")
            console.log(error);
            setError(error.response.data.error_msg)
        }
    }

    const dataBase_verify_email_req = async (obj) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/userVerify_changeEmail_otp`, obj);
            setSuccess(response.data.success_msg)
            setSubmit_process_state(true)
            localStorage.removeItem('jwtToken_state')
        } catch (error) {
            setSubmit_process_state(true)
            setSuccess("")
            setError(error.response.data.error_msg)
        }
    }
    
    const resend_otp = (e) => {
        e.preventDefault();
        if (resend_disabled) return; // Prevent request if disabled
        setResend_disabled(true);
        setTimer(60); // Reset timer
        dataBase_verify_resend_email_req(email_obj_state);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit_process_state(false)
    
        const obj = {
            gmail_address: email_obj_state.gmail_address,
            otp
        };
        dataBase_verify_email_req(obj)
      };

    let element = () =>{
    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="col-md-4">
            <h2 className="text-center mb-4">OTP Verification</h2>
                {error && <div className="alert alert-warning" id='alert_message_div'>{error}</div>}
                {success && <div className="alert alert-success" id='alert_message_div'>{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">New Email ID</label>
                    <input
                        id="verify_email_address"
                        type="text"
                        className="form-control"
                        value={email_obj_state.gmail_address}
                        readOnly
                    />
                </div>
                <button
                    type="button"
                    className={`btn ${resend_disabled ? "btn-secondary" : "btn-danger"} mb-3`}
                    onClick={resend_otp}
                    disabled={resend_disabled}
                >
                    {resend_disabled ? `Resend (${timer}s)` : 'Resend'}
                </button>
                <div className="mb-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                        type="number"
                        className="form-control"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button style={{ width: "40%" }} type="submit" disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} w-100`}>
                        {submit_process_state ? "Verify" : <i className="fa-sharp-duotone fa-solid fa-loader fa-spin-pulse"></i>}
                    </button>
                </div>
            </form>
        </div>
        </div>
    )}

    return (
        <div>
            <HomePageAdmin element={element()} />
        </div>
    );
}

export default VerifyChangeEmail;
