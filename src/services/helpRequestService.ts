import axios from "axios";

export async function getAllRequests() {
    const uri = "http://localhost:8080/admin/requests"

    try{
        const response = await axios.get(uri ,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    } )
    
    return response.data;


    }catch(e){
        console.log("Error occurred while fetching users")
    }
    
}

export async function sendHelpRequest(message:string) {
    const uri = `http://localhost:8080/resident/requests`

    try{
        const response = await axios.post(uri ,message,
            
            {
        headers:{
            "Content-Type": "text/plain",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        

    } )
    return response.data;
    }catch(e){
        console.log("Error occurred while fetching Requests")
    }
    
}


export async function getResidentRequests() {
    const uri = `http://localhost:8080/resident/requests`

    try{
        const response = await axios.get(uri ,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    } )
    return response.data;
    }catch(e){
        console.log("Error occurred while fetching Requests")
    }
    
}

export async function deleteHelpRequest(requestId:number) {
    const uri = `http://localhost:8080/admin/requests/${requestId}`

    try{
        const response = await axios.delete(uri ,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    } )
    return response.data;
    }catch(e){
        console.log("Error occurred while fetching Requests")
    }
}





export async function getRequestsByResident(residentId:number) {
    const uri = `http://localhost:8080/admin/requests/${residentId}`

    try{
        const response = await axios.get(uri ,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    } )
    return response.data;
    }catch(e){
        console.log("Error occurred while fetching Requests")
    }
    


}