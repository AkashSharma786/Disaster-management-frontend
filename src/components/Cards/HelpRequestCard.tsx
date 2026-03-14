import { useSelector } from 'react-redux';
import '../../assets/styles/cards/HelpRequestCard.css'

export function HelpRequestCard({request}:any){
    const userInfo = useSelector((state:any)=> state.auth.userInfo);

    return (<>
    
       <div className="container help-request">
        
        <div ><h2>{request.message}</h2></div>
        
        
        <div ><h2>{request.user.firstName} {request.user.lastName}</h2></div>

        {(userInfo.role === "ADMIN")? <><button className="button">Rescue </button>

        <button className="button delete-button"> delete</button></>: null}
       </div>
       
    </>);

}