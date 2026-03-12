import { Client, type IFrame } from '@stomp/stompjs';
import '../../assets/styles/container/ResidentContainer.css'
import { useEffect, useState } from 'react';
import AlertItemCard from '../Cards/AlertItemCard';
import BroadcastAlertCard from '../Cards/BroadcastAlertCard';


function ResidentContainer() {
    let mess: any[] = [];
    const [messages, setMessages] = useState(mess)

    const [alertItem, setAlertItem] = useState()
    
    const [stompClient, setStompClient] = useState<Client |null>(null)

    useEffect(()=>{

           const sClient = new Client({
            brokerURL: `ws://localhost:8080/websocket?token=${localStorage.getItem("token")}`,

            onConnect: (frame) => {
                // console.log(frame);
                // messages.push(data.body)

                sClient.subscribe('/user/queue/residents', (res) => {
                    //console.log(messages)
                    // console.log(res);
                    // console.log(res.body)
                    // console.log(messages) 
                    
                    console.log(JSON.parse(res.body))

                    setAlertItem(JSON.parse(res.body))




                })

            },

            onWebSocketError: (error: any) => {
                console.error("WebSocket error:", error);
                sClient.deactivate()
                alert("Error occurred with connecting with web socket Try login again")

            },

            onStompError: (frame: any) => {
                console.error("Broker error:", frame.headers["message"]);
                console.error("Details:", frame.body);
                sClient.deactivate()
                alert("Error occurred with connecting with web socket Try login again")


            },
            onUnhandledFrame: (frame) => {
                console.error("Unhandled STOMP frame", frame);
                sClient.deactivate();
                alert("Error occurred with connecting with web socket Try login again")
            }


        })



        sClient.activate();

        setStompClient(sClient);


    },[])

     







    useEffect(() => {
        setMessages(messages.concat(alertItem))

    }, [alertItem])




    return (<>
        <div className='container resident-container'>
            {messages.map((value, index) => {

                return <BroadcastAlertCard key={index} alertItem={value} />
            })}


        </div>
    </>)
}

export default ResidentContainer;