import axios from "axios";

export async function getRescueTask (){
     let uri = "http://localhost:8080/admin/rescue/tasks";
        try{
            const response = await axios.get(uri, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }})
            return response.data;
        }
        catch(e){
            console.error('Error occurred while fetching '+ e);
        }
         
}

export async function getResponderRescueTask() {
    let uri = "http://localhost:8080/respondent/tasks"
    try{
            const response = await axios.get(uri, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }})
            return response.data;
        }
        catch(e){
            console.error('Error occurred while fetching '+ e);
        }
    
}