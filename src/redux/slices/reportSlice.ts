import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: "reports",

    initialState :{
        reportList:[]
    },
    reducers:{

        setReportList:(state, action)=>{
            state.reportList = action.payload;
        }
    }

})

export const {setReportList} = reportSlice.actions
export default  reportSlice;