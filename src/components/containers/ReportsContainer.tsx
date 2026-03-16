import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResponders } from "../../services/userService";
import { getRescueTask } from "../../services/rescueTaskService";
import { setRescueTaskList } from "../../redux/slices/rescueTask";
import { ReportCard } from "../Cards/ReportCard";
import { setUsers } from "../../redux/slices/users";
import { getAllReports, getReportsByRescueTask, getReportsByResponder, getResponderReports } from "../../services/reportService";
import { setReportList } from "../../redux/slices/reportSlice";
import { RescueTaskEditor } from "../Cards/RescueTaskEditor";

function ReportsContainer() {

    const [reportFectihingOption, setReportFetchingOption] = useState(0);
    const responders = useSelector((state: any) => state.users.usersList);
    const rescueTask = useSelector((state: any) => state.rescueTask.rescueTaskList);
    const dispatch = useDispatch();
    const [selectedResponder , setSelectedResponder] = useState(0);
    const [selectedRescueTask, setSelectedRescueTask] = useState(0)

    const report = useSelector((state: any) => state.reports.reportList)
    const userInfo = useSelector((state:any)=> state.auth.userInfo);
    const [popup , setPopup] = useState(false)

    function showPopup(){
        setPopup(!popup)
    }


    const handleOptionFetching = () => {
        if (reportFectihingOption === 1) {
            console.log("Fecth responders called");
            getResponders().then((data) => {
                dispatch(setUsers(data));
                if(data.length != 0)
                setSelectedResponder(Number.parseInt(data[0].id))
                console.log(rescueTask)
            }).catch(e => {
                console.log("Error occurred while fetchig Responder list" + e);

            })



        }
        else if (reportFectihingOption === 2) {
            console.log("Fetch responder task called")

            getRescueTask().then((data) => {
                dispatch(setRescueTaskList(data));
                if(data.length != 0)
                setSelectedRescueTask(Number.parseInt(data[0].id))
                console.log(rescueTask)
            }).catch(e => {
                console.log("Error occurred while fetchig task list" + e);

            })



        }


    }

    useEffect(()=>{
        if(userInfo.role === "ADMIN")
            handleOptionFetching();

    }, [reportFectihingOption])

    const handleGetReport = () => {
        console.log(selectedResponder)
        console.log(selectedRescueTask)

        if(reportFectihingOption == 1){
            if(selectedResponder == 0)
                return;
            getReportsByResponder(selectedResponder).then((data)=>{
                dispatch(setReportList(data))
            })
            .catch((e)=>{
                 console.error("Error occurred while fetchin reports" + e);
            })
            

        }
        else if(reportFectihingOption == 2){
            if(selectedRescueTask == 0)
                return;

            getReportsByRescueTask(selectedRescueTask)
            .then((data)=>{
                dispatch(setReportList(data))
            }).catch((e)=>{
                 console.error("Error occurred while fetchin reports" + e);
            })

        }
        else{
            getAllReports()
            .then((data) => {
                dispatch(setReportList(data))
            })
            .catch((e) => {
                console.error("Error occurred while fetchin reports" + e);
            })

        }

        

    }

    const handleRespondentGetReport= ()=>{
        getResponderReports()
        .then((data)=>{
            console.log(data);
            dispatch(setReportList(data))
        })
        .catch((error)=>{
            console.error("Error fething reports" + error)
        })


    }





    return (<>
        <div className="container user-viewer">
            {(userInfo.role === "ADMIN") && popup && <RescueTaskEditor showPopup={showPopup} rescueTask={selectedRescueTask}/> }
            {(userInfo.role === "ADMIN")?<select name="" id="" className="select" onChange={(e) => {
                setReportFetchingOption(Number.parseInt(e.target.value))
            }}>
                <option key={0} value={0}>All Reports</option>
                <option key={1} value={1}>Using Responder</option>
                <option key={2} value={2}>Using Rescue Task</option>
            </select>: null}
            

            {
                (reportFectihingOption == 1) ? <select className="select" onChange={(e)=> setSelectedResponder(Number.parseInt(e.target.value))}>
                    {responders.map((item: any, index: number) =>
                        <option key={index} value={item.id}>{item.id} {item.firstName} {item.lastName}</option>
                    )}


                </select> : (reportFectihingOption == 2) ? <select className="select" onChange={(e)=> setSelectedRescueTask(Number.parseInt(e.target.value))}>
                    {rescueTask.map((item: any, index: number) =>
                        <option key={index} value={item.id}>{item.id} {item.message}</option>)}
                </select> : null
            }




            <button className="button" onClick={(userInfo.role === "ADMIN")?handleGetReport : handleRespondentGetReport}>Get Reports</button>

        </div>

        <div className="container user-viewer">

            {report.map((item: any, index: number) =>
                <ReportCard key={index} report={item} setSelectedRescueTask={setSelectedRescueTask}  showPopup={showPopup}/>
            )}


        </div>


    </>)
}

export default ReportsContainer;