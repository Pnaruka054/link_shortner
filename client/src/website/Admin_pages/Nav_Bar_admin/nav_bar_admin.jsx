import { Link } from "react-router-dom";
import "./nav_bar_admin.css";

const NavBarAdmin = ({userData}) => {

    let handleToggle = () => {
        let home_sidemenu_scrollbar = document.getElementById(
          "home_sidemenu_scrollbar"
        );
        if(home_sidemenu_scrollbar.classList.contains("d-none")){
          home_sidemenu_scrollbar.style.position = "absolute"
          home_sidemenu_scrollbar.classList.remove("d-none")
        } else {
          home_sidemenu_scrollbar.style.position = "relative"
          home_sidemenu_scrollbar.classList.add("d-none")
        }
      };

   return (
      <div className="relative">
        <div className="container-fluid bg-primary d-flex justify-content-md-end">
          <div className="d-flex align-items-center fs-6 w-100">
            <div className="fs-3 text-light d-md-none mr-auto">
              <i className="fa-solid fa-bars" onClick={handleToggle}></i>
            </div>
            <ul className="navbar-nav ms-auto d-flex align-items-center flex-row fs-6">
              <li className="nav-item px-3">
                <Link className="nav-link px-2" to="/member/withdraws">
                  <span className="d-sm-inline d-none">Available Balance:</span>{" "}
                  ${(+userData.available_amount).toFixed(4)}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-2" to="/member/users/profile">
                  <div>
                    <i className="fa-duotone fa-solid fa-user"></i>&nbsp;
                    Profile
                  </div>
                </Link>
              </li>
              <li className="nav-item me-4">
                <span className="navbar-divider"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default NavBarAdmin;
