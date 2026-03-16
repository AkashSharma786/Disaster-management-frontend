import { useEffect, useRef, useState } from 'react'
import '../../assets/styles/cards/messageCard.css'
import type { childProps } from '../containers/HelpReqestContainer'
import { IoClose } from "react-icons/io5";
import '../../assets/styles/cards/rescueTaskEditor.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSavedAlerts } from '../../services/alertService';
import { setAlerts } from '../../redux/slices/alert';
import Select, { type Options } from 'react-select'
import { getResponders } from '../../services/userService';
import { setUsers } from '../../redux/slices/users';
import { createRescueTask, getRescueTask, getRescueTaskById, updateRescueTask } from '../../services/rescueTaskService';
import { retry } from '@reduxjs/toolkit/query';







export function RescueTaskEditor({ showPopup, rescueTask }: childProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("CREATED")
    const [selectedAlertId, setSelectedAlertId] = useState(0)
    const savedAlerts = useSelector((state: any) => state.alerts.alerts)
    const dispatch = useDispatch()
    const responders = useSelector((state: any) => state.users.userList)
    const [selectedResponders, setSelectedResponders] = useState<number[]>([])
    const [selectedOptions, setSelectedOptions] = useState<ReadonlyArray<any>>([])

    const [isEditing, setIsEditing] = useState(false)

    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadData() {
            try {

                const alerts = await getSavedAlerts();
                const users = await getResponders();

                dispatch(setAlerts(alerts));
                dispatch(setUsers(users));

                const opts = users.map((item: any) => ({
                    value: Number.parseInt(item.id),
                    label: `${item.firstName} ${item.lastName} ${item.id}`
                }));

                setOptions(opts);
                console.log(rescueTask)
                if (rescueTask != undefined && rescueTask !== 0) {
                    setIsEditing(true)
                    console.log("Opened rescue task editor in Edit mode")
                    const currentRescueTask = await getRescueTaskById(rescueTask)

                    console.log(currentRescueTask)
                    setSelectedAlertId(Number.parseInt(currentRescueTask.alertItem.id))
                    console.log(currentRescueTask.alertItem.id, " Alert id")

                    setMessage(currentRescueTask.message)
                    console.log(message)

                    console.log(currentRescueTask.status)

                    setStatus(currentRescueTask.status)

                    console.log(currentRescueTask.message)

                    let arr:number[] = currentRescueTask.volunteers.map((value:any)=>{
                        return Number.parseInt(value.id)
                    })
                    setSelectedResponders(arr)

                    const currentResponders = opts.filter((item:any)=>{
                        
                        for(let i = 0; i < arr.length; i++)
                        {
                            if(item.value == arr.at(i))
                                return true;
                        }
                        return false
                    })

                    setSelectedOptions(currentResponders)

                    console.log(currentRescueTask.volunteers)

                }

            } catch (error) {
                console.error("Error loading data", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();

    }, []);


    










    function handleChange(value: ReadonlyArray<any>) {
        setSelectedResponders(value.map((value: any) => Number.parseInt(value.value)))
        setSelectedOptions(value)
    }



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

    function handleCreate() {


        if (message.length < 10) {
            alert("Length of message cannot be less than 10")
            return;
        }
        if (selectedAlertId == 0) {
            alert("Please select a alert");
            return;
        }
        if (selectedResponders.length == 0) {
            alert("Please select some responders");
            return;
        }

        createRescueTask(message, status, selectedAlertId, selectedResponders)
            .then((data) => {
                console.log(data)
                showPopup();
            })
            .catch((error) => {
                console.error("Error occurred with creating rescue task");
            })


        console.log("Rescue task created")
    }

    function handleSave() {
        console.log(message)
        console.log(status)
        console.log(selectedAlertId)
        console.log(selectedResponders)
        
        if(rescueTask != undefined)
        updateRescueTask( rescueTask, message, status, selectedAlertId, selectedResponders)
        .then((data)=>{
            console.log(data)
            showPopup();
        })


    }



    if (loading)
        return <h1>Loading......</h1>



    return (<>
        <div ref={containerRef} className='container  popup rescue-editor'>

            <h1>Create Rescue task</h1>
            <button className='button logout close-button' onClick={showPopup}><IoClose></IoClose></button>
            <label htmlFor="textarea"> message</label>
            <textarea id='textarea' value={message} cols={30} rows={5} onChange={(e) => setMessage(e.target.value)}></textarea>

            <label htmlFor="status"> Status</label>
            <div id='status'>
                <div>
                    <input className='input' type="radio" id='created' name='status' value="CREATED"  checked={status === "CREATED"} onChange={(e) => setStatus(e.target.value)} />
                    <label htmlFor="created">CREATED</label>
                </div>
                <div>
                    <input className='input' type="radio" id='pending' name='status' value="PENDING" checked={status === "PENDING"} onChange={(e) => setStatus(e.target.value)} />
                    <label htmlFor="pending">PENDING</label></div>

                <div>
                    <input className='input' type="radio" id='progress' name='status' value="IN_PROGRESS" checked={status === "IN_PROGRESS"} onChange={(e) => setStatus(e.target.value)} />
                    <label htmlFor="progress">IN_PROGRESS</label>
                </div>

                <div>
                    <input className='input' type="radio" id='completed' name='status' value="COMPLETED" checked={status === "COMPLETED"} onChange={(e) => setStatus(e.target.value)} />
                    <label htmlFor="completed">COMPLETED</label>
                </div>

                <div>
                    <input className='input' type="radio" id='cancelled' name='status' value="CANCELLED" checked={status === "CANCELLED"} onChange={(e) => setStatus(e.target.value)} />
                    <label htmlFor="cancelled">CANCELLED</label>
                </div>


            </div>
            <label htmlFor="alert">Alert</label>
            <select className='select' id='alert' value={selectedAlertId} onChange={((e) => setSelectedAlertId(Number.parseInt(e.target.value))
            )}>

                <option value={0}>------Select alert-----</option>

                {savedAlerts.map((item: any, index: number) => {
                    return <option className='option' key={index} value={item.id}> {item.id} {item.message}</option>

                })}

            </select>

            <label htmlFor="responders">Responders</label>
            <Select
                value={selectedOptions}
                options={options}
                isMulti={true}
                onChange={handleChange}


            >

            </Select>

            <button className="broadcast-button button" onClick={(isEditing) ? handleSave : handleCreate}>{(isEditing) ? "Save" : "Create"}</button>



        </div></>
    )
}