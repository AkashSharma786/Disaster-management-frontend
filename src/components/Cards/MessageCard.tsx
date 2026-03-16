import { useEffect, useRef, useState } from 'react'
import '../../assets/styles/cards/messageCard.css'
import type { childProps } from '../containers/HelpReqestContainer'
import { IoClose } from "react-icons/io5";
import { sendHelpRequest } from '../../services/helpRequestService';
import { sendReport } from '../../services/reportService';
import { useSelector } from 'react-redux';

export function MessageCard({showPopup, rescueTask}:childProps){
    const containerRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState("");
    const userInfo = useSelector((state:any)=> state.auth.userInfo);
   

      useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        showPopup();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showPopup]);


   const handleRequestSend = ()=>{
    if(message.length == 0)
    {
        alert("Cannot send Empty message");
        return;

    }

      sendHelpRequest(message)
      .then((response)=>{
        console.log(response)

      })
      .catch((e)=>{
        console.error("Error occurred while sending Requests"+ e);

      })
      showPopup();

   }

   const handleReportSend =()=>{
    console.log(rescueTask)
    console.log(rescueTask!)
    console.log(userInfo)

    if(rescueTask != undefined && rescueTask !== 0){
        console.log(rescueTask , message);
        sendReport(rescueTask, message)
        .then((data)=>{
          console.log(data)
        })
        .catch((e)=>{
          console.error("Error occurred while sending report" + e)
        })


    }
    showPopup()
      
   }
    
    

    return (<>
    <div ref={containerRef} className='container message-card popup'>

        <h1>Message</h1>
        <button className='button logout close-button' onClick={showPopup}><IoClose></IoClose></button>

        
      <textarea  cols={30} rows={5} onChange={(e)=> setMessage(e.target.value)}></textarea>

      <button className="button broadcast-button" onClick={(userInfo.role === "RESIDENT")?handleRequestSend:handleReportSend}>Send</button>

        
    </div></>
    )
}