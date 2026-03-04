import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/auth";

function Respondent() {
const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);


     function handleLogout() {
        localStorage.removeItem('token');
        dispatch(setUserInfo(null));

    }

    
    if(auth.isAuthenticated === false || auth.userInfo.role !== 'RESPONDENT') {
        window.location.href = '/';
    }
    

    return (<>
    <h1>Respondent Page</h1>
     <button className="button" onClick={handleLogout}>Logout</button>
    </>);
}

export default Respondent;