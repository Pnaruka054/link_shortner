import { useEffect, useState } from 'react';
import './reset_page.css'; // You can create this CSS file for any additional styles
import Nav_Bar from '../../Nav_Bar/nav_bar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Page_Not_Found from '../../404_Page/page_Not_Found';

const ResetPage = () => {
    const [newPassword_state, setNewPassword_state] = useState('');
    const [confirmPassword_state, setConfirmPassword_state] = useState('');
    let [response_reset_password_post_post, setResponse_reset_password_post] = useState(null)
    const navigation = useNavigate()
    let [verify_get_state, setError_Verify_get_state] = useState(true)
    let [verify_post_state, setError_Verify_post_state] = useState(true)
    let [submit_process_state, setSubmit_process_state] = useState(true)

    let parms = useParams().id
    const dataBase_update_Password_get = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/resetPasswordForm_get/${parms}`);
            setError_Verify_get_state(false)
        } catch (error) {
            setError_Verify_get_state(true)
        }
    }
    useEffect(() => {
        dataBase_update_Password_get()
    }, [])


    let reset_Password_alert_success = document.getElementById("reset_Password_alert_success")
    let reset_Password_alert_danger = document.getElementById('reset_Password_alert_danger')
    const dataBase_reset_password_post = async (obj) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/resetPassword_Form/${parms}`, obj);
            setResponse_reset_password_post(response.data.msg)
            reset_Password_alert_success.classList.remove('d-none')
            setTimeout(() => {
                reset_Password_alert_success.classList.add('d-none')
                navigation("/login")
            }, 5000);
            reset_Password_alert_danger.classList.add('d-none')
            setSubmit_process_state(true)
        } catch (error) {
            setSubmit_process_state(true)
            if (error.response) {
                console.error(error)
                reset_Password_alert_success.classList.add('d-none')
                let msg = error.response.data.msg
                setError_Verify_post_state(msg)
                reset_Password_alert_danger.classList.remove('d-none')
                setTimeout(() => {
                    reset_Password_alert_danger.classList.add('d-none')
                }, 5000);

            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let reset_page_error_div = document.getElementsByClassName("reset_page_error_div")[0]
        if (newPassword_state !== confirmPassword_state) {
            reset_page_error_div.classList.remove("d-none")
            setTimeout(() => {
                reset_page_error_div.classList.add("d-none")
            }, 4000);
            return
        }
        let obj = {
            password: newPassword_state
        }
        dataBase_reset_password_post(obj);
        setSubmit_process_state(false)
    };

    if (verify_get_state) {
        return (
            <div>
                <Page_Not_Found />
            </div>
        )
    }
    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div>
                <Nav_Bar />
            </div>
            <div className="col-md-6">
                <h2 className="text-center mb-4">Reset Password</h2>
                <div>
                    <div className="alert alert-danger reset_page_error_div d-none" role="alert">
                        Password & Confirm Password is Not Matched
                    </div>
                    <div id='reset_Password_alert_success' className="alert alert-success d-none" role="alert">
                        {response_reset_password_post_post}
                    </div>
                    <div id='reset_Password_alert_danger' className="alert alert-danger d-none" role="alert">
                        {verify_post_state}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter new password"
                            value={newPassword_state}
                            onChange={(e) => setNewPassword_state(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword_state}
                            onChange={(e) => setConfirmPassword_state(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} w-100`}>
                        {submit_process_state ? "Reset Password" : <i className="fa-solid fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPage;
