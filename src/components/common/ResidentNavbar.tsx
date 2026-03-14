import { NavLink } from 'react-router'
import '../../assets/styles/common/Navbar.css'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/auth';

export function ResidentNavbar(){
    const dispatch = useDispatch();
    function handleLogout(){
        localStorage.removeItem('token');
        
                dispatch(setUserInfo(null));

    }

    return (<>
    <nav className='navbar'>
        <div className="logo">Resident Dashboard</div>

      <div className="nav-links">
        <NavLink to="/resident" className="nav-item">
          Alerts
        </NavLink>
        <NavLink to="/resident/help-requests" className="nav-item">
        Help Requests
        </NavLink>

        
        <button className="button logout" onClick={handleLogout}><RiLogoutBoxRLine/></button>
        </div>

    </nav>
    
    </>)
}