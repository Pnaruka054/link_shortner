import { useEffect, useState } from "react";
import "./verify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const [otp, setOtp] = useState('');
    const [gmail_state, setGmail_state] = useState('');
    const [success_state, setSuccess_state] = useState(null);
    const [error_not_exist_state, setError_not_exist_state] = useState(null);
    const [submit_process_state, setSubmit_process_state] = useState(true);
    const [resend_disabled, setResend_disabled] = useState(false);
    const [timer, setTimer] = useState(60);

    const navigation = useNavigate();

    useEffect(() => {
        const gmail_id = sessionStorage.getItem('gmail_id');
        setGmail_state(gmail_id);
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('gmail_id') === null) {
            navigation('/');
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

    let verify_alert_not_exist = document.getElementById('verify_alert_not_exist')
    let verify_alert_success = document.getElementById('verify_alert_success')
    const dataBase_verify_resend_email_req = async (obj) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/verify_resend_otp`, obj);
            setSuccess_state(response.data.msg)
            verify_alert_success.classList.remove('d-none')
            setTimeout(() => {
                verify_alert_success.classList.add('d-none');
            }, 4000);
        } catch (error) {
            verify_alert_success.classList.add('d-none')
            let verify = '404 Bad Resend Request'
            setError_not_exist_state(verify)
            verify_alert_not_exist.classList.remove('d-none')

            if (verify_alert_not_exist.getAttribute('class') === 'alert alert-danger signUp_alert') {
                setTimeout(() => {
                    verify_alert_not_exist.classList.add('d-none')
                }, 4000);
            }
        }
    }

    const resend_otp = (e) => {
        e.preventDefault();
        if (resend_disabled) return; // Prevent request if disabled
        setResend_disabled(true);
        setTimer(60); // Reset timer
        dataBase_verify_resend_email_req({ gmail_address: gmail_state });
    };

    const database_post_otp = async (obj) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/varify_otp`, obj);
            document.getElementById('verify_alert_not_exist').classList.add('d-none');
            setSuccess_state(response.data.verify_success_msg);
            document.getElementById('verify_alert_success').classList.remove('d-none');
            setTimeout(() => {
                document.getElementById('verify_alert_success').classList.add('d-none');
                navigation('/login');
                sessionStorage.removeItem('gmail_id');
            }, 4000);
            setSubmit_process_state(true)
        } catch (error) {
            setSubmit_process_state(true)
            verify_alert_success.classList.add('d-none')
            if (error.response.data.verify_error_array_msg) {
                let verify_error_array_msg = error.response.data.verify_error_array_msg
                verify_alert_not_exist.classList.remove('d-none')
                setError_not_exist_state(verify_error_array_msg)
            } else if (error.response.data.verify_error_otp_not_matched_msg) {
                let verify_error_otp_not_matched_msg = error.response.data.verify_error_otp_not_matched_msg
                verify_alert_not_exist.classList.remove('d-none')
                setError_not_exist_state(verify_error_otp_not_matched_msg)
            } else if (error.response.data.verify_error_otp_already_verified_msg) {
                let verify_error_otp_already_verified_msg = error.response.data.verify_error_otp_already_verified_msg
                verify_alert_not_exist.classList.remove('d-none')
                setError_not_exist_state(verify_error_otp_already_verified_msg)
            } else {
                let verify = '404 Bad Request'
                verify_alert_not_exist.classList.remove('d-none')
                setError_not_exist_state(verify)
            }

            if (verify_alert_not_exist.getAttribute('class') === 'alert p-1 alert-danger signUp_alert') {
                setTimeout(() => {
                    verify_alert_not_exist.classList.add('d-none')
                }, 4000);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            gmail_address: gmail_state,
            otp
        };
        database_post_otp(obj);
        setSubmit_process_state(false);
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-4">
                <h2 className="text-center mb-4">OTP Verification</h2>
                <div>
                    <div id="alert_message_div">
                        <div id='verify_alert_not_exist' className="alert alert-danger signUp_alert d-none" role="alert">
                            {error_not_exist_state}
                        </div>
                        <div id='verify_alert_success' className="alert alert-primary d-none" role="alert">
                            {success_state}
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">User ID</label>
                        <input
                            id="verify_email_address"
                            type="text"
                            className="form-control"
                            value={gmail_state}
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
                        <button style={{ width: "40%" }} type="submit" disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"}`}>
                            {submit_process_state ? "Verify" : <i className="fa-solid fa-spinner fa-spin"></i>}
                        </button>
                        <button
                            style={{ width: "40%" }}
                            onClick={() => navigation("/login")}
                            type="button"
                            className="btn btn-info"
                        >
                            Skip
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Verify;
