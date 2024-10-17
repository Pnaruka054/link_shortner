import "./withdraw.css"
import HomePageAdmin from '../Home_page_admin/home_page_admin';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Withdraw = () => {
    const [balance, setBalance] = useState(0.0000);
    const [pendingWithdraw, setPendingWithdraw] = useState(0.0000);
    const [totalWithdraw, setTotalWithdraw] = useState(0.0000);
    const [userID_DB_state, setUserID_DB_state] = useState('');
    const [withdrawal_records_state, setWithdrawal_records_state] = useState([]);
    const jwtToken_state = localStorage.getItem('jwtToken_state');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    let [submit_process_state, setSubmit_process_state] = useState(true)

    function getUserData(data) {
        setUserData(data);
        setBalance(data.available_amount);
        setPendingWithdraw(data.pending_withdrawal_amount);
        setTotalWithdraw(data.total_withdrawal_amount);
        setUserID_DB_state(data._id)
    }

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
        const formattedDate = date.toLocaleString('en-GB', options).replace(',', ''); // Remove comma
        return formattedDate;
    };

    const handleWithdraw = async () => {
        if (window.confirm("Are you sure?")) {
            const now = await getCurrentTime(); // Fetch server time
            const formattedDate = formatDate(now); // Format it

            const withdrawalRequest = {
                userID_DB: userData._id,
                date: formattedDate,
                status: 'Pending',
                publisher_earnings: +userData.publisher_earnings,
                referral_earnings: +userData.referral_earnings,
                total_amount: (+balance).toFixed(4),
                withdrawal_method: userData.withdrawal_method,
                withdrawal_account: userData.withdrawal_account_information,
                total_withdrawal_amount: userData.total_withdrawal_amount,
                pending_withdrawal_amount: userData.pending_withdrawal_amount
            };
            setSubmit_process_state(false)
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/withdrawal/withdrawal_record_post`, withdrawalRequest);
                if (response.data.success) {
                    alert('Withdrawal request submitted successfully!');
                    dataBase_user_withdrawal_record_get();
                    dataBase_home_get();
                }
                setSubmit_process_state(true)
            } catch (error) {
                setSubmit_process_state(true)
                if (error.response.data.error_msg === "withdrawal_method") {
                    setError(
                        <span>
                            Please fill in your <b> withdrawal details</b> to proceed.{' '}
                            <Link to="/member/users/profile" style={{ textDecoration: 'underline' }}>
                                Click here
                            </Link>.
                        </span>
                    );
                    setTimeout(() => {
                        setError('')
                    }, 5000);
                    return
                }
                if (error.response.data.error_msg.startsWith("Withdraw")) {
                    let message = error.response.data.error_msg.split('.')[0]
                    setError(message);
                    setTimeout(() => {
                        setError('')
                    }, 5000);
                    return
                }
                setError(error.response.data.error_msg);
                setTimeout(() => {
                    setError('')
                }, 5000);
            }
        }
    };

    const dataBase_user_withdrawal_record_get = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/withdrawal/user_withdrawal_record_get?userID_DB=${userID_DB_state}`)
            setWithdrawal_records_state(response.data.msg);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (userID_DB_state) {
            dataBase_user_withdrawal_record_get()
        } 
    }, [jwtToken_state, userData]);

    let element = () => {
        return (
            <section className="content p-2">
                <legend>Withdraw</legend>
                <div className="banner banner-member">
                    <div className="banner-inner">
                        <div className="alert alert-success">
                            <i className="fa fa-bullhorn"></i> [17-07-2023] Referral Earning increase by 25%
                        </div>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    <div className="col-sm-4">
                        <div className="small-box bg-aqua">
                            <div className="inner">
                                <h3>${(+balance).toFixed(4)}</h3>
                                <p>Available Balance</p>
                            </div>
                            <div className="icon"><i className="fa fa-money"></i></div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="small-box bg-red">
                            <div className="inner">
                                <h3>${(+pendingWithdraw).toFixed(4)}</h3>
                                <p>Pending Withdrawn</p>
                            </div>
                            <div className="icon"><i className="fa fa-share"></i></div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="small-box bg-green">
                            <div className="inner">
                                <h3>${(+totalWithdraw).toFixed(4)}</h3>
                                <p>Total Withdraw</p>
                            </div>
                            <div className="icon"><i className="fa fa-usd"></i></div>
                        </div>
                    </div>
                </div>
                <div className="box box-primary">
                    <div className="box-body">
                        <div className="text-center">
                            <button disabled={!submit_process_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-primary"} btn-success btn-lg`} onClick={handleWithdraw}>
                                {submit_process_state ? "Withdraw" : <i className="fa-solid fa-spinner fa-spin"></i>}
                            </button>
                        </div>
                        <hr />
                        <p>
                            When your account reaches the minimum amount or more, you may request your earnings by clicking the above button. The payment is then sent to your withdraw account during business days no longer than 3 days after requesting. Please do not contact us regarding payments before due dates.
                        </p>
                        <p>
                            In order to receive your payments you need to fill your payment method and payment ID <a href="/member/users/profile">here</a> if you haven't done so. You are also requested to fill all the required fields in the Account Details section with accurate data.
                        </p>
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Publisher Earnings</th>
                                        <th>Referral Earnings</th>
                                        <th>Total Amount</th>
                                        <th>Withdrawal Method</th>
                                        <th>Withdrawal Account</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {withdrawal_records_state.map((entry) => (
                                        <tr key={entry.ID}>
                                            <td>{entry.ID}</td>
                                            <td>{entry.date}</td>
                                            <td>{entry.status}</td>
                                            <td>${(+entry.publisher_earnings).toFixed(4)}</td>
                                            <td>${(+entry.referral_earnings).toFixed(4)}</td>
                                            <td>${(+entry.total_amount).toFixed(4)}</td>
                                            <td>{entry.withdrawal_method}</td>
                                            <td>{entry.withdrawal_account.split('\n').map((line, index) => <div key={index}>{line}</div>)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <ul>
                            <li>Pending: The payment is being checked by our team.</li>
                            <li>Approved: The payment has been approved and is waiting to be sent.</li>
                            <li>Complete: The payment has been successfully sent to your payment account.</li>
                            <li>Cancelled: The payment has been cancelled.</li>
                            <li>Returned: The payment has been returned to your account.</li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
    return (
        <div>
            <HomePageAdmin getUserData={getUserData} element={element()} />
        </div>
    );
};

export default Withdraw;
