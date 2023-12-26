import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLicenseDetailsByLicNo=createAsyncThunk('dashBoard/getLicenseDetailsByLicNo',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/DashBoard/DashBoard_RS/GetLicenseDetailsByLicNo?licNo=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});


export const GetLicAddByLicNo=createAsyncThunk('dashBoard/GetLicAddByLicNo',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/DashBoard/License_RS/GetLicAddByLicNo?licNo=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});



export const getInboxByReqId=createAsyncThunk('dashBoard/getInboxByReqId',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/DashBoard/DashBoard_RS/getInboxByReqId?reqId=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

export const GetATMStepPayment=createAsyncThunk('dashBoard/GetATMStepPayment',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/DashBoard/DashBoard_RS/GetATMStepPayment?reqNo=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

export const getSessionInfo=createAsyncThunk('dashBoard/getSessionInfo',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/DashBoard/DashBoard_RS/getSessionInfo?sessionId=${args.sessionId}&userId=${args.userId}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

export const GetContDetailsByContNo=createAsyncThunk('dashBoard/GetContDetailsByContNo',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/PortalGeneral/PortalGeneral_RS/GetContractDetailsByContId?contId=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

const dashBoardSlice = createSlice({
    name: "dashBoard",
    initialState: {LicenseDetail:[],isLoading:false,LicenseAddress:[],Inbox:[],amountData:"",isAmountLoading:false,sessionData:null,isSession:false,ContractDetails_:[],isContDetails:false,},
    extraReducers: {
        //get PortalAlltransactionVw
        [getLicenseDetailsByLicNo.pending]:(state,action)=>{
            state.isLoading=true;
            console.log(action.payload);
        },
        [getLicenseDetailsByLicNo.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.LicenseDetail=action.payload;
            console.log(action.payload);
        },
        [getLicenseDetailsByLicNo.rejected]:(state,action)=>{
            state.isLoading=false;

            console.log(action.payload);
        },

//get LicenseAddress
        [GetLicAddByLicNo.pending]:(state,action)=>{
            state.isLoading=true;
            console.log(action.payload);
        },
        [GetLicAddByLicNo.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.LicenseAddress=action.payload;
            console.log(action.payload);
        },
        [GetLicAddByLicNo.rejected]:(state,action)=>{
            state.isLoading=false;

            console.log(action.payload);
        },

        [getInboxByReqId.pending]:(state,action)=>{
            state.isLoading=true;
            console.log(action.payload);
        },
        [getInboxByReqId.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.Inbox=action.payload;
            console.log(action.payload);
        },
        [getInboxByReqId.rejected]:(state,action)=>{
            state.isLoading=false;

            console.log(action.payload);
        },


        /*GetATMStepPayment*/
        [GetATMStepPayment.pending]:(state,action)=>{
            state.isAmountLoading=true;
            console.log(action.payload);
        },
        [GetATMStepPayment.fulfilled]:(state,action)=>{
            state.isAmountLoading=false;
            state.amountData=action.payload.TRANSACTION_STEP_AMOUNT;
            console.log(action.payload.TRANSACTION_STEP_AMOUNT);
        },
        [GetATMStepPayment.rejected]:(state,action)=>{
            state.isAmountLoading=false;
            console.log(action.payload);
        },
        /*getSessionInfo*/
        [getSessionInfo.pending]:(state,action)=>{
            state.isSession=true;
            console.log(action.payload);
        },
        [getSessionInfo.fulfilled]:(state,action)=>{
            state.isSession=false;
            state.sessionData=action.payload.Data;
            console.log(action.payload);
        },
        [getSessionInfo.rejected]:(state,action)=>{
            state.isSession=false;
            console.log(action.payload);
        },
          //GetContDetailsByContNo
        [GetContDetailsByContNo.pending]:(state,action)=>{
            state.isContDetails=true;
            console.log(action.payload);
        },
        [GetContDetailsByContNo.fulfilled]:(state,action)=>{
            state.isContDetails=false;
            state.ContractDetails_=action.payload;
            console.log("from contract"+JSON.stringify(action.payload));
        },
        [GetContDetailsByContNo.rejected]:(state,action)=>{
            state.isContDetails=false;
            console.log(action.payload);
        },

    },

});

export default dashBoardSlice.reducer;