import React, { useState } from 'react';
import './IframeDisplay.css'; // Assuming the styles are defined in this CSS file

function IframeDisplay() {
    const [showIframe, setShowIframe] = useState(false);

    const handleButtonClick = () => {
        setShowIframe(true);
    };

    const handleCloseClick = () => {
        setShowIframe(false);
    };

    return (
        <div>
        
            {showIframe && (
                <div className="iframe-overlay">
                    <div className="iframe-wrapper">
                        <iframe
                            src="https://nextjs-chat-lake-rho.vercel.app/"
                            title="Example Iframe"
                            width="80%"
                            height="80%"
                        ></iframe>
                        <button className="close-button" onClick={handleCloseClick}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IframeDisplay;
