import { Routes, Route } from 'react-router';
import Login from '../components/forms/Login';
import Registration from '../components/forms/Registration';
import AdminPage from '../pages/admin';
import ResidentPage from '../pages/resident';
import RespondentPage from '../pages/respondent';
import AuthRoute from '../components/common/AuthRoute';


function AppRoutes() {
    return (

        <Routes>


            <Route path='/' element={<AuthRoute />} />



            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/resident" element={<ResidentPage />} />
            <Route path="/respondent" element={<RespondentPage />} />











        </Routes>
    );
}

export default AppRoutes;