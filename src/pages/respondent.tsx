import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/auth";
import { RespondentNavbar } from "../components/common/RespondentNavBar";
import { Outlet } from "react-router";

function Respondent() {

    const auth = useSelector((state:any)=> state.auth);

    
    if(auth.isAuthenticated === false || auth.userInfo.role !== 'RESPONDENT') {
        window.location.href = '/';
    }
    

    return (<>
        <RespondentNavbar/>
        <Outlet/>
     
    </>);
}

export default Respondent;