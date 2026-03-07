
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/auth";
import AlertItemContainer from "../components/containers/AlertItemContainer";
import AdminNavbar from "../components/common/AdminNavbar";
import { Outlet } from "react-router";


function Admin() {
   
    const auth = useSelector((state: any) => state.auth);


    console.log(auth);

    if (auth.isAuthenticated === false || auth.userInfo.role !== 'ADMIN') {
        window.location.href = '/';
    }




    return (<>
        <AdminNavbar/>
        
        <Outlet/>
        
    </>);
}

export default Admin;