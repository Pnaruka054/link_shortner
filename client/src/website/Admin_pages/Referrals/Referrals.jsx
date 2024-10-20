import "./Referrals.css"; 
import HomePageAdmin from '../Home_page_admin/home_page_admin';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const Referrals = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [userData, setUserData] = useState(null);
    const [referral_records, setReferral_records] = useState([]);
    const linksPerPage = 10;

    function getUserData(data) {
        setUserData(data[0]);
    }

    const dataBase_referral_record_get = async () => {
        if (!userData) return; 
        try {
            let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/referral_record_get?userID_DB=${userData._id}`);
            setReferral_records(response.data.msg);
        } catch (error) {
            console.log(error);
            console.error("Error fetching referral records:", error);
        }
    };

    useEffect(() => {
        dataBase_referral_record_get();
    }, [userData]); 

    const indexOfLastReferral = currentPage * linksPerPage;
    const indexOfFirstReferral = indexOfLastReferral - linksPerPage;
    const currentReferrals = referral_records.slice(indexOfFirstReferral, indexOfLastReferral);
    const totalPages = Math.ceil(referral_records.length / linksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Error copying text: ', err);
        });
    };

    let element = () => {
        if (!userData) {
            return <div>Loading user data...</div>;
        }

        const referralLink = `${window.location.origin}/signup/ref/${userData.userName}`;

        return (
            <section className="content p-3">
                <div className="box box-default box-solid">
                    <div className="box-header with-border">
                        <h3 className="box-title"><i className="fa fa-exchange"></i> My Referrals</h3>
                    </div>
                    <div className="banner banner-member">
                        <div className="banner-inner">
                            <div className="alert alert-success">
                                <i className="fa fa-bullhorn"></i> [17-07-2023] Referral Earning increase by 25%
                            </div>
                        </div>
                    </div>

                    <div className="container mt-4">
                        <div className="box-body bg-white shadow p-4 rounded">
                            <p className="text-black">
                                The DropLink.co | Earn money on short links referral program is a great way to spread the word of this great service and to earn even more money with your short links! Refer friends and receive 25% of their earnings for life!
                            </p>
                            <div className="d-flex align-items-center">
                                <pre className="bg-light text-dark font-weight-bold p-2 rounded mb-0 me-2">{referralLink}</pre>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => copyToClipboard(referralLink)}>
                                    <i className="fa fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: "2px solid blue" }} className="box-body rounded no-padding mt-4">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ borderRadius: "10px 0 0 0" }}>Username</th>
                                        <th style={{ borderRadius: "0 10px 0 0" }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentReferrals.map((referral, index) => (
                                        <tr key={index}>
                                            <td>{referral.userName}</td>
                                            <td>{referral.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <ul className="pagination justify-content-center mt-3">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        );
    };

    return (
        <div>
            <HomePageAdmin getUserData={getUserData} element={element()} />
        </div>
    );
};

export default Referrals;
