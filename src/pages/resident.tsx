import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/auth";


function Resident() {
const dispatch = useDispatch();

    const auth = useSelector((state: any) => state.auth);
    
     function handleLogout() {
        localStorage.removeItem('token');
        dispatch(setUserInfo(null));
    }
     if(auth.isAuthenticated === false || auth.userInfo.role !== 'RESIDENT') {
        window.location.href = '/';
    }
  

    return (<>
    <h1>Resident Page</h1>
     <button className="button" onClick={handleLogout}>Logout</button>
    </>);
}

export default Resident;