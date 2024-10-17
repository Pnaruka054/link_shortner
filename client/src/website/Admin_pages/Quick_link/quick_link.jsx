import "./quick_link.css";
import HomePageAdmin from "../Home_page_admin/home_page_admin";

const QuickLink = () => {
    let element = () =>{
        return(
            <h1>This is Quick link</h1>
        )
    }
    return (
        <div>
            <HomePageAdmin element={element()} />
        </div>
    );
}

export default QuickLink;
