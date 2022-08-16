/**
 * App Header
 */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { admin, rolesObj } from "../../utils/roles";
const Sidebar = (props) => {
  const role = useSelector((state) => state.auth.role);

  const [isSideMenu, setSideMenu] = useState("");
  const [level2Menu, setLevel2Menu] = useState("");
  const [level3Menu, setLevel3Menu] = useState("");

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);
  };

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value);
  };
  const toggleLevelThree = (value) => {
    setLevel3Menu(value);
  };

  let pathname = props.location.pathname;
  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} autoHeight autoHeightMin={0} autoHeightMax="95vh" thumbMinSize={30} universal={false} hideTracksWhenNotNeeded={true}>
        {role == admin && (
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className="submenu">
                  <a href="#" className={isSideMenu == "dashboard" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}>
                    <i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "dashboard" ? (
                    <ul>
                      <li>
                        <Link className={pathname.includes("main/dashboard") ? "active" : ""} to="/app/main/dashboard">
                          Admin Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a href="#" className={isSideMenu == "employee" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "employee" ? "" : "employee")}>
                    <i className="la la-user" /> <span className="noti-dot"> Employees</span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "employee" ? (
                    <ul>
                      <li>
                        <Link className={pathname.includes("allemployees") ? "active" : pathname.includes("employees-list") ? "active" : ""} to="/app/employee/allemployees">
                          All Employees
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className={pathname.includes("clients") ? "active" : ""}>
                  <Link to="/app/employees/clients">
                    <i className="la la-users" /> <span>Clients</span>
                  </Link>
                </li>

                <li className={pathname.includes("Leads") ? "active" : pathname.includes("Lead-view") ? "active" : ""}>
                  <Link to="/app/employees/Leads">
                    <i className="la la-ticket" /> <span>Leads</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {role == rolesObj.TEAMLEAD && (
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className="submenu">
                  <a href="#" className={isSideMenu == "dashboard" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}>
                    <i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "dashboard" ? (
                    <ul>
                      <li>
                        <Link className={pathname.includes("main/employee-") ? "active" : ""} to="/app/main/employee-dashboard">
                          Employee Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a href="#" className={isSideMenu == "employee" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "employee" ? "" : "employee")}>
                    <i className="la la-user" /> <span className="noti-dot"> Employees</span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "employee" ? (
                    <ul>
                      <li>
                        <Link className={pathname.includes("allemployees") ? "active" : pathname.includes("employees-list") ? "active" : ""} to="/app/employee/allemployees">
                          All Employees
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className={pathname.includes("clients") ? "active" : ""}>
                  <Link to="/app/employees/clients">
                    <i className="la la-users" /> <span>Clients</span>
                  </Link>
                </li>

                <li className={pathname.includes("Leads") ? "active" : pathname.includes("Lead-view") ? "active" : ""}>
                  <Link to="/app/employees/Leads">
                    <i className="la la-ticket" /> <span>Leads</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {role == rolesObj.SPOKE && (
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className="submenu">
                  <a href="#" className={isSideMenu == "dashboard" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}>
                    <i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "dashboard" ? (
                    <ul>
                      <li>
                        <Link className={pathname.includes("main/employee-") ? "active" : ""} to="/app/main/employee-dashboard">
                          Employee Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li className={pathname.includes("Leads") ? "active" : pathname.includes("Lead-view") ? "active" : ""}>
                  <Link to="/app/employees/Leads">
                    <i className="la la-ticket" /> <span>Leads</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Scrollbars>
    </div>
  );
};

export default withRouter(Sidebar);
