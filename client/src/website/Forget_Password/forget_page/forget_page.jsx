import { useState } from 'react';
import './forget_page.css'; // You can create this CSS file for any additional styles
import Nav_Bar from '../../Nav_Bar/nav_bar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPage = () => {
    let [gmailID_state, setGmailID_state] = useState('')
    let [success_state, setSuccess_state] = useState('')
    let [error_not_exist_state, setError_not_exist_state] = useState('')
    let [submit_process_state, setSubmit_process_state] = useState(true)

    const navigation = useNavigate()

    let forgotPassword_alert_success = document.getElementById('forgotPassword_alert_success')
    let forgotPassword_alert_not_exist = document.getElementById('forgotPassword_alert_not_found')
    const dataBase_forgotPassword_post = async (event) => {
        event.preventDefault()
        try {
            setSubmit_process_state(false)
            let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/forgotPassword_dataBase_post`, { gmailID_state })
            setSuccess_state(response.data.forgotPassword_success_msg)
            forgotPassword_alert_not_exist.classList.add('d-none')
            forgotPassword_alert_success.classList.remove('d-none')
            if (forgotPassword_alert_success.getAttribute('class') === 'alert p-1 alert-success') {
                setTimeout(() => {
                    navigation('/login')
                    forgotPassword_alert_success.classList.add('d-none')
                }, 6000);
            }
            setSubmit_process_state(true)
        } catch (error) {
            setSubmit_process_state(true)
            forgotPassword_alert_success.classList.add('d-none')
            console.error(error)
            if (error.response.data.forgotPassword_error_notExist_msg) {
                let forgotPassword_error_notExist_msg = error.response.data.forgotPassword_error_notExist_msg
                setError_not_exist_state(forgotPassword_error_notExist_msg)
                forgotPassword_alert_not_exist.classList.remove('d-none')
                if (forgotPassword_alert_not_exist.getAttribute('class') === 'alert p-1 alert-danger') {
                    setTimeout(() => {
                        forgotPassword_alert_not_exist.classList.add('d-none')
                    }, 5000);
                }
            } else {
                setError_not_exist_state(null)
                forgotPassword_alert_not_exist.classList.add('d-none')
            }
        }
    }

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div>
                <Nav_Bar />
            </div>
            <div className="col-md-6">
                <h2 className="text-center mb-4">Forgot Password</h2>
                <div id='alert_message_div'>
                    <div id='forgotPassword_alert_success' className="alert p-1 alert-success d-none" role="alert">
                        {success_state}
                    </div>
                    <div id='forgotPassword_alert_not_found' className="alert p-1 alert-danger d-none" role="alert">
                        {error_not_exist_state}
                    </div>
                </div>
                <form onSubmit={dataBase_forgotPassword_post}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={gmailID_state}
                            onChange={(e) => setGmailID_state(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} w-100`}>
                    {submit_process_state? "Send Link" : <i className="fa-sharp-duotone fa-solid fa-loader fa-spin-pulse"></i>} 
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <span>Remembered your password? </span>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPage;
