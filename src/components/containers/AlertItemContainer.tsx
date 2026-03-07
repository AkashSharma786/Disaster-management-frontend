import AlertItemCard from "../Cards/AlertItemCard";
import '../../assets/styles/container/alertItemcontainer.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAlerts, setIsSaved, setStateId } from "../../redux/slices/alert";
import { getAlerts, getSavedAlerts } from "../../services/alertService";
export interface AlertCardProp {
    alertItem: any;

    index: number;

}

function AlertItemContainer() {

    const stateOrUtList = useSelector((state: any) => state.stateOrUts.stateOrUtList);
    const alerts = useSelector((state: any) => state.alerts.alerts);
    const isSaved = useSelector((state: any) => state.alerts.isSaved);
    const selectedStateOrUt = useSelector((state: any) => state.alerts.stateId);

    const dispatch = useDispatch();

    const [alertType, setAlertType] = useState('ndma');


   async function handleAlertGet() {

        if (alertType === 'ndma'){
            let alertsData = await getAlerts(selectedStateOrUt)
          
           
            if(alertsData != null)
                dispatch(setAlerts(alertsData))
            dispatch(setIsSaved(false))

        }
        else{
           let  alertsData = await getSavedAlerts();
           if(alertsData != null){
               dispatch(setAlerts(alertsData))
               console.log(alertsData);

           }
            dispatch(setIsSaved(true))

        }





       
    }





    console.log(stateOrUtList);


    return (
        <div className="container alert-item-container">
            <div className="container viewer-box">

                

                <select value={alertType} onChange={(e) => setAlertType(e.target.value)}    >
                    <option value="ndma">NDMA Alerts</option>
                    <option value="saved"> Saved</option>

                </select>
                {
                    (alertType === "ndma")?<select value={selectedStateOrUt} onChange={(e) => dispatch(setStateId(Number.parseInt(e.target.value)))}    >
                    <option value={0}>Select State/UT</option>
                    {stateOrUtList.map((stateOrUTName: any) => <option key={stateOrUTName.id} value={stateOrUTName.id}>{stateOrUTName.name}</option>
                    )}

                </select>:null
                }

                
                <button className="button" onClick={handleAlertGet}> Get</button>

            </div>

            {
                alerts.map((item: any, index: number) => {

                    return <AlertItemCard key={index} alertItem={item} index={index} />
                })
            }






        </div>
    );
}

export default AlertItemContainer;