import './loading_page.css';

const LoadingPage = () => {
    return (
        <div className="loading-container d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className="text-center">
                <i className="fa-solid fa-spinner fa-spin fs-1"></i>
                <p className="fs-4">Loading...</p>
            </div>
        </div>
    );
}

export default LoadingPage;
