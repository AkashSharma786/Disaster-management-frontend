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
import { createRescueTask } from '../../services/rescueTaskService';







export function RescueTaskEditor({ showPopup }: childProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("CREATED")
    const [selectedAlertId, setSelectedAlertId] = useState(0)
    const savedAlerts = useSelector((state: any) => state.alerts.alerts)
    const dispatch = useDispatch()
    const responders = useSelector((state: any) => state.users.userList)
    const [selectedResponders, setSelectedResponders] = useState<number[]>([])

    const [options, setOptins] = useState([])










    useEffect(() => {
        if (savedAlerts.length == 0) {
            getSavedAlerts()
                .then((data) => {
                    dispatch(setAlerts(data))
                })
                .catch((error) => {
                    console.error("Error occurred while fetching alerts")
                })
        }
    }, [savedAlerts])

    useEffect(() => {
        getResponders()
            .then((data) => {
                dispatch(setUsers(data))

                setOptins(data.map((item: any) => {
                    return {
                        value: Number.parseInt(item.id),
                        label: `${item.firstName} ${item.lastName} ${item.id}`
                    }

                }))


            })
            .catch((error) => {
                console.error("Erro occurred while fetching users " + error)
            });


    }, [responders])



    function handleChange(value: ReadonlyArray<any>) {
        setSelectedResponders(value.map((value: any) => Number.parseInt(value.value)))
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
    
    function handleCreate(){
       

        if(message.length < 10)
        {
            alert("Length of message cannot be less than 10")
            return;
        }
        if(selectedAlertId == 0)
        {
            alert("Please select a alert");
            return;
        }
        if(selectedResponders.length == 0)
        {
            alert("Please select some responders");
            return;
        }

        createRescueTask(message, status, selectedAlertId, selectedResponders)
        .then((data)=>{
            console.log(data)
        })
        .catch((error)=>{
            console.error("Error occurred with creating rescue task");
        })


        console.log("Rescue task created")
    }



    return (<>
        <div ref={containerRef} className='container  popup rescue-editor'>

            <h1>Create Rescue task</h1>
            <button className='button logout close-button' onClick={showPopup}><IoClose></IoClose></button>
            <label htmlFor="textarea"> message</label>
            <textarea id='textarea' cols={30} rows={5} onChange={(e) => setMessage(e.target.value)}></textarea>

            <label htmlFor="status"> Status</label>
            <div id='status'>
                <div>
                    <input className='input' type="radio" id='created' name='status' value="CREATED" checked={status === "CREATED"} onChange={(e) => setStatus(e.target.value)} />
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
            <select className='select' id='alert' onChange={((e) => setSelectedAlertId(Number.parseInt(e.target.value))
            )}>

                <option value={0}>------Select alert-----</option>

                {savedAlerts.map((item: any, index: number) => {
                    return <option className='option' key={index} value={item.id}> {item.id} {item.message}</option>

                })}

            </select>

            <label htmlFor="responders">Responders</label>
            <Select
                defaultValue={selectedResponders}
                options={options}
                isMulti={true}
                onChange={handleChange}


            >

            </Select>

            <button className="broadcast-button button" onClick={handleCreate}>Create</button>



        </div></>
    )
}