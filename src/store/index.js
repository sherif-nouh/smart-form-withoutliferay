import { configureStore } from "@reduxjs/toolkit";
import PortalAlltransaction from "./transactionSlice";
import dashBoard from "./dashBoardSlice";
import smartFormServicesSlice from "./smartFormServicesSlice";
import modal  from './modalSlice';
import submitArchiveDocument from "./submitArchiveDocumentSlice";

export default configureStore({
    reducer: {
        PortalAlltransaction,
        dashBoard,
        smartFormServicesSlice,
        modal,
        submitArchiveDocument,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
   
});