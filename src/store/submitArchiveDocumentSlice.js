import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const submitArchiveDocument=createAsyncThunk('submitArchiveDocumentSlice/submitArchiveDocument',async(args,thunkAPI)=>{
    const {rejectWithValue,dispatch} = thunkAPI;
    try {
        const response = await fetch("https://soa-prod.pai.gov.kw/PAI/DashBoard/Documents_RS/SubmitArchiveDocument",args)

           .then((response) => response.text())
           .then((data) =>{
           
             return data;
             })
           .catch((error) => {
             console.log('fetchRequestNo data >>> '+error);
            return rejectWithValue(error);
           })
          .finally(() => {
             console.log('save is finished >>> ');
         });
        console.log(response);
       
        return response;
      } catch (error) {
        console.log(args);
        return rejectWithValue(error);
      }
});

const submitArchiveDocumentSlice = createSlice({
    name: "submitArchiveDocument",
    initialState: {data: {},},
    extraReducers: {
        //get PortalAlltransactionVw
        [submitArchiveDocument.pending]:(state,action)=>{
            //state.isLoading=true;
            console.log(action);
        },
        [submitArchiveDocument.fulfilled]:(state,action)=>{
            //state.isLoading=false;
            state.data=action.payload;
            console.log(action.payload);
        },
        [submitArchiveDocument.rejected]:(state,action)=>{
           // state.isLoading=false;

            console.log(action);
        },

        
    },

});

export default submitArchiveDocumentSlice.reducer;