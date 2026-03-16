import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: "reports",

    initialState :{
        reportList:[]
    },
    reducers:{

        setReportList:(state, action)=>{
            state.reportList = action.payload;
        },

        deleteOneReport:(state, action)=>{
            state.reportList = state.reportList.filter((value:any)=>{
                return value.id !== action.payload.id
            })
        }
    }

})

export const {setReportList, deleteOneReport} = reportSlice.actions
export default  reportSlice;