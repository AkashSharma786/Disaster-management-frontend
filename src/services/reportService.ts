import axios from "axios";

export async function getAllReports() {
    try {
        const uri = "http://localhost:8080/admin/reports"
        const response = await axios.get(uri, {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        return  response.data;

        
    } catch (error) {
        console.error("Error Occurred while fetching reports"+ error)
        
    }
}

export async function getReportsByResponder(responderId:number)
{
    try {
        const uri = `http://localhost:8080/admin/reports/responder/${responderId}`
         const response = await axios.get(uri, {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        return  response.data;

    } catch (error) {
        console.error("Error Occurred while fetching reports"+ error)
        
    }
}

export async function deleteReport(reportId:number)
{
    try {
        const uri = `http://localhost:8080/admin/reports/${reportId}`
         const response = await axios.delete(uri, {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        return  response.data;

    } catch (error) {
        console.error("Error Occurred while fetching reports"+ error)
        
    }
}


export async function sendReport(rescueTask:number, message:string)
{
    try {
        const uri = `http://localhost:8080/respondent/reports`
        
         const response = await axios.post(uri,
            {
            rescueTask,
            message
        },
        
         {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        return  response.data;

    } catch (error) {
        console.error("Error Occurred while fetching reports"+ error)
        
    }
}

export async function getResponderReports()
{
    try {
        const uri = `http://localhost:8080/respondent/reports`
         const response = await axios.get(uri, {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        return  response.data;

    } catch (error) {
        console.error("Error Occurred while fetching reports"+ error)
        
    }
}

export async function getReportsByRescueTask(taskId:number)
{
    try {
        const uri = `http://localhost:8080/admin/reports/task/${taskId}`
         const response = await axios.get(uri, {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        return  response.data;

    } catch (error) {
        console.error("Error Occurred while fetching reports"+ error)
        
    }
}