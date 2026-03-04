import AlertItemCard from "../Cards/AlertItemCard";
import '../../assets/styles/container/alertItemcontainer.css';
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

function AlertItemContainer() {

    const stateOrUtList = useSelector((state: any) => state.stateOrUts.stateOrUtList);
    const [alertType, setAlertType] = useState('ndma');
    const [selectedStateOrUT, setSelectedStateOrUT] = useState(0);
    const [alertItems, setAlertItems] = useState( []);

    

    function handleAlertGet(event: any) {
        axios.get(`http://localhost:8080/admin/ndma-alerts/${selectedStateOrUT}/alerts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            
            .then(response => {
                console.log(response.data);
                setAlertItems(response.data);
                // Handle the response data as needed
                response.status
            })
            .catch(error => {
                if(error.response?.status){
                    alert("JWT expired Logout and login again");
                }
                else{
                    console.error('Error fetching alerts:', error);
                }
                
        
                
                
                // Handle the error as needed
            });

        
    }

    console.log(stateOrUtList);


    return (
        <div className="container alert-item-container">
            <div className="container header">

                <select value={alertType} onChange={(e) => setAlertType(e.target.value)}    >
                    <option value="ndma">NDMA Alerts</option>
                    <option value="saved"> Saved</option>

                </select>


                <select value={selectedStateOrUT} onChange={(e) => setSelectedStateOrUT(Number.parseInt(e.target.value))}    >
                    <option value={0}>Select State/UT</option>
                    {stateOrUtList.map((stateOrUTName: any) => <option key={stateOrUTName.id} value={stateOrUTName.id}>{stateOrUTName.name}</option>
                    )}

                </select>
                <button className="button" onClick={handleAlertGet}> Get</button>

            </div>

            {
                alertItems.map((item, index) =>{
                  
                    return <AlertItemCard key={index} alert={item}/>
                })
            }


            



        </div>
    );
}

export default AlertItemContainer;