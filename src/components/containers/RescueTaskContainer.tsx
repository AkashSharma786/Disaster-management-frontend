import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStateId } from "../../redux/slices/alert";
import axios from "axios";
import { setRescueTaskList } from "../../redux/slices/rescueTask";
import { RescueTaskCard } from "../Cards/RescueTaskCard";
import '../../assets/styles/container/rescueTaskContainer.css'
import { getRescueTask, getResponderRescueTask } from "../../services/rescueTaskService";
import { MessageCard } from "../Cards/MessageCard";
import { RescueTaskEditor } from "../Cards/RescueTaskEditor";
export type RescueTaskProp={
    rescueTask:any,
    showPopup?: ()=>void,
    setSelectedRescueTask?: (id:number)=>void
}
function RescueTaskContainer() {
    const dispatch = useDispatch();
    const [selectedStateOrUt, setSelectedStateOrUt] = useState(0);
    const stateOrUtList = useSelector((state: any) => state.stateOrUts.stateOrUtList);
    const rescueTaskList = useSelector((state: any) => state.rescueTask.rescueTaskList);
    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const [selectedRescueTask, setSelectedRescueTask] = useState(0);

    const [popup , setPopup]= useState(false);

    
    function showPopup(){
            setPopup(!popup)
        }
    
    function showRescuTaskCreator(){
        setSelectedRescueTask(0)
        showPopup();
    }
   

    async function handleGet() {

        const data = await getRescueTask();
        dispatch(setRescueTaskList(data));



    }

    async function handleResponderGet() {
        const data = await getResponderRescueTask();
        dispatch(setRescueTaskList(data))
    }

   


    useEffect(()=>{

    }, [selectedRescueTask])

    

    return (<>
        <div className="container  user-viewer">
            {(userInfo.role !== "ADMIN") && popup && <MessageCard showPopup={showPopup} rescueTask={selectedRescueTask}/>}

            {(userInfo.role === "ADMIN") && popup && <RescueTaskEditor showPopup={showPopup} rescueTask={selectedRescueTask}/>}
            

            {(userInfo.role === "ADMIN") ?
                <select value={selectedStateOrUt} onChange={(e) => {
                    dispatch(setStateId(Number.parseInt(e.target.value)))
                    setSelectedStateOrUt(Number.parseInt(e.target.value))
                }}    >
                    <option value={0}>Select State/UT</option>
                    {stateOrUtList.map((stateOrUTName: any) => <option key={stateOrUTName.id} value={stateOrUTName.id}>{stateOrUTName.name}</option>
                    )}

                </select>
                : null}




            <button className="button" onClick={(userInfo.role === "ADMIN")?handleGet : handleResponderGet}> Get</button>
            {(userInfo.role === "ADMIN")?
            <button className="button broadcast-button" onClick={showRescuTaskCreator}> Create </button>: null
            
        }
            
        </div>
        <div className="container task-viewer">
            {
                rescueTaskList.map((rescueTask: any, index: number) => {
                    return <RescueTaskCard key={index} rescueTask={rescueTask} showPopup={showPopup} setSelectedRescueTask={setSelectedRescueTask} />
                })
            }


        </div>

    </>)
}

export default RescueTaskContainer;