import axios from "axios";


;











async function getAlerts(stateId: number): Promise<any> {
    let uri = `http://localhost:8080/admin/ndma-alerts/${stateId}/alerts`;
    
 
    try {

        let response = await axios.get(uri, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        )
        console.log(response.data)
        return response.data;
    }
    catch(e){
        console.log(e); 
        return null;

    }
}

async function getSavedAlerts(): Promise<any> {
    let uri = `http://localhost:8080/admin/ndma-alerts/saved`;
    let data: any = null;

    try{
         let response = await  axios.get(uri, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
    })
    
    return response.data;

    }catch(e){ 
        console.log(e)
    }   
}

async function saveAlert(stateId: number, index: number): Promise<any> {
    console.log("handle Save called")

    try{
        
       let response =  await axios.post(`http://localhost:8080/admin/ndma-alerts/${stateId}/${index}`,{
       headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
    );

        return  response.data;

    }
    catch(e){
        console.log(e);
       

    }
}

async function deleteSavedAlert(id: number): Promise<string> {

    try{
       let response = await axios.delete(`http://localhost:8080/admin/ndma-alerts/saved/${id}`,{
       headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
       return response.data;

    }catch(e){
        console.log(e)
        return "failure";

    }
    


}

export { getAlerts, getSavedAlerts, deleteSavedAlert, saveAlert }
