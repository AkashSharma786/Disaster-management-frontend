
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/auth";
import AlertItemContainer from "../components/containers/AlertItemContainer";

function Admin() {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    function handleLogout() {

        localStorage.removeItem('token');

        dispatch(setUserInfo(null));

    }
    console.log(auth);

    if (auth.isAuthenticated === false || auth.userInfo.role !== 'ADMIN') {
        window.location.href = '/';
    }



    return (<>
        <h1>Admin Page</h1>
        <AlertItemContainer />
        <button className="button" onClick={handleLogout}>Logout</button>
    </>);
}

export default Admin;