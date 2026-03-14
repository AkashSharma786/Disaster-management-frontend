import { useState } from "react";
import '../../assets/styles/container/usersContainer.css'
import UserCard from "../Cards/UsersCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/slices/users";
import { getAdmins, getAllUsers, getResidents, getResponders } from "../../services/userService";

function UsersContainer(){

    const [userRole , setUserRole] = useState(0);
    const dispatch = useDispatch();
    const users = useSelector((state:any)=> state.users.usersList)

    function handleGet(){
        

        let users:Promise<any> = getAllUsers();
       
        switch(userRole) {
            case 0:
                users = getAllUsers();
                break;
                
            case 1:
                users = getAdmins();
                break;
                
            case 2:
                users = getResidents();
                break;
                
            case 3:
                users = getResponders();
                
            default:
                break;
        }
        
        users.then(user =>{
            console.log(user)
            dispatch(setUsers(user))
        })
        .catch(e=> {
            console.error(e);
        })


    }
    

    return(<>
    <div className="container  user-viewer">

        <select value={userRole} onChange={(e) => setUserRole(Number.parseInt(e.target.value))}    >
                    <option value={0}>All Users</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Resident</option>
                    <option value={3}>Respondent</option>

                </select>

        <button className="button" onClick={handleGet}> Get Users</button>
    </div>

    <div className="container users-container">
       
       {
        users.map((user:any, index:number) =>{
            return <UserCard key={index} user={user}/>
        })
       }
           


    </div>
    
    
    </>)
}

export default UsersContainer;