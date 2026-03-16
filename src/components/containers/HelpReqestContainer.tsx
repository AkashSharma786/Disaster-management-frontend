import { useDispatch, useSelector } from "react-redux";
import { getResidents } from "../../services/userService";
import { setUsers } from "../../redux/slices/users";
import { useEffect, useState } from "react";
import { getAllRequests, getRequestsByResident, getResidentRequests } from "../../services/helpRequestService";
import { setHelpRequests } from "../../redux/slices/helpRequests";
import { HelpRequestCard } from "../Cards/HelpRequestCard";
import { MessageCard } from "../Cards/MessageCard";

export type childProps={
    showPopup : () => void,
    rescueTask?:number
};
 function HelpRequestContainer() {
    const dispatch = useDispatch();

    const [residents , setResidents]= useState<any>(null);
    const [residentsId, setResidentsId] = useState(0)
 
    const userInfo = useSelector((state:any)=> state.auth.userInfo);
    const [popup, setPopup] = useState(false)
    const requests = useSelector((state:any)=> state.helpRequests.helpRequestList)


    

    useEffect(  ()=> {

          const fetchResidents = async () => {
      try {
        const data = await getResidents();
        dispatch(setUsers(data));
        setResidents(data);
      } catch (error) {
        console.error('Failed to fetch residents:', error);
        // Handle error (e.g., show toast or set error state)
      }
    };

    


    if(userInfo != null && userInfo.role === "ADMIN")
        fetchResidents();
    },[])

    //console.log(residents)

    const fetchRequests = async (residentId:number)=>{
        try{
            const requestData = (residentId === 0)? await getAllRequests()
                                : await getRequestsByResident(residentId);
            dispatch(setHelpRequests(requestData));
         

        }
        catch(e){
            console.error("Error occurred");
        }
    }

    const fetchResidentRequests = async ()=>{
        try {
            const requestData = await getResidentRequests();
            dispatch(setHelpRequests(requestData))
            
            
        } catch (error) {
            
        }

    }

    const handleRequestGet = async ()=>{
        if(userInfo != null && userInfo.role === "ADMIN")
            await fetchRequests(residentsId);
        else
            await fetchResidentRequests();
        console.log(requests)


    }

     function showPopup(){
        setPopup(!popup)

    }

 

    




   
    

   






    return (<>
        <div className="container user-viewer">
            {popup &&<MessageCard showPopup={showPopup}/>}

            {(userInfo.role === "ADMIN")?<select className="select" onChange={ (e)=> setResidentsId(Number.parseInt(e.target.value))} >
                <option key={0} value={0}> All Residents</option>
                {residents?.map((item:any, index:number)=>{
                    return <option key={index +1} value={item.id}>{item.id} {item.firstName} {item.lastName}</option>

                })}

            </select>:null }


            


            <button className="button" onClick={handleRequestGet}>Get</button>
            {(userInfo.role !== "ADMIN")? <button className="button broadcast-button"  onClick={showPopup} >Create Request</button>: null}
            

        </div>
        <div className="container user-viewer">
            {requests?.map((item:any, index:number)=>{
                return <HelpRequestCard key={index} request={item}/>

            })}



        </div>
        


    </>)
}

export default HelpRequestContainer;
