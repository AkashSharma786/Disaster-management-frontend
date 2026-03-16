import { useDispatch, useSelector } from 'react-redux';
import '../../assets/styles/cards/HelpRequestCard.css'
import { deleteHelpRequest } from '../../services/helpRequestService';
import { deleteOneHelpRequest } from '../../redux/slices/helpRequests';

export function HelpRequestCard({request}:any){
    const userInfo = useSelector((state:any)=> state.auth.userInfo);
    const dispatch = useDispatch();
    function handleDelete(){
        
        deleteHelpRequest(Number.parseInt(request.id))
        .then((data)=>{
            console.log("Deleted " + data)
            dispatch(deleteOneHelpRequest(request))
            
        })
        .catch((e)=>{
            console.error("Error occurred while deleting" +e)
        })

    }

    return (<>
    
       <div className="container help-request">
        
        <div ><h2>{request.message}</h2></div>
        
        
        <div ><h2>{request.user.firstName} {request.user.lastName}</h2></div>

        {(userInfo.role === "ADMIN")? <><button className="button">Rescue </button>

        <button className="button delete-button" onClick={handleDelete}> delete</button></>: null}
       </div>
       
    </>);

}