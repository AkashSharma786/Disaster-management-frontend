import { useDispatch, useSelector } from 'react-redux'
import '../../assets/styles/cards/reportCard.css'
import { deleteSavedAlert } from '../../services/alertService';
import { deleteReport } from '../../services/reportService';
import { deleteOneReport } from '../../redux/slices/reportSlice';

export function ReportCard({report}:any){
    const userInfo = useSelector((state:any)=> state.auth.userInfo);
    const dispatch = useDispatch()
    console.log(report)
    console.log(report.message)

    const handleDelete = ()=>{
        deleteReport(Number.parseInt(report.id))

        .then((data)=>{
            console.log("Deleted " + data)
            dispatch(deleteOneReport(report))
        })
        .catch((e)=>{
            console.error("Error Deleting " + e)
        })

    }


    return(<>
        <div className="container report-card">
            <h2>{report.message}</h2>
            <p>date: <strong>{report.reportDate}</strong></p>
            
            <div className='container'>
                <h3>Responder</h3>
                <p>name : <strong>{report.responder.firstName} {report.responder.lastName}</strong></p>

            </div>
            
            <div className="container">
                <h3>Rescue task</h3>
                <p>id : <strong>{report.rescueTask.id}</strong></p>
                <h3>{report.rescueTask.message}</h3>
            </div>

          {(userInfo.role === "ADMIN")?<><button className="button broadcast-button">Update task</button>
                <button className="button delete-button" onClick={handleDelete}>delete</button></>: null}
                
           
        
        </div>
    </>)
}