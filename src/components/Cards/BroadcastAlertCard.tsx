import { useState } from 'react';
import '../../assets/styles/cards/alertItemCard.css'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";


const BroadcastAlertCard = ({ alertItem }:any) => {

  if(alertItem == null)
     return <p>"Null"</p>
  
  const [expanded, setExpanded] = useState(false);

  const toggleCard = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div className='container card'>

 
      <div className='header'>
        <div>
          <p className='message'>{alertItem.message}</p>
          <p className='date'>
            Effective: {new Date(alertItem.effectiveDate).toLocaleString()}
          </p>
        </div>

        <div className='button-box'>


          <button onClick={toggleCard} className='arrow-btn'>
            {
              expanded ? <SlArrowDown /> : <SlArrowRight />

            }

          </button>
     
        </div>


      </div>

      {/* Expandable Section */}
      {expanded && (
        <div className='extra-info'>
          
             <p><strong>Id:</strong>{alertItem.id}</p> 
          
          <p><strong>Event:</strong> {alertItem.event}</p>
          <p><strong>Severity:</strong> {alertItem.severity}</p>
          <p><strong>Urgency:</strong> {alertItem.urgency}</p>
          <p><strong>Certainty:</strong> {alertItem.certainty}</p>
          <p><strong>Expiry:</strong> {new Date(alertItem.expiryDate).toLocaleString()}</p>
          <p><strong>Instruction:</strong> {alertItem.instruction}</p>
        </div>
      )}
    </div>
  );
}




export default BroadcastAlertCard
