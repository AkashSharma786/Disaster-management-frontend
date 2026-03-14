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