import "./hidden_links.css";
import HomePageAdmin from '../Home_page_admin/home_page_admin';
import React, { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";

const HiddenLinks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [all_links, setAll_links] = useState([]);
    const linksPerPage = 10;
    const [userData, setUserData] = useState(null);
    const [success, setSuccess] = useState('');
    let [unhide_process_state, setUnhide_process_state] = useState(true)

    function getUserData(data) {
        setUserData(data);
    }

    useEffect(() => {
        if(userData){
            let fatchData = async () => {
                try {
                    let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/linkShort/get_all_links?userID_DB=${userData._id}&link_status=hide`);
                    setAll_links(response.data.data)
                } catch (error) {
    
                }
            }
            fatchData()
        }
    }, [userData,success]);

    const indexOfLastLink = currentPage * linksPerPage;
    const indexOfFirstLink = indexOfLastLink - linksPerPage;
    const currentLinks = all_links.slice(indexOfFirstLink, indexOfLastLink);
    const totalPages = Math.ceil(all_links.length / linksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [tooltip, setTooltip] = useState({ visible: false, text: '', id: '' });

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setTooltip({ visible: true, text: 'Copied!', id: text });
            setTimeout(() => {
                setTooltip({ visible: false, text: '', id: '' });
            }, 1000);
        }).catch(err => {
            console.error("Could not copy text: ", err);
        });
    };

    let Show_url_btn = async(shortID) =>{
        if (confirm("Are you sure?")){
            setUnhide_process_state(false)
          let fatchData = async()=>{
           try {
               let response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/linkShort/hide_and_show_link?shortID=${shortID}&status=hide`)
               if (response.data.success) {
               setSuccess(`The Link with alias: ${shortID} has been hidden.`)
               setTimeout(() => {
                   setSuccess('')
               }, 5000);
               setUnhide_process_state(true)
             }
              } catch (error) {
               console.log(error);
              }
          }
          fatchData()
        }
   }

    let element = () => {
        return (
            <section className="content p-2">
                <legend>Manage Hidden Links</legend>
                <div className="my-3">
                {success && <div className="alert alert-success">{success}</div>}
                </div>
                <div className="p-3">
                {currentLinks.map(link => (
                        <div className="box box-solid my-4" key={link.shortURL_ID}>
                            <div className="box-body">
                                <h4>
                                    <a href={`${import.meta.env.VITE_ADS_PAGE_BASE_URL+link.shortURL_ID}`} target="_blank" rel="nofollow noopener noreferrer">
                                        <span className="glyphicon glyphicon-link"></span> {link.shortURL_ID}
                                    </a>
                                </h4>
                                <p className="text-muted">
                                    <small>
                                        <i className="fa fa-bar-chart"></i>
                                        <a href={`${import.meta.env.VITE_ADS_PAGE_BASE_URL+link.shortURL_ID}/info`} target="_blank" rel="nofollow noopener noreferrer">Stats</a> -
                                        <i className="fa fa-calendar"></i> {link.date} -
                                        <a target="_blank" rel="nofollow noopener noreferrer" href={`https://${link.longURL}`}>
                                            {link.longURL}
                                        </a>
                                    </small>
                                </p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={`${import.meta.env.VITE_ADS_PAGE_BASE_URL+link.shortURL_ID}`}
                                                readOnly
                                                onFocus={(e) => e.target.select()}
                                            />
                                            <div className="position-relative">
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() => handleCopy(`${import.meta.env.VITE_ADS_PAGE_BASE_URL+link.shortURL_ID}`)}
                                                    title="Copy"
                                                    onMouseEnter={() => setTooltip({ visible: true, text: 'Copy', id: `${import.meta.env.VITE_ADS_PAGE_BASE_URL+link.shortURL_ID}` })}
                                                    onMouseLeave={() => setTooltip({ visible: false, text: '', id: '' })}
                                                >
                                                    <i className="fa fa-clone"></i>
                                                </button>
                                                {tooltip.visible && tooltip.id === `${import.meta.env.VITE_ADS_PAGE_BASE_URL+link.shortURL_ID}` && (
                                                    <div className="tooltip-custom" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                                                        {tooltip.text}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 col-lg-4"></div>
                                    <div className="col-sm-3 col-lg-2 mt-2 m-md-auto">
                                        <div className="text-right d-flex flex-nowrap">
                                            <a href={`/member/links/edit/${link.shortURL_ID}`} className="btn btn-primary btn-sm">Edit</a>
                                            <form name={`post_${link.shortURL_ID}`} style={{ display: 'none' }} method="post" action={`/member/links/hide/${link.shortURL_ID}`}>
                                                <input type="hidden" name="_method" value="POST" />
                                                <input type="hidden" name="_csrfToken" autoComplete="off" value="your_csrf_token_here" />
                                            </form>
                                            <a href="#" disabled={!unhide_process_state} className={`btn ${!unhide_process_state ? "btn-secondary" : "btn-danger"} mx-2 btn-sm`} onClick={()=>Show_url_btn(link.shortURL_ID)}>
                                            {unhide_process_state ? "Unhide" : <i className="fa-sharp-duotone fa-solid fa-loader fa-spin-pulse"></i>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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

export default HiddenLinks;
