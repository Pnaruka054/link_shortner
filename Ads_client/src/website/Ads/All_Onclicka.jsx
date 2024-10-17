import React, { useEffect } from 'react';

const All_Onclicka = () => {
    useEffect(() => {
        const loadScript = (src, dataAdmpid) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.async = true;
                script.src = src;
                if (dataAdmpid) {
                    script.setAttribute('data-admpid', dataAdmpid);
                }
                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.body.appendChild(script);
            });
        };

        // ========== Onclicka 15 Sec Video Ads Script Code Start ==========
        loadScript('https://js.onclckmn.com/static/onclicka.js', '243859');

        // Load video ad script after 25 seconds
        const timer = setInterval(() => {
            loadScript('https://js.onclckmn.com/static/onclicka.js', '243859');
        }, 25000);
        // ========== Onclicka 15 Sec Video Ads Script Code End ==========

        // ========== Onclicka Banner Ads Script Code Start ==========
        Promise.all([
            loadScript('https://js.onclckmn.com/static/onclicka.js', '243819'),
            loadScript('https://js.onclckmn.com/static/onclicka.js', '243863'),
            loadScript('https://js.onclckmn.com/static/onclicka.js', '230443'),
        ]);
        // ========== Onclicka Banner Ads Script Code End ==========

        // ========== Onclicka Inpage Ads Script Code Start ==========
        loadScript('https://js.onclckmn.com/static/onclicka.js', '243811');
        // ========== Onclicka Inpage Ads Script Code End ==========

        // Cleanup scripts on unmount
        return () => {
            document.querySelectorAll(`script[src^="https://js.onclckmn.com/static/onclicka.js"]`).forEach(script => {
                document.body.removeChild(script);
            });
            clearInterval(timer);
        };
    }, []);

    return null; // This component doesn't render anything in the UI
};

export default All_Onclicka;
