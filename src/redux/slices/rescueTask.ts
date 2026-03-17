import { createSlice } from "@reduxjs/toolkit";
import type stateOrUtSlice from "./stateOrUt";


const rescueTaskSlice = createSlice({

    name:"rescueTask",
    initialState:{
        rescueTaskList:[]
    },
    reducers:{
        setRescueTaskList: (state, action)=>{
            state.rescueTaskList = action.payload;
        },
        deleteOneRescueTask: (state, action)=>{
            state.rescueTaskList = state.rescueTaskList.filter((value:any)=>{
                console.log("rescue Task id" + action.payload)
                console.log("comparison value" , value.id === action.payload)
                return value.id !== action.payload
            })
        }
    }
})

export default rescueTaskSlice;
export const { setRescueTaskList, deleteOneRescueTask} = rescueTaskSlice.actions;