import { Outlet, Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import "./Layout.css";


const Layout = () => {
  const location = useLocation();
  return (
    <>
     <div className="VNavbarContainer">
      <h2>Attribute Manager</h2>
      <nav className="VNavbarNav">
        <ul className="VNavbarList">
          <li className="sidebarMenuIcon">
            <DashboardIcon />
            <Link className="sidebarMenuList" to="/Dashboard">
              Dashboard
            </Link>
          </li>
          <li className="sidebarMenuIcon">
            <ArrowCircleRightTwoToneIcon />
            <Link className="sidebarMenuList" to="/FileUpload">
              File Upload
            </Link>
          </li>
          <li className="sidebarMenuIcon">
            <ArrowCircleRightTwoToneIcon />
            <Link className="sidebarMenuList" to="/Template">
              Template            
            </Link>
          </li>
          <li className="sidebarMenuIcon">
            <ArrowCircleRightTwoToneIcon />
            <Link className="sidebarMenuList" to="/Query">
              Query
            </Link>
          </li>
          <li className="sidebarMenuIcon">
            <ArrowCircleRightTwoToneIcon />
            <Link className="sidebarMenuList" to="/Execution">
              Execution
            </Link>
          </li>
          <li className="sidebarMenuIcon bottomlistitemshelp">
            <HelpOutlineTwoToneIcon />
            <Link className="sidebarMenuList" activeClassName="active" to="/help">
              Help
            </Link>
          </li>
          <li className="sidebarMenuIcon bottomlistitemslogout">
            <LogoutTwoToneIcon />
            <Link className="sidebarMenuList" activeClassName="active" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      </div>

      <Outlet/>
    </>
   
  );
};

export default Layout;
