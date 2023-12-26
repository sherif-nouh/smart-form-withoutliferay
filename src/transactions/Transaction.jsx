import React from "react";
import TransactionInfo from "./TransactionInfo";
import Content from "./Content";
import { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from "react-redux";
import {getTransactionById,GetNoOfUsersForTrans,getPortalTempRequests,flowStepsByTransId,GetPortalUserProfile} from '../store/transactionSlice';
import {getSessionInfo,GetContDetailsByContNo,getLicenseDetailsByLicNo} from '../store/dashBoardSlice';

import Modal from '../shared/Modal';
import { useTranslation } from 'react-i18next';
import Payment from "./Payment";

function Transaction(props){

  const dispatch=useDispatch();
  const {isLoading,isFlowStepsByTransLoading}=useSelector(state=>state.PortalAlltransaction);
  const {PortalAlltransactionVw}=useSelector(state=>state.PortalAlltransaction.PortalAlltransactionVw);
  const {NoOfUsersForTrans}=useSelector(state=>state.PortalAlltransaction);
  const {NoOfTempRequests}=useSelector(state=>state.PortalAlltransaction);
  const {flowStepsByTrans}=useSelector(state=>state.PortalAlltransaction);
  const submitPortalResponse =useSelector((state) =>state.smartFormServicesSlice.submitPortalResponse);
  const requestId =useSelector((state) =>state.smartFormServicesSlice.requestId);


  const {LicenseDetail} = useSelector(state => state.dashBoard.LicenseDetail);
  const {ContractDetails_} = useSelector(state => state.dashBoard.ContractDetails_);

  const {sessionData} = useSelector(state => state.dashBoard);
  const {isSession} = useSelector(state => state.dashBoard);

 const[data,setData]=useState('');

 const [isValid,setIsValid]=useState(false);

  const [locale, setLocale] = useState('');
  const currentUrl = window.location.href;
  

  useEffect(() => {
    setLocale('en_US');
    console.log('user '+props.userId);
    console.log('transactionId '+props.transactionId);
    dispatch(getTransactionById(props.transactionId));
    dispatch(GetNoOfUsersForTrans(props.transactionId));
    dispatch(getPortalTempRequests(props.transactionId));
    dispatch(flowStepsByTransId(props.transactionId));
    dispatch(GetContDetailsByContNo(props.licenseNo));
    dispatch(getLicenseDetailsByLicNo(props.licenseNo));
    //console.log('session  '+ JSON.parse( JSON.stringify(sessionData)).EXPIRATION_TIME);
if(sessionData){
  setData(JSON.parse(JSON.stringify(sessionData)).EXPIRATION_TIME);

    const currentTimestamp = new Date().getTime();

    // Get the timestamp for a given date (e.g., "2023-12-01")
    const givenDate = new Date(JSON.parse(JSON.stringify(sessionData)).EXPIRATION_TIME).getTime();
    
    // Compare the timestamps
    if (currentTimestamp > givenDate) {
      console.log("Current date is after the given date");
      setIsValid(true);
    } else if (currentTimestamp < givenDate) {
      console.log("Current date is before the given date");
      setIsValid(false);
    } else {
      console.log("Current date is equal to the given date");
      setIsValid(true);
    }
  }
  }, [dispatch,props.transactionId,props.userId]);


  const [dataFromChild, setDataFromChild] = useState([]);

  const handleDataFromChild = (data) => {
      setDataFromChild(data);
      console.log("Data from child to grand "+dataFromChild +data);

    };

    return (
      <>
       
          
        <div className="contents pages">
            <section className="pt_80">
                <div className="container">
                    <div className="row">
                     
                    <TransactionInfo transactionId={props.transactionId} 
                                      licenseNo={props.licenseNo} 
                                      categoryType={props.categoryType} 
                                      PortalAlltransactionVw={PortalAlltransactionVw}
                                      NoOfUsersForTrans={NoOfUsersForTrans}
                                      NoOfTempRequests={NoOfTempRequests}
                                      flowStepsByTrans={flowStepsByTrans}
                                      locale={locale}
                                      currentUrl={currentUrl}
                                      isLoading={isLoading}
                                      isFlowStepsByTransLoading={isFlowStepsByTransLoading}
                                      userId={props.userId} />
{ submitPortalResponse ===null||requestId==='0'? 
                                      <Content ContractDetails={ContractDetails_} onDataFromChild={handleDataFromChild} transactionId={props.transactionId} licenseNo={props.licenseNo} type={props.type} categoryType={props.categoryType} PortalAlltransactionVw={PortalAlltransactionVw} requestId={requestId} userId={props.userId} />
:<Payment dataFromChild={dataFromChild} transactionId={props.transactionId} licenseNo={props.licenseNo} type={props.type} categoryType={props.categoryType} PortalAlltransactionVw={PortalAlltransactionVw[0]} LicenseDetail={LicenseDetail&&LicenseDetail[0]} ContractDetails={ContractDetails_} requestId={requestId} userId={props.userId} />
                                    }
                    </div>
                </div>
                <Modal/>
            </section>
        </div>
          
          
      </>
    );
}

export default Transaction;