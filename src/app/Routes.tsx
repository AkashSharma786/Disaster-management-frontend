import { Routes, Route } from 'react-router';
import Login from '../components/forms/Login';
import Registration from '../components/forms/Registration';

import AuthRoute from '../components/common/AuthRoute';
import Admin from '../pages/admin';
import Resident from '../pages/resident';
import Respondent from '../pages/respondent';


function AppRoutes() {
    return (

        <Routes>


            <Route path='/' element={<AuthRoute />} />



            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/resident" element={<Resident />} />
            <Route path="/respondent" element={<Respondent />} />











        </Routes>
    );
}

export default AppRoutes;