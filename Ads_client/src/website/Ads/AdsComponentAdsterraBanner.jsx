import React, { useEffect, useRef } from 'react';

const AdsComponentAdsterraBanner = () => {
    const adContainerRef = useRef(null);

    useEffect(() => {
        window.atOptions = {
            key: 'a85524027f4c2f4e159e7aed7a1abb41',
            format: 'iframe',
            height: 250,
            width: 300,
            params: {}
        };

        const script = document.createElement('script');
        script.src = '//bycarver.com/a85524027f4c2f4e159e7aed7a1abb41/invoke.js';
        script.async = true;

        // Append the script to the body
        document.getElementById("Ads_component_div").appendChild(script);
        document.getElementById("Ads_component_div").children[0].classList.add("d-none")

        // Ensure the ad is rendered in the container
        script.onload = () => {
            if (adContainerRef.current) {
                window.atOptions.container = adContainerRef.current;
            }
        };

        return () => {
            document.getElementById("Ads_component_div").removeChild(script);
        };
    }, []);

    return (
        <div 
            ref={adContainerRef}
            style={{ width: '300px', height: '250px', backgroundColor: '#ccc', margin: '0 auto' }}
        >
            {/* Ad will be rendered here */}
        </div>
    );
};

export default AdsComponentAdsterraBanner;
