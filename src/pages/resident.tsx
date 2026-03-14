import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/auth";
import ResidentContainer from "../components/containers/ResidentContainer";
import { Client } from "@stomp/stompjs";
import { ResidentNavbar } from "../components/common/ResidentNavbar";
import { Outlet } from "react-router";


function Resident() {

    

     

const dispatch = useDispatch();

    const auth = useSelector((state: any) => state.auth);
    
   
     if(auth.isAuthenticated === false || auth.userInfo.role !== 'RESIDENT') {
        window.location.href = '/';
    }
  

    return (<>
    <ResidentNavbar/>
    <Outlet/>
    
    </>);
}

export default Resident;