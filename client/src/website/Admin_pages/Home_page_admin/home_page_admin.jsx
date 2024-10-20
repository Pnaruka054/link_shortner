import "./home_page_admin.css";
import { Link, useNavigate } from "react-router-dom";
import NavBarAdmin from "../Nav_Bar_admin/nav_bar_admin";
import Footer from "../../Footer/footer";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingPage from "../../Loading_page/loading_page";

const HomePageAdmin = (props) => {
  const [userData, setUserData] = useState(undefined);
  const navigate = useNavigate();
  const jwtToken_state = localStorage.getItem('jwtToken_state');
  const [activeMenu, setActiveMenu] = useState(null); // State for active menu

  const dataBase_home_get = async () => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/home_dataBase_get?jwtToken=${jwtToken_state}`);
      setUserData(response.data.userData);
    } catch (error) {
      console.error(error);
      if (error.response.data.jwtToken_message) {
        localStorage.removeItem('jwtToken_state');
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    if (!jwtToken_state) {
      localStorage.removeItem('jwtToken_state');
      navigate('/login', { state: { jwt_expire: true } });
    } else {
      dataBase_home_get();
    }
  }, [jwtToken_state]);

  useEffect(() => {
    if (userData) {
      if (props.getUserData) {
        props.getUserData(userData);
      }
    } else if (userData === null) {
      localStorage.removeItem('jwtToken_state');
      navigate('/login', { state: { jwt_expire: true } });
    }
  }, [userData, props]);

  const handleToggle = (event) => {
    const menuMapping = {
      "Manage Links": 0,
      "Tools": 1,
      "Settings": 2
    };

    const menuKey = event.currentTarget.getElementsByTagName("span")[1].innerText;
    const menuIndex = menuMapping[menuKey];

    setActiveMenu(activeMenu === menuIndex ? null : menuIndex);
  };

  if (!userData) {
    return <LoadingPage />
  }
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-12 p-0 bg-info bg-md-primary text-center">
              <Link className="navbar-brand bg-info bg-md-primary p-0 pt-1 px-2" to="/">
                <img src="/Logo.png" alt="CashShrink Logo" />
              </Link>
            </div>
            <div className="col-lg-10 col-md-9 col-12 p-0">
              <NavBarAdmin userData={userData[0]} />
            </div>
          </div>

          <div className="row">
            <div
              id="home_sidemenu_scrollbar"
              style={{ height: "94.2vh" }}
              className="col-lg-2 col-md-3 col-9 p-0 d-md-block d-none bg-dark text-light p-1 overflow-auto z-2"
            >
              <aside className="main-sidebar">
                <section className="sidebar">
                  <br />
                  <ul className="sidebar-menu">
                    <li>
                      <Link to="/member/dashboard">
                        <i className="fa fa-dashboard"></i>
                        <span className="px-2">Statistics</span>
                      </Link>
                    </li>
                    <li className="treeview">
                      <span
                        onClick={handleToggle}
                        className="d-flex align-items-center justify-content-between pointer"
                      >
                        <span>
                          <i className='fa fa-link'></i>
                          <span className="px-1">Manage Links</span>
                        </span>
                        <i className={`fa fa-angle-left pull-right ${activeMenu === 0 ? 'rotate-icon' : ''}`} style={{ fontSize: 15 }}></i>
                      </span>
                      <ul className={`home_side_menu_treeview_menu ${activeMenu === 0 ? 'show' : ''}`}>
                        <li>
                          <Link to="/member/links">All Links</Link>
                        </li>
                        <li>
                          <Link to="/member/links/hidden">Hidden Links</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/member/withdraws">
                        <i className="fa fa-dollar"></i>
                        <span className="px-3">Withdraw</span>
                      </Link>
                    </li>
                    <li className="treeview">
                      <span
                        onClick={handleToggle}
                        className="d-flex align-items-center justify-content-between pointer"
                      >
                        <span>
                          <i className='fa fa-wrench'></i>
                          <span className="px-2">Tools</span>
                        </span>
                        <i className={`fa fa-angle-left pull-right ${activeMenu === 1 ? 'rotate-icon' : ''}`} style={{ fontSize: 15 }}></i>
                      </span>
                      <ul className={`home_side_menu_treeview_menu ${activeMenu === 1 ? 'show' : ''}`}>
                        <li>
                          <Link to="/member/tools/quick">Quick Link</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/member/users/referrals">
                        <i className="fa fa-exchange"></i>
                        <span className="px-2">Referrals</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/member/invoices">
                        <i className="fa fa-credit-card"></i>
                        <span className="px-1">Invoices</span>
                      </Link>
                    </li>
                    <li className="treeview">
                      <span
                        onClick={handleToggle}
                        className="d-flex align-items-center justify-content-between pointer"
                      >
                        <span>
                          <i className='fa fa-gears'></i>
                          <span className="px-1">Settings</span>
                        </span>
                        <i className={`fa fa-angle-left pull-right ${activeMenu === 2 ? 'rotate-icon' : ''}`} style={{ fontSize: 15 }}></i>
                      </span>
                      <ul className={`home_side_menu_treeview_menu ${activeMenu === 2 ? 'show' : ''}`}>
                        <li>
                          <Link to="/member/users/profile">Profile</Link>
                        </li>
                        <li>
                          <Link to="/member/users/change_password">Change Password</Link>
                        </li>
                        <li>
                          <Link to="/member/users/change_email">Change Email</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/member/forms/support">
                        <i className="fa fa-life-ring"></i>
                        <span className="px-2">Support</span>
                      </Link>
                    </li>
                  </ul>
                </section>
              </aside>
            </div>
            <div id="home_page_admin_content_section" className="col-lg-10 col-md-9 col-12 p-0 d-flex flex-column justify-content-between">
              {props.element}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );

};

export default HomePageAdmin;
