import { useDispatch, useSelector } from 'react-redux';
import '../../assets/styles/cards/RescueTaskCard.css'
import { MessageCard } from './MessageCard';
import { useState } from 'react';
import type { RescueTaskProp } from '../containers/RescueTaskContainer';
import { deleteOneHelpRequest } from '../../redux/slices/helpRequests';
import { deleteRescueTask } from '../../services/rescueTaskService';
import { deleteOneRescueTask } from '../../redux/slices/rescueTask';

export function RescueTaskCard({ rescueTask , showPopup, setSelectedRescueTask}:RescueTaskProp) {
    const userInfo = useSelector((state:any)=> state.auth.userInfo);
    const volunteers = rescueTask.volunteers 
    const dispatch = useDispatch();
    
    
        function handleReportSubmit(){
             setSelectedRescueTask!(Number.parseInt(rescueTask.id))
             dispatch(deleteOneHelpRequest(rescueTask))
            
            showPopup!();
    
        }

        function handleEdit(){
            setSelectedRescueTask!(Number.parseInt(rescueTask.id))
            showPopup!();
        }

        function handleDelete(){
            deleteRescueTask(Number.parseInt(rescueTask.id))
            .then((data)=>{
                console.log(data)
            })

            dispatch(deleteOneRescueTask(rescueTask.id))

        }

    return (<>
        <div className="container rescue-task-card">
            
            <div>
                <h2>{rescueTask.message}</h2>
            </div>

            <h2>Alert</h2>
            
            <div className="container">
                
                <h3><strong>Id:  {rescueTask.alertItem.id}</strong></h3>
                <h3>{rescueTask.alertItem.message}</h3>
                

            </div>
            
            
            <h3>status: <strong>{rescueTask.status}</strong> <br />Responders</h3>
            
            <div className='container responders-container'>

                {
                    volunteers.map((item: any, index: number) => {
                        console.log(item);

                        
                           
                         
                       return <div className='responder-box' key={index}>
                            <p>Id: <strong>{item.id}</strong></p>
                            <p>Name: <strong>{item.firstName} {item.lastName} </strong></p>

                        </div>

                    })
                }

            </div>
            {(userInfo.role === "ADMIN")?
             <div className='button-box'>
                <button className='button delete-button' onClick={handleDelete}>Delete</button>
                <button className='button' onClick={handleEdit}>Edit</button>
            </div>
            :
            <button className='button broadcast-button' onClick={handleReportSubmit}> Submit Report</button>
        }
           





        </div>

    </>)

}