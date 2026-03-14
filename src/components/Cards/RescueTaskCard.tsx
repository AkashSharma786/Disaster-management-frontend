import { useSelector } from 'react-redux';
import '../../assets/styles/cards/RescueTaskCard.css'

export function RescueTaskCard({ rescueTask }: any) {
    const userInfo = useSelector((state:any)=> state.auth.userInfo);

    const volunteers = rescueTask.volunteers 

    return (<>
        <div className="container rescue-task-card">
            <div>
                <h2>{rescueTask.message}</h2>
            </div>

            <h2>Alert</h2>
            <div className="container">

                <h3><strong>Id:  {rescueTask.alertItem.id}</strong></h3>
                <h3>{rescueTask.alertItem.message}</h3>

            </div>
            <h2>Responders</h2>
            <div className='container responders-container'>

                {
                    volunteers.map((item: any, index: number) => {
                        console.log(item);
                         
                       return <div className='responder-box' key={index}>
                            <p>Id: <strong>{item.id}</strong></p>
                            <p>Name: <strong>{item.firstName} {item.lastName} </strong></p>

                        </div>

                    })
                }

            </div>
            {(userInfo.role === "ADMIN")?
             <div className='button-box'>
                <button className='button delete-button'>Delete</button>
                <button className='button'>Edit</button>
            </div>
            :
            <button className='button broadcast-button'> Submit Report</button>
        }
           





        </div>

    </>)

}