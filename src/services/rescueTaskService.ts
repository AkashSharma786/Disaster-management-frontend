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

export async function deleteRescueTask (RescueTaskId:number){

     let uri = `http://localhost:8080/admin/rescue/delete/${RescueTaskId}`;
        try{
            const response = await axios.delete(uri, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }})
            return response.data;
        }
        catch(e){
            console.error('Error occurred while fetching '+ e);
        }


         
}

export async function getRescueTaskById(id: Number){

    const uri = `http://localhost:8080/admin/rescue/${id}`
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



export async function createRescueTask (message:string, status:string, alertItem:number , volunteers:number[] ){
     let uri = "http://localhost:8080/admin/rescue/create";
        try{
            const response = await axios.post(uri,
                {alertItem, status, message, volunteers}
                , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }})
            return response.data;
        }
        catch(e){
            console.error('Error occurred while fetching '+ e);
        }
         
}

export async function updateRescueTask (rescutTaskId:number, message:string, status:string, alertItem:number , volunteers:number[] ){
     let uri = `http://localhost:8080/admin/rescue/update/${rescutTaskId}`;
        try{
            const response = await axios.put(uri,
                {alertItem, status, message, volunteers}
                , {
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