import { createSlice } from "@reduxjs/toolkit";


const alertSlice = createSlice({

    name: "alerts",
    initialState: {
        alerts: [],
        isSaved : false,
        stateId: 0

    },

     reducers: {
        setAlerts : (state, action)=>{
            if(action.payload == null)
                return;
            
            state.alerts = action.payload;

        },

        setIsSaved:(state, action)=>{
            state.isSaved = action.payload
        },

        setStateId:(state, action)=>{
            state.stateId = action.payload;
        },

        deleteAlert:(state, action)=>{
            let idx:number  = action.payload;

            if(!state.isSaved )
                return;


            state.alerts =  state.alerts.filter((value:any)=>{
               return value.id != idx
                
            })

        }
        

    }

})

export const {setAlerts, setIsSaved, setStateId, deleteAlert} = alertSlice.actions;
export default alertSlice;