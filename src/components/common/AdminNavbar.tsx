
import { NavLink } from "react-router";
import '../../assets/styles/common/Navbar.css'
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";
const AdminNavbar = () => {

    const dispatch = useDispatch();

        function handleLogout() {

        localStorage.removeItem('token');

        dispatch(setUserInfo(null));

    }


  return (
    <nav className="navbar ">
      <div className="logo">Admin Dashboard</div>

      <div className="nav-links">
        <NavLink to="/admin" className="nav-item">
          Alerts
        </NavLink>

        <NavLink to="/admin/help-requests" className="nav-item">
          HelpRequests
        </NavLink>

        <NavLink to="/admin/reports" className="nav-item">
          Reports
        </NavLink>

        <NavLink to="/admin/rescue-tasks" className="nav-item">
          RescueTasks
        </NavLink>

        <NavLink to="/admin/users" className="nav-item">
          Users
        </NavLink>
        <button className="button logout" onClick={handleLogout}><RiLogoutBoxRLine/></button>


      </div>
    </nav>
  );
};

export default AdminNavbar;