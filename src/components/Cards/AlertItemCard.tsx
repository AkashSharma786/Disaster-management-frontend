import '../../assets/styles/cards/alertItemCard.css'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";

const AlertItemCard = ({alert}:any) => {
  const [expanded, setExpanded] = useState(false);
  

  const toggleCard = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div className='container card'>
      
      {/* Top Section (Always Visible) */}
      <div className='header'>
        <div>
          <p className='message'>{alert.message}</p>
          <p className='date'>
            Effective: {new Date(alert.effectiveDate).toLocaleString()}
          </p>
        </div>

        {/* Arrow Button */}
        <button onClick={toggleCard} className='arrow-btn'>
        {
            expanded ?  <SlArrowDown/>: <SlArrowRight/>
            
        }
          
        </button>
      </div>

      {/* Expandable Section */}
      {expanded && (
        <div className='extra-info'>
          <p><strong>Event:</strong> {alert.event}</p>
          <p><strong>Severity:</strong> {alert.severity}</p>
          <p><strong>Urgency:</strong> {alert.urgency}</p>
          <p><strong>Certainty:</strong> {alert.certainty}</p>
          <p><strong>Expiry:</strong> {new Date(alert.expiryDate).toLocaleString()}</p>
          <p><strong>Instruction:</strong> {alert.instruction}</p>
        </div>
      )}
    </div>
  );
};



export default AlertItemCard;

