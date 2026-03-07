import '../../assets/styles/cards/alertItemCard.css'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import type { AlertCardProp } from '../containers/AlertItemContainer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteSavedAlert, saveAlert } from '../../services/alertService';
import { deleteAlert } from '../../redux/slices/alert';

const AlertItemCard = ({alertItem,  index }:AlertCardProp) => {
  const stateId = useSelector((state:any)=> state.alerts.stateId);
  const isSaved = useSelector((state:any)=> state.alerts.isSaved);

  const dispatch = useDispatch();

  

  const [expanded, setExpanded] = useState(false);

  
 
   function handleSave(){

    saveAlert(stateId, index)
    .then(data=>{
      alert(data);
    })
    .catch(e=>{
      console.error(e)
    })
    
  }

  function handleDelete(){

    dispatch(deleteAlert(alertItem.id))

    deleteSavedAlert(alertItem.id)

    .then(data=>{
      alert(data);
    })
    .catch(e=>{
      console.error(e)
    })
   

  }

  const toggleCard = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div className='container card'>
      
      {/* Top Section (Always Visible) */}
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
            expanded ?  <SlArrowDown/>: <SlArrowRight/>
            
        }
          
        </button>
        {
          (isSaved)?
           <button className='button delete-button' onClick={handleDelete}> Delete </button>
           :<button className='button ' onClick={handleSave}> save</button>
        }
       

        <button className='button broadcast-button'> broadcast</button>

        </div>

        
      </div>

      {/* Expandable Section */}
      {expanded && (
        <div className='extra-info'>
          {
            isSaved? <p><strong>Id:</strong>{alertItem.id}</p>: null
          }
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
};



export default AlertItemCard;

