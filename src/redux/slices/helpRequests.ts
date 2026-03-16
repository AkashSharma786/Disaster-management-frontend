import { createSlice } from "@reduxjs/toolkit";

const helpRequestSlice = createSlice({
    name: "helpRequests",

    initialState :{
        helpRequestList:[]
    },
    reducers:{

        setHelpRequests:(state, action)=>{
            state.helpRequestList = action.payload;
        },

        deleteOneHelpRequest: (state, action)=>{
            state.helpRequestList = state.helpRequestList.filter((value:any)=>{
                return value.id !== action.payload.id
            })

        }
    }

})

export const {setHelpRequests, deleteOneHelpRequest} = helpRequestSlice.actions
export default  helpRequestSlice;