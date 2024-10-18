import React, { useEffect, useState } from 'react';
import "./Page_no_3.css";
import AdComponent from '../Ads/AdComponent';
import AdsComponentAdsterraBanner from '../Ads/AdsComponentAdsterraBanner';
import axios from "axios";
import { useParams } from 'react-router-dom';

const PageNo3 = () => {
    const [seconds, setSeconds] = useState(30);
    const [isDisabled, setIsDisabled] = useState(true);
    const [longURL, setLongURL] = useState(''); // State for the short URL
    const [short_data_traker, setShort_data_traker] = useState(false);
    let id = useParams().id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/linkShort/shortURL_third_page_get?shortID=${id}`);
                if (response.data.success) {
                    setLongURL(response.data.msg.longURL); // Assuming your response contains shortURL
                    setShort_data_traker(true); // Update the tracker to true
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (short_data_traker) {
            document.getElementById('page_controller').classList.remove("d-none");

            // Start the timer
            const timer = setInterval(() => {
                setSeconds(prev => {
                    if (prev > 1) {
                        return prev - 1; // Reduce the timer
                    } else {
                        clearInterval(timer); // Clear the timer when it reaches 0
                        setIsDisabled(false); // Enable the button
                        return 0; // Set timer to 0
                    }
                });
            }, 1000);

            // Cleanup function
            return () => clearInterval(timer);
        } else {
            document.getElementById('page_controller').classList.add("d-none");
        }
    }, [short_data_traker]);

    const database_shortURL_ID_put = async () => { 
        try {
            let response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/linkShort/shortURL_third_page_first_btn_click_put?shortID=${id}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-primary vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white p-4 rounded shadow text-center">
                <a
                    href='https://bycarver.com/fhp0is9j?key=20050f2539da92b9243bbc662b5c12bf'
                    target='_blank'
                    rel="noopener noreferrer"
                    className="btn btn-primary mb-3"
                >
                    Click Here To Download Without Wait
                </a>
                <br />
                <div id='ads_component_div' className='w-75 d-none d-md-inline-block'>
                    <AdComponent adKey="f2e76b1a9af84306102d9f8675c030e8" />
                    <div id="container-f2e76b1a9af84306102d9f8675c030e8"></div>
                </div>
                <div id='Ads_component_div' className='d-block d-md-none'>
                    <AdsComponentAdsterraBanner />
                </div>
                <div id='page_controller'>
                    <p>Please wait {seconds} seconds</p>
                    <button onClick={database_shortURL_ID_put} className="btn btn-secondary mb-3" disabled={isDisabled}>
                        <a style={{ textDecoration: "none", color: "white" }} href={longURL}>Click Here To Continue</a>
                    </button>
                </div>
                {/* Banner Ads 300X100 */}
                <div className='d-flex justify-content-center' data-banner-id="6037162"></div>
                {/* Banner Ads 300X100 */}
                <a
                    href='https://bycarver.com/fhp0is9j?key=20050f2539da92b9243bbc662b5c12bf'
                    target='_blank'
                    rel="noopener noreferrer"
                    className="btn btn-success"
                >
                    Get Link
                </a>
            </div>
        </div>
    );
};

export default PageNo3;
