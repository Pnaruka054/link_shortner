import Nav_Bar from '../Nav_Bar/nav_bar';
import './page_Not_Found.css';

const Page_Not_Found = () => {
    return (
        <div>
            <div>
                <Nav_Bar />
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }}>
                <h1> 😔 404 page not found </h1>
            </div>
        </div>
    );
}

export default Page_Not_Found;
