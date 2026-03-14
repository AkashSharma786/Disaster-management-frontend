import '../../assets/styles/cards/reportCard.css'

export function ReportCard({report}:any){
    console.log(report)
    console.log(report.message)


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

          
                <button className="button broadcast-button">Update task</button>
                <button className="button delete-button">delete</button>
           
        
        </div>
    </>)
}