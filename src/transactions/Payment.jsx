import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from "react-redux";
import {getLicenseDetailsByLicNo,GetLicAddByLicNo,getInboxByReqId,GetATMStepPayment} from "../store/dashBoardSlice";
import {submitArchiveDocument} from "../store/smartFormServicesSlice"
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import store from '../store/index';
import { useFileData } from './FileDataContext';
import axios from "axios";

library.add(faCircleCheck);
function Payment(props){
  const { fileData } = useFileData();

    const { t } = useTranslation();
  const dispatch = useDispatch();
 const submitPortalResponse =useSelector((state) =>state.smartFormServicesSlice.submitPortalResponse);
 const {Inbox} = useSelector(state => state.dashBoard.Inbox);
 const {amountData} = useSelector(state => state.dashBoard.amountData);
 const {isAmountLoading} = useSelector(state => state.dashBoard.isAmountLoading);
 const argsForTheDocuments =useSelector((state) =>state.smartFormServicesSlice.argsForTheDocuments);

 const [amount,setAmount]=useState('');





  const setProgressBar = (steps, curStep) => {
    const percent = parseFloat((100 / steps) * curStep).toFixed();
    document.querySelector(".progress-bar").style.width = percent + "%";
    document.querySelectorAll("#progressbar li").forEach((li, index) => {
      li.style.width = "50%";
      if (index < curStep) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePay = () => {
    const step=Inbox?Inbox[0].STEP_NO:'';
    console.log('step '+step);
   const url = `https://pai.gov.kw/knetAppGeneric/knetprocess?amount=${amount}&successURL=https://pai.gov.kw/knet-success&errorURL=https://pai.gov.kw/knet-error&requestNumber=${props.requestId}&licenseNumber=${props.licenseNo}&type=${props.type}&transid=${props.transactionId}&userId=${props.userId}&cusName=&email=&channel=portal&stepNo=${step}&test=1`;
   console.log('payurl '+url);
   window.location.href =url;
  };

  const handleGoHome = () => {
    window.location.href = 'https://www.pai.gov.kw/ar/group/guest/dashboard';
  };

  useEffect(() => {
    setProgressBar(2,2);
    console.log("file from payment "+fileData.lic);
    // props.onDataFromChild.forEach(
    //   select =>{
    //     const sub=  select.base64.slice(select.base64.indexOf(',') + 1);
    //     console.log("file from payment "+sub);
    //   }
    // )
    const fetchData = async () => {
      try {
        // Simulate a service call with a delay
        const response = await fetch(`https://soa-prod.pai.gov.kw/PAI/DashBoard/DashBoard_RS/GetATMStepPayment?reqNo=${props.requestId}`);
        const result = await response.json();

        // Set the data in state
        setAmount(result.TRANSACTION_STEP_AMOUNT);
  console.log(props.onDataFromChild);

  
        // Now you can perform additional logic based on the data
        console.log('Data received:', result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call the async function
    fetchData();
    callattachment(fileData);

  },[dispatch,submitPortalResponse,amountData,amount])



  const callattachment= async (args)=>{
    if (args.PortalOnlineDoc !== null) {
       args.selectedFiles.forEach(async file1 => {
         const docType = args.PortalOnlineDoc.find((portal) => portal.docId === file1.docId);
         const formData = new FormData();

         // Append the base64 file to the FormData object
         formData.append('Document', file1.base64);
         
         // Other data
         formData.append('Channel', 'PORTAL');
         formData.append('DocumentType', docType ? docType.docName : "");
         formData.append('LicenseType', 'L');
         formData.append('RequestType', 'L');
         formData.append('ProcedureType', 'P');
         formData.append('DocumentName', file1.docName);
         formData.append('RequestNumberId', props.requestId);
         formData.append('CompanyName', 'الشركه الوطنيه للمنتجات الورقيه');
         formData.append('ClientNo_OR_LicenseNumber',  args.lic);
         formData.append('contractNo', null);
         
         // Make the POST request using Axios
          await axios.post('/DashBoard/Documents_RS/SubmitArchiveDocument', formData, {
           headers: {
            'Content-Type': 'application/json; charset=utf-8', // Important for handling files
           },
           method: 'POST',
           mode: 'cors',
           redirect:'follow',
         })
           .then(response => {
             console.log(response.data);
           })
           .catch(error => {
             console.error('Error:', error);
           });

        //  formData.append('jsonAttribute', JSON.stringify({
        //   "Channel": "PORTAL",
        //   "DocumentType": docType ? docType.docName : "",
        //   "LicenseType": "L",
        //   "RequestType": "L",
        //   "ProcedureType": "P",
        //   "DocumentName": file1.docName,
        //   "RequestNumberId": props.requestId,
        //   "CompanyName": "الشركه الوطنيه للمنتجات الورقيه",
        //   "ClientNo_OR_LicenseNumber": args.lic,
        //   "contractNo": null
        // }));
        // formData.append('Document', file1.base64);
        // let data = JSON.stringify({
        //   "Channel": "PORTAL",
        //   "DocumentType": "تراخيص صناعية",
        //   "LicenseType": "L",
        //   "RequestType": "L",
        //   "ProcedureType": "P",
        //   "DocumentName": "KFHD-83757959-150323-1356-52.pdf",
        //   "RequestNumberId": "513248",
        //   "CompanyName": "الشركه الوطنيه للمنتجات الورقيه",
        //   "ClientNo_OR_LicenseNumber": "13715",
        //   "contractNo": null,
        //   "Document": file1.base64
        // });
        
        // let config = {
        //   method: 'post',
        //   maxBodyLength: Infinity,
        //   url: '/DashBoard/Documents_RS/SubmitArchiveDocument',
        //   headers: { 
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   data : data
        // };
        
        // axios.request(config)
        // .then((response) => {
        //   console.log(JSON.stringify(response.data));
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

          //dispatch(submitArchiveDocument(formData));
      //      fetch("https://pai-soa-uat.pai.gov.kw:7017/PAI/DashBoard/Documents_RS/SubmitArchiveDocument",
      // {method:'POST',
    
      //  mode:'no-cors',
      // body:formData}).then((response)=>
      //  {response.text();
      // console.log('Response from submitArchiveDocument:', response.text());
      //  }, err=>(err)=>{console.log(err.text());});
        });
          
      
     
    }
  };


return(
<>

       <div className="col-xl-8 col-lg-7 service_content">
            <div className="header_wrapper">
                <div className="service_header">
                    <div className="service_name industrial_image">
                        <p>خدمات صناعية</p>
                        
                    </div>
                    <div className="status">
                        <ul className="mb-0">
                            <li className="online">متصل</li>
                            <li className="offline d-none">غير متصل على الانترنت</li>
                        </ul>
                    </div>
                </div>
                
            </div>
          

                <div> 
            <ul id="progressbar">
                <li className="active" id="account"><strong></strong></li>
                <li id="personal"><strong></strong></li>
            </ul>
            <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" ></div>

            </div>

            <div class="card text-center rounded-5">
            <a className="toggle_btn" data-bs-toggle="collapse" href="#service_procedure"
                        role="button" aria-expanded="true" aria-controls="service_procedure">
                      بيانات الترخيص / العقد
                                  <i className="fa-regular fa-chevron-down"></i>
                    </a>
  <div class="card-header">
    <h2>معلومات عن الطلب</h2>
  <FontAwesomeIcon icon={faCircleCheck} size="4x" color="green" /> 
  </div>
  
      <div class="card-body d-flex justify-content-start sh">
      <ul class="list-group  w-25 text-md-end">
      <li class="list-group-item">{t('pai-request-number')}</li>
      <li class="list-group-item">{t('pai-license-number')}</li>
      <li class="list-group-item">{t('pai-company-name')}</li>
      <li class="list-group-item">{t('pai-transaction-name')}</li>
      <li class="list-group-item">{t('fees')}</li>
    </ul>
    <ul class="list-group w-75 text-md-start">
      <li class="list-group-item">{JSON.parse(submitPortalResponse)["requestID"]}</li>
      <li class="list-group-item">{props.licenseNo}</li>
      <li class="list-group-item">{props.LicenseDetail?props.LicenseDetail.COMPANY_NAME:props.ContractDetails.CONTRACT_PAYEE_NAME}</li>
      <li class="list-group-item">{props.PortalAlltransactionVw.aname}</li>
      <li class="list-group-item">{amount}</li>
      
    </ul>
      </div>
      
  <div class="card-footer ">
    <button className="btn btn-success rounded-pill mx-1" onClick={handlePay}>{t('pai-pay')}</button>
    <button className="btn btn-success rounded-pill mx-1" onClick={handleGoHome}>{t('Pay-later')}</button>
    <button className="btn btn-success rounded-pill mx-1" onClick={handlePrint}>{t('pai-print')}</button>
  </div>
</div>
</div>
</div>


</>
)


}

export default Payment;