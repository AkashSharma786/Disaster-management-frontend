import { NavLink } from 'react-router'
import '../../assets/styles/common/Navbar.css'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/auth';

export function RespondentNavbar(){
    const dispatch = useDispatch();
    function handleLogout(){
        localStorage.removeItem('token');
        
                dispatch(setUserInfo(null));

    }

    return (<>
    <nav className='navbar'>
        <div className="logo">Respondent Dashboard</div>

      <div className="nav-links">
        <NavLink to="/respondent" className="nav-item">
          Submitted Reports
        </NavLink>
        <NavLink to="/respondent/rescue-tasks" className="nav-item">
          Assigned Rescue Tasks
        </NavLink>

        
        <button className="button logout" onClick={handleLogout}><RiLogoutBoxRLine/></button>
        </div>

    </nav>
    
    </>)
}