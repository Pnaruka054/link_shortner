import React, { useEffect, useState } from 'react';
import "./Invoices.css";
import HomePageAdmin from '../Home_page_admin/home_page_admin';
import axios from 'axios';

const Invoices = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 10;
    const jwtToken_state = localStorage.getItem('jwtToken_state');
    const [userData, setUserData] = useState(null);
    const [userID_DB_state, setUserID_DB_state] = useState('');
    const [withdrawal_records_state, setWithdrawal_records_state] = useState([]);
   
    function getUserData(data) {
        setUserData(data);
        setUserID_DB_state(data._id)
    }
    
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

    // Example dynamic data for invoices
    const invoices = [
        { id: 1, status: 'Paid', description: 'Invoice for services rendered', amount: '$100.00', paymentMethod: 'Credit Card', paidDate: '10/1/24', created: '09/15/24' },
        { id: 2, status: 'Pending', description: 'Invoice for consulting services', amount: '$150.00', paymentMethod: 'PayPal', paidDate: null, created: '09/20/24' },
        { id: 3, status: 'Unpaid', description: 'Invoice for product purchase', amount: '$200.00', paymentMethod: 'Bank Transfer', paidDate: null, created: '09/25/24' },
        // Add more invoice data as needed
    ];

    const indexOfLastInvoice = currentPage * invoicesPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
    const currentInvoices = withdrawal_records_state.slice(indexOfFirstInvoice, indexOfLastInvoice);
    const totalPages = Math.ceil(withdrawal_records_state.length / invoicesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let element = () => {
        return (
            <section className="content p-3">
                <legend className="mb-3">Manage Invoices</legend>
                <div className="box box-primary">
                    <div className="box-body no-padding">
                        <div className="table-responsive" style={{ overflowX: 'auto' }}>
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                        <th>Paid date</th>
                                        <th>Created</th>
                                        <th>Status</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentInvoices.map((invoice, index) => (
                                        <tr key={index}>
                                            <td>{invoice.ID}</td>
                                            <td>{invoice.description}</td>
                                            <td>{invoice.total_amount}</td>
                                            <td>{invoice.withdrawal_method}</td>
                                            <td>{invoice.withdrawal_paid_date}</td>
                                            <td>{invoice.date}</td>
                                            <td className={invoice.status === "Pending"? "text-info": invoice.status === "Rejected"? "text-danger":"text-success"}>{invoice.status}</td>
                                            {/* <td>
                                                <div className="action-buttons">
                                                    <button className="btn btn-info btn-sm">View</button>
                                                    <button className="btn btn-danger btn-sm mx-lg-2">Delete</button>
                                                </div>
                                            </td> */}
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

export default Invoices;
