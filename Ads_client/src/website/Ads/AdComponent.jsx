import React, { useEffect } from 'react';

const AdComponent = ({ adKey }) => {
    useEffect(() => {
        // Create the script element
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `//bycarver.com/${adKey}/invoke.js`; // Use adKey to build the URL

        // Append the script to the body
        document.body.appendChild(script);

        // Clean up by removing the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, [adKey]);

    return <div id={`container-${adKey}`}></div>; // Set the unique ID for the container
};

export default AdComponent;
