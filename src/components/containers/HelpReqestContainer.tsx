import { useDispatch, useSelector } from "react-redux";
import { getResidents } from "../../services/userService";
import { setUsers } from "../../redux/slices/users";
import { useEffect, useState } from "react";
import { getAllRequests, getRequestsByResident } from "../../services/helpRequestService";
import { setHelpRequests } from "../../redux/slices/helpRequests";
import { HelpRequestCard } from "../Cards/helpRequestCard";


 function HelpRequestContainer() {
    const dispatch = useDispatch();

    const [residents , setResidents]= useState<any>(null);
    const [residentsId, setResidentsId] = useState(0)
    const [requests, setRequests] = useState<any>(null);

    
    

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

    



    fetchResidents();
    },[])

    console.log(residents)

    const fetchRequests = async (residentId:number)=>{
        try{
            const requestData = (residentId === 0)? await getAllRequests()
                                : await getRequestsByResident(residentId);
            dispatch(setHelpRequests(requestData));
            setRequests(requestData);

        }
        catch(e){
            console.error("Error occurred");
        }
    }

    const handleRequestGet = async ()=>{
        await fetchRequests(residentsId);
        console.log(requests)


    }




   
    

   






    return (<>
        <div className="container user-viewer">


            <select className="select" onChange={ (e)=> setResidentsId(Number.parseInt(e.target.value))} >
                <option key={0} value={0}> All Residents</option>
                {residents?.map((item:any, index:number)=>{
                    return <option key={index +1} value={item.id}>{item.id} {item.firstName} {item.lastName}</option>

                })}

            </select>


            <button className="button" onClick={handleRequestGet}>Get</button>

        </div>
        <div className="container user-viewer">
            {requests?.map((item:any, index:number)=>{
                return <HelpRequestCard key={index} request={item}/>

            })}



        </div>


    </>)
}

export default HelpRequestContainer;