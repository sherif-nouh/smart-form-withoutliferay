import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransactionById=createAsyncThunk('PortalAlltransaction/getTransactionById',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/TransactionProj/Transactions_RS/getTransactionById?transId=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

export const GetNoOfUsersForTrans=createAsyncThunk('PortalAlltransaction/GetNoOfUsersForTrans',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/PortalGeneral/PortalGeneral_RS/GetNoOfUsersForTrans?transId=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

export const getPortalTempRequests=createAsyncThunk('PortalAlltransaction/getPortalTempRequests',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/TransactionProj/Transactions_RS/getPortalTempRequests?transId=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

export const flowStepsByTransId=createAsyncThunk('PortalAlltransaction/flowStepsByTransId',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/TransactionProj/Transactions_RS/FlowStepsByTransId?transId=${args}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

export const getTransactionsDocs=createAsyncThunk('PortalAlltransaction/getTransactionsDocs',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`/TransactionProj/Transactions_RS/getTransactionsDocs?transId=${args}`,
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response);
      }
});

export const GetPortalUserProfile=createAsyncThunk('PortalAlltransaction/GetPortalUserProfile',async(args,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios.get(`PortalGeneral/PortalGeneral_RS/GetPortalUserProfile?userId=${args}`,
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response);
      }
});

const transactionSlice = createSlice({
    name: "PortalAlltransaction",
    initialState: {PortalAlltransactionVw:[],isLoading:false,
        NoOfUsersForTrans:null,isNoOfUsersForTransLoading:false,
        NoOfTempRequests:null,isNoOfTempRequestsLoading:null,
        flowStepsByTrans:null,isFlowStepsByTransLoading:false,
        isDocsLoading:false,PortalOnlineDoc:[],
        userProfile:null ,isUserProfileLoading:false},
    extraReducers: {
        //get PortalAlltransactionVw
        [getTransactionById.pending]:(state,action)=>{
            state.isLoading=true;
            console.log(action.payload);
        },
        [getTransactionById.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.PortalAlltransactionVw=action.payload;
            console.log(action.payload);
        },
        [getTransactionById.rejected]:(state,action)=>{
            state.isLoading=false;

            console.log(action.payload);
        },
        //get NoOfUsersForTrans
        [GetNoOfUsersForTrans.pending]:(state,action)=>{
            state.isNoOfUsersForTransLoading=true;
            console.log(action.payload);
        },
        [GetNoOfUsersForTrans.fulfilled]:(state,action)=>{
            state.isNoOfUsersForTransLoading=false;
            state.NoOfUsersForTrans=action.payload;
            console.log(action.payload);
        },
        [GetNoOfUsersForTrans.rejected]:(state,action)=>{
            state.isNoOfUsersForTransLoading=false;
            console.log(action.payload);
        },

        //get getPortalTempRequests
        [getPortalTempRequests.pending]:(state,action)=>{
            state.isNoOfTempRequestsLoading=true;
            console.log(action.payload);
        },
        [getPortalTempRequests.fulfilled]:(state,action)=>{
            state.isNoOfTempRequestsLoading=false;
            state.NoOfTempRequests=action.payload;
            console.log(action.payload);
        },
        [getPortalTempRequests.rejected]:(state,action)=>{
            state.isNoOfTempRequestsLoading=false;
            console.log(action.payload);
        },
        //get flowStepsByTransId
        [flowStepsByTransId.pending]:(state,action)=>{
            state.isFlowStepsByTransLoading=true;
            console.log(action.payload);
        },
        [flowStepsByTransId.fulfilled]:(state,action)=>{
            state.isFlowStepsByTransLoading=false;
            state.flowStepsByTrans=action.payload;
            console.log(action.payload);
        },
        [flowStepsByTransId.rejected]:(state,action)=>{
            state.isFlowStepsByTransLoading=false;
            console.log(action.payload);
        },
                //get getTransactionsDocs
        [getTransactionsDocs.pending]:(state,action)=>{
                    state.isDocsLoading=true;
                    console.log(action.payload);
        },
        [getTransactionsDocs.fulfilled]:(state,action)=>{
                    state.isDocsLoading=false;
                    state.PortalOnlineDoc=action.payload;
                    console.log(action);
        },
        [getTransactionsDocs.rejected]:(state,action)=>{
                    state.isDocsLoading=false;
                    console.log(action);
        },
        
                 //get GetPortalUserProfile
        [GetPortalUserProfile.pending]:(state,action)=>{
                    state.isUserProfileLoading=true;
                    console.log(action.payload);
        },
        [GetPortalUserProfile.fulfilled]:(state,action)=>{
                    state.isUserProfileLoading=false;
                    state.userProfile=action.payload.Data;
                    console.log(' action '+action.payload.Data);
        },
        [GetPortalUserProfile.rejected]:(state,action)=>{
                    state.isUserProfileLoading=false;
                    console.log(action);
        },

    },

});

export default transactionSlice.reducer;