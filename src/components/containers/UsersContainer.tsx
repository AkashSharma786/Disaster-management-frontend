import { useState } from "react";
import '../../assets/styles/container/usersContainer.css'
import UserCard from "../Cards/UsersCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/slices/users";

function UsersContainer(){

    const [userRole , setUserRole] = useState(0);
    const dispatch = useDispatch();
    const users = useSelector((state:any)=> state.users.usersList)

    function handleGet(){
        let allUserUri = "http://localhost:8080/admin/users";
        let adminUserUri = "http://localhost:8080/admin/admins";
        let residentsUri = "http://localhost:8080/admin/residents";
        let respondersUri = "http://localhost:8080/admin/responders";

       let uri = ""
        switch(userRole) {
            case 0:
                uri = allUserUri;
                break;
                
            case 1:
                uri= adminUserUri;
                break;
                
            case 2:
                uri= residentsUri;
                break;
                
            case 3:
                uri= respondersUri;
               
        
            default:
                break;
        }
        axios.get(uri,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        .then(response =>{
            console.log(response.data)
            dispatch(setUsers(response.data))
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