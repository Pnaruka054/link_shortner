import ContactUs from '../../ContactUs/contactUs';
import HomePageAdmin from '../Home_page_admin/home_page_admin';
import "./support.css";

const Support = () => {
    let element = () =>{
        return(
            <div style={{marginTop:"-4.5rem"}}>
                <ContactUs style="d-none"/>
            </div>
        )
    }
    return (
        <div>
            <HomePageAdmin element={element()} />
        </div>
    );
}

export default Support;
