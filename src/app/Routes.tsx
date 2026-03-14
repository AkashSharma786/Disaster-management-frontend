import { Routes, Route } from 'react-router';
import Login from '../components/forms/Login';
import Registration from '../components/forms/Registration';

import AuthRoute from '../components/common/AuthRoute';
import Admin from '../pages/admin';
import Resident from '../pages/resident';
import Respondent from '../pages/respondent';
import AlertItemContainer from '../components/containers/AlertItemContainer';
import HelpRequestContainer from '../components/containers/HelpReqestContainer';
import ReportsContainer from '../components/containers/ReportsContainer';
import RescueTaskContainer from '../components/containers/RescueTaskContainer';
import UsersContainer from '../components/containers/UsersContainer';
import ResidentContainer from '../components/containers/ResidentContainer';


function AppRoutes() {
    return (

        <Routes>


            <Route path='/' element={<AuthRoute />} />



            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Registration />} />
            

            <Route path="/admin" element= {<Admin/>}>
                
                <Route index element={<AlertItemContainer/>}/>
                <Route path="help-requests" element={<HelpRequestContainer/>} />
                <Route path="reports" element={<ReportsContainer/>} />
                <Route path="rescue-tasks" element={<RescueTaskContainer/>} />
                <Route path="users" element={<UsersContainer/>} />
            
            </Route>

            <Route path='/resident' element={<Resident/>}>
               <Route index element={<ResidentContainer/>}/>
               <Route path='help-requests' element={<HelpRequestContainer/>}/>
            </Route>
            <Route path='/respondent' element={<Respondent/>}>
               <Route index element={<ReportsContainer/>}/>
               <Route path='rescue-tasks' element={<RescueTaskContainer/>}/>
            </Route>


            











        </Routes>
    );
}

export default AppRoutes;