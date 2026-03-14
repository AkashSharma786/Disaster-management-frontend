import { createSlice } from "@reduxjs/toolkit";

const helpRequestSlice = createSlice({
    name: "helpRequests",

    initialState :{
        helpRequestList:[]
    },
    reducers:{

        setHelpRequests:(state, action)=>{
            state.helpRequestList = action.payload;
        }
    }

})

export const {setHelpRequests} = helpRequestSlice.actions
export default  helpRequestSlice;