import React, { useState, useEffect } from "react";
import "./Statistics.css";
import HomePageAdmin from "../Home_page_admin/home_page_admin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
    let month=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let month_get = new Date().getMonth()
    let year_get = new Date().getFullYear()
    const [selectedMonth, setSelectedMonth] = useState(`${month[month_get]} ${year_get}`);
    const [isOpen, setIsOpen] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [shortenedUrlVisible, setShortenedUrlVisible] = useState(false);
    const [shortenedUrl, setShortenedUrl] = useState(null);
    const [userData, setUserData] = useState([]);
    const [dbMonthGet, setDbMonthGet] = useState([]);
    const [dbYearGet, setDbYearGet] = useState([]);
    let [submit_process_state, setSubmit_process_state] = useState(true)
    let [short_btn_desable_state, setShort_btn_desable_state] = useState(true)
    let [logOut_btn_process_state, setLogOut_btn_process_state] = useState(true)
    const [error, setError] = useState('');
    let navigate = useNavigate();   
    
    useEffect(() => {
        if (userData && Array.isArray(userData[1])) {
            let userStatus = userData[1].find((value) => {
                return selectedMonth === value.monthName;
            });
            setDbMonthGet(userStatus)
        }
        if (userData && Array.isArray(userData[2])) {
            let userStatus = userData[2].map((value) => {
                if(selectedMonth === value.monthName){
                    return value
                }
            });
            setDbYearGet(userStatus)
        }
    }, [userData, selectedMonth]);
    

    function getUserData(data) {
        setUserData(data);
        if (data[0].is_verified === 0) {
            let check_email_verify_error_div = document.getElementById("check_email_verify_error_div")
            check_email_verify_error_div.classList.remove("d-none")
        }
    }

    const handleVerifyClick = () => {
        sessionStorage.setItem('gmail_id', userData[0].gmail_address);
        navigate("/verify")
    };

    const getCurrentTime = async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/withdrawal/current_time`);
        return new Date(response.data.time);
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

    let dataBase_longurl_to_short_post = async (obj) => {
        try {
            let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/linkShort/longurl_to_short_post`, obj);
            setShortenedUrl(response.data.msg);
            setShortenedUrlVisible(true);
            setSubmit_process_state(true)
        } catch (error) {
            setError(error.response.data.msg)
            setSubmit_process_state(true)
        }
    }

    const data = [
        { date: '2024-10-01', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-02', views: 2, linkEarnings: '$0.0250', dailyCPM: 12.5, referralEarnings: '$0.0000' },
        { date: '2024-10-03', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-04', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-05', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-06', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-07', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-08', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-09', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-10', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-11', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-12', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-13', views: 1, linkEarnings: '$0.0050', dailyCPM: 5.0, referralEarnings: '$0.0000' },
        { date: '2024-10-14', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-15', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-16', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-17', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-18', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-19', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-20', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-21', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-22', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-23', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-24', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-25', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-26', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-27', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-28', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-29', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-30', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
        { date: '2024-10-31', views: 0, linkEarnings: '$0.0000', dailyCPM: 0, referralEarnings: '$0.0000' },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (monthName) => {
        setSelectedMonth(monthName);
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const now = await getCurrentTime();
        const formattedDate = formatDate(now);

        let obj = {
            userID_DB: userData[0]._id,
            longURL: e.target.urlInput.value,
            alias: e.target.aliasInput.value,
            date: formattedDate,
        }
        dataBase_longurl_to_short_post(obj);
        setSubmit_process_state(false)
        setShort_btn_desable_state(false)
    };

    const handleLogOut = () => {
        setConfirmationVisible(true);
        setLogOut_btn_process_state(false)
    };

    const confirmLogout = () => {
        localStorage.removeItem('jwtToken_state');
        navigate('/login');
    };

    const closeConfirmation = () => {
        setConfirmationVisible(false);
        setLogOut_btn_process_state(true)
    };



    const ConfirmationPopup = () => (
        <div className="confirmation-popup">
            <div className="popup-content p-4 shadow">
                <h5>Are you sure you want to log out?</h5>
                <button style={{ scale: "0.9" }} onClick={confirmLogout} className="btn btn-danger me-2 mt-2">Confirm</button>
                <button style={{ scale: "0.9" }} onClick={closeConfirmation} className="btn btn-secondary mt-2">Close</button>
            </div>
        </div>
    );

    const element = () => {
        return (
            <div className="p-2">
                <div className="d-flex justify-content-between">
                    <p className="fs-4">Dashboard</p>
                    <p onClick={handleLogOut} type="button" className="btn btn-outline-danger">
                        {logOut_btn_process_state ? "LogOut" : <i className="fa-solid fa-spinner fa-spin"></i>}
                    </p>
                </div>
                <div id='alert_message_div'>
                    {error.length > 0 && <div className="alert alert-danger"></div>}
                </div>
                <div id="check_email_verify_error_div" className="alert alert-warning alert-dismissible fade show d-none" role="alert">
                <i className="fa-solid fa-triangle-exclamation"></i> Your email is not verified -
                    <span style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={handleVerifyClick}>
                        click here
                    </span>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form className="bg-white border border-success p-3 mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="urlInput" className="form-label">Enter URL to Shorten:</label>
                        <input
                            type="url"
                            className="form-control"
                            id="urlInput"
                            placeholder="Enter your URL"
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ maxWidth: '300px' }}>
                        <label htmlFor="aliasInput" className="form-label">Enter Alias (optional):</label>
                        <input
                            type="text"
                            className="form-control"
                            id="aliasInput"
                            placeholder="Enter an alias"
                        />
                    </div>
                    <button type="submit" disabled={!short_btn_desable_state} className={`btn ${!submit_process_state ? "btn-secondary" : "btn-danger"}`}>
                        {submit_process_state ? "Shorten" : <i className="fa-solid fa-spinner fa-spin"></i>}
                    </button>
                    {error && <div style={{ marginBottom: "-4px" }} className="alert alert-danger mt-3 p-1">{error}</div>}
                    <div className={`shortened-url-container ${shortenedUrlVisible ? 'visible' : ''}`}>
                        {shortenedUrlVisible && (
                            <div className="my-3">
                                <label htmlFor="shortenedUrl" className="form-label">Shortened URL:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="shortenedUrl"
                                        value={import.meta.env.VITE_ADS_PAGE_BASE_URL + shortenedUrl}
                                        style={{ background: "#eeeeee" }}
                                        readOnly
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(import.meta.env.VITE_ADS_PAGE_BASE_URL + shortenedUrl);
                                        }}
                                    >
                                        <i className="fa fa-copy"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
                <div className="text-center mt-3">
                    <div className="dropdown" style={{ width: '300px', display: 'inline-block' }}>
                        <button
                            className="btn btn-primary dropdown-toggle w-75 d-flex justify-content-between align-items-center"
                            onClick={toggleDropdown}
                            type="button"
                        >
                            <span className="text-white">{selectedMonth}</span>
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu show w-75 z-1">
                                {userData[1].map((month) => (
                                    <button
                                        key={month.monthName}
                                        className="dropdown-item"
                                        onClick={() => handleSelect(month.monthName)}
                                    >
                                        {month.monthName}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-3 col-md-6 col-6 text-nowrap">
                        <div className="small-box bg-yellow">
                            <div className="inner">
                                <h3>{dbMonthGet.total_views}</h3>
                                <p>Total Views</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-bar-chart"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6 text-nowrap">
                        <div className="small-box bg-aqua">
                            <div className="inner">
                                <h3>${(+dbMonthGet.total_earnings).toFixed(4)}</h3>
                                <p>Total Earnings</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-shopping-bag"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6 text-nowrap">
                        <div className="small-box bg-green">
                            <div className="inner">
                                <h3>${(+dbMonthGet.referral_earnings).toFixed(4)}</h3>
                                <p>Referral Earnings</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-exchange"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6 text-nowrap">
                        <div className="small-box bg-red">
                            <div className="inner">
                                <h3>${(+dbMonthGet.averageCPM).toFixed(4)}</h3>
                                <p>Average CPM</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-usd"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-primary mb-3">
                    <div className="card-header">
                        <i className="fa fa-bullhorn"></i> Announcements
                    </div>
                    <div className="card-body chat">
                        <div className="mb-3">
                            <p className="announcement">
                                <span>
                                    <small className="text-muted float-right">
                                        <i className="fa fa-clock-o"></i> 8/10/24, 11:53 AM
                                    </small>
                                </span>
                            </p>
                            <p>
                                <strong>Why Choose Us?</strong>
                            </p>
                            <p>
                                1. Receive a $1 bonus for signing up.<br />
                                2. Enjoy the highest CPM rates globally.<br />
                                3. No intrusive pop-up ads.<br />
                                4. Ability to shorten links for 18+, Movies, Faucets, etc.<br />
                                5. Fast payments within 2 to 3 days.
                            </p>
                            <p className="text-danger">
                                <strong>(Your first payment will be processed within 1 - 2 days)</strong>
                            </p>
                            <p><strong>Statistics will be refreshed every 10 minutes.</strong></p>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <p className="announcement">
                                <span>
                                    <small className="text-muted float-right">
                                        <i className="fa fa-clock-o"></i> 8/10/24, 11:52 AM
                                    </small>
                                </span>
                            </p>
                            <p>
                                <strong>Contest</strong>
                            </p>
                            <p>
                                <strong className="text-danger p-1">Use Your Referral Link:</strong>
                            </p>
                            <p>
                                The user with the most active referrals will earn a <strong className="text-success p-1">25% commission</strong>. Find your referral link here - <a href="https://droplink.co/member/users/referrals" target="_blank" rel="noopener noreferrer">Click</a><br />
                                When your referral earns money, your commission will be credited to your DropLink wallet.
                            </p>
                            <p>
                                <strong className="text-danger p-1">Spread the Word:</strong>
                            </p>
                            <p>
                                Write an article about us (feel free to include your referral link!) and earn up to <strong className="text-success p-1">$5</strong>.<br />
                                Create a YouTube video discussing our platform and earn up to $100. Minimum withdrawal is <strong className="text-success p-1">$5</strong>.<br />
                                Send us the link to your article or video via - <a href="mailto:support@droplink.co" className="text-primary">Email</a> | <a href="https://t.me/droplinksp" target="_blank" rel="noopener noreferrer" className="text-primary">Telegram</a><br />
                                Funds will be credited to your account every Sunday.
                            </p>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <p className="announcement">
                                <span>
                                    <small className="text-muted float-right">
                                        <i className="fa fa-clock-o"></i> 8/10/24, 11:50 AM
                                    </small>
                                </span>
                            </p>
                            <p>
                                <strong>Policy</strong>
                            </p>
                            <p>
                                Dear users, please refrain from creating bots, using proxies, or generating fake traffic. Violating this policy will result in <strong className="text-danger p-1">account deactivation</strong>.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ height: '300px', overflow: 'auto' }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Views</th>
                                    <th>Link Earnings</th>
                                    <th>Daily CPM</th>
                                    <th>Referral Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dbYearGet.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.date}</td>
                                        <td>{row.views}</td>
                                        <td>{(+row.publisher_earnings).toFixed(4)}</td>
                                        <td>${row.dailyCPM}</td>
                                        <td>{(+row.referral_earnings).toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {confirmationVisible && <ConfirmationPopup />}
            </div>
        );
    };

    return (
        <div>
            <HomePageAdmin getUserData={getUserData} element={element()} />
        </div>
    );
};

export default Statistics;
