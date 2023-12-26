import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "./modalSlice";
import {getInboxByReqId,GetATMStepPayment} from "./dashBoardSlice"


export const submitPortalService = createAsyncThunk(
  'smartFormServicesSlice/submitPortalService',
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    try {
      console.log('Beginning of submit portal > ', args.submitPayload);

      const response = await fetch("https://soa-prod.pai.gov.kw/PAI/SmartFormServices/SmartForm_RS/SubmitPortalService", args.submitPayload);

      const data = await response.text();
      console.log('fetchRequestNo data >>> ', data);

      if (JSON.parse(data)["statusMsg"] !== "YES") {
        dispatch(openModal(data));
      }

      if (JSON.parse(data)["requestID"] !== "0") {
        dispatch(GetATMStepPayment(JSON.parse(data)["requestID"]));
        dispatch(getInboxByReqId(JSON.parse(data)["requestID"]));

        if (args.PortalOnlineDoc !== null) {
          // args.selectedFiles.forEach(file1 => {
          //   //const archivePayload =  submitDocument(args.PortalOnlineDoc, data, file1, args.lic, JSON.parse(data)["requestID"]);
          //   const docType = args.PortalOnlineDoc.find((portal) => portal.docId === file1.docId);
          //   const request= JSON.parse(data)["requestID"];
          //   var submitArchiveDocumentBody =JSON.stringify( {
          //     "Channel": "PORTAL",
          //     "DocumentType": docType ? docType.docName : "", // Check if docType is available
          //     "LicenseType": "L",
          //     "RequestType": "L",
          //     "ProcedureType": "P",
          //     "DocumentName": file1.docName,
          //     "RequestNumberId":request,
          //     "CompanyName": "الشركه الوطنيه للمنتجات الورقيه",
          //     "ClientNo_OR_LicenseNumber": args.lic,
          //     "contractNo": null,
          //     "Document": file1.base64,
          //   });
          //    dispatch(submitArchiveDocument(submitArchiveDocumentBody));
          // });
        }

        console.log('New request ', JSON.parse(data)["requestID"]);
      } else {
        console.log('Request already exists');
      }

      return {data};
    } catch (error) {
      console.error('Error in submitPortalService:', error);
      return rejectWithValue(error);
    }
  }
);

export const submitArchiveDocument = createAsyncThunk(
  'smartFormServicesSlice/submitArchiveDocument',
  async (args, thunkAPI) => {
    
    const { rejectWithValue } = thunkAPI;

    try {
      console.log('Beginning of submit archive > ', args);
      

      const response = await axios("https://soa-prod.pai.gov.kw/PAI/DashBoard/Documents_RS/SubmitArchiveDocument",
       {method:'POST',
       headers: {
        'Content-Type': 'application/json',
      },
      mode:'cors',
      redirect: 'follow',
      body:args});

      const data = await response.text();

      console.log('Response from submitArchiveDocument:', data);

      return data;
    } catch (error) {
      console.error('Error in submitArchiveDocument:', error);
      return rejectWithValue(error);
    }
  }
);

const smartFormServicesSlice = createSlice({
    name: "smartFormServicesSlice",
    initialState: {submitPortalResponse: null,submitArchiveResponse:null,isLoading:true,requestId:'0',argsForTheDocuments:[]},
    extraReducers: {
        //get PortalAlltransactionVw
        [submitPortalService.pending]:(state,action)=>{
            state.isLoading=true;
            console.log(action);
        },
        [submitPortalService.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.submitPortalResponse=action.payload.data;
            state.requestId=JSON.parse(action.payload.data)["requestID"];
            //state.argsForTheDocuments=action.payload.args;
           
        },
        [submitPortalService.rejected]:(state,action)=>{
            state.isLoading=false;
        },

         //get PortalAlltransactionVw
         [submitArchiveDocument.pending]:(state,action)=>{
            //state.isLoading=true;
        },
        [submitArchiveDocument.fulfilled]:(state,action)=>{
            //state.isLoading=false;
           // state.submitArchiveResponse=action.payload;
            console.log(action.payload);
        },
        [submitArchiveDocument.rejected]:(state,action)=>{
           // state.isLoading=false;  
        },

    },

});




var submitDocument =  (PortalOnlineDoc, file1, lic, request) => {
  try {
    const docType = PortalOnlineDoc.find((portal) => portal.docId === file1.docId);

    var submitArchiveDocumentBody = {
      Channel: "PORTAL",
      DocumentType: docType ? docType.docName : "", // Check if docType is available
      LicenseType: "L",
      RequestType: "L",
      ProcedureType: "P",
      DocumentName: file1.docName,
      RequestNumberId: request,
      CompanyName: "الشركه الوطنيه للمنتجات الورقيه",
      ClientNo_OR_LicenseNumber: lic,
      contractNo: null,
      Document: file1.base64,
    };
    return submitArchiveDocumentBody;
  } catch (error) {
    console.error("Error in submitDocument:", error);
    throw error; // Rethrow the error to propagate it up the call stack
  }
};



export default smartFormServicesSlice.reducer;