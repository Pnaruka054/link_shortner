import './loading_page.css';

const LoadingPage = () => {
    return (
        <div className="loading-container d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className="text-center">
                <i className="fa-duotone fa-solid fa-spinner-third fa-spin fs-1 mb-3 spinner-icon"></i>
                <p className="fs-4">Loading...</p>
            </div>
        </div>
    );
}

export default LoadingPage;
