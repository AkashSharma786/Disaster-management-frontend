import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStateId } from "../../redux/slices/alert";
import axios from "axios";
import { setRescueTaskList } from "../../redux/slices/rescueTask";
import { RescueTaskCard } from "../Cards/RescueTaskCard";
import '../../assets/styles/container/rescueTaskContainer.css'
import { getRescueTask } from "../../services/rescueTaskService";

function RescueTaskContainer(){
    const dispatch = useDispatch();
    const [selectedStateOrUt, setSelectedStateOrUt] = useState(0);
    const stateOrUtList = useSelector((state:any)=> state.stateOrUts.stateOrUtList);
    const rescueTaskList = useSelector((state:any)=> state.rescueTask.rescueTaskList);
    async function handleGet(){
       
      const data = await  getRescueTask();
        dispatch(setRescueTaskList(data));
        
       
        
    }

    return(<>
    <div className="container  user-viewer">
        <select value={selectedStateOrUt} onChange={(e) => {
            dispatch(setStateId(Number.parseInt(e.target.value)))
            setSelectedStateOrUt(Number.parseInt(e.target.value))
            }}    >
                            <option value={0}>Select State/UT</option>
                            {stateOrUtList.map((stateOrUTName: any) => <option key={stateOrUTName.id} value={stateOrUTName.id}>{stateOrUTName.name}</option>
                            )}
        
                        </select>

       

        <button className="button" onClick={handleGet}> Get</button>
        <button className="button broadcast-button"> Create </button>
    </div>
    <div className="container user-viewer">
        {
            rescueTaskList.map((rescueTask:any, index:number)=>{
                return <RescueTaskCard key={index} rescueTask={rescueTask} />
            })
        }


    </div>
    
    </>)
}

export default RescueTaskContainer;