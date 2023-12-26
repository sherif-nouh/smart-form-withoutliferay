import React from "react";
import { useEffect, useState ,useRef} from 'react';
import {getTransactionsDocs,GetPortalUserProfile} from '../store/transactionSlice';
import { submitPortalService,submitArchiveDocument } from "../store/smartFormServicesSlice";
import { useDispatch,useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useFileData } from './FileDataContext';



function TransactionAttachment(props){
 const dispatch = useDispatch();
 const { t } = useTranslation();
 const { setFileData } = useFileData();

 const{PortalOnlineDoc}=useSelector(state=>state.PortalAlltransaction.PortalOnlineDoc);
 const{isDocsLoading}=useSelector(state=>state.PortalAlltransaction);
 const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files with row IDs
 const submitPortalResponse =useSelector((state) =>state.smartFormServicesSlice.submitPortalResponse);
 const [submitedData,setSubmitedData] = useState({});
 const {userProfile,isUserProfileLoading}=useSelector(state=>state.PortalAlltransaction);
 const [userProfileData, setUserProfileData] = useState();
const [req,setReq]=useState();

 const [mandatoryFileNotFound, setMandatoryFileNotFound] = useState();

 const [selectedFileNames, setSelectedFileNames] = useState(Array(10).fill(''));
  

    // uploaded data

       
   

    // const fileToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
      
    //       reader.onloadend = () => {
    //         resolve(reader.result);
    //       };
      
    //       reader.onerror = reject;
      
    //       reader.readAsDataURL(file);
    //     });
    //   };
      
      const handleFileChange = async (event, row, index) => {
        const file = event.target.files[0];
        const reader = new FileReader(file);
      
        let fileWithInfo; // Move the declaration here
      
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          console.log('File selected:', file.name);
          console.log('File type:', file.type);
          console.log('File size:', file.size, 'bytes');
      
          fileWithInfo = {
            file: file,
            docName: file.name,
            docId: row.docId,
            base64: base64String,
          };
      
          const existingIndex = findFileIndexByRowNumber(fileWithInfo.docId);
      
          if (existingIndex !== -1) {
            // Replace existing file
            const updatedFiles = [...selectedFiles];
            updatedFiles[existingIndex] = fileWithInfo;
            setSelectedFiles(updatedFiles);
          } else {
            setSelectedFiles((prevFiles) => [...prevFiles, fileWithInfo]);
          }
        };
      
        // Start reading the file
        reader.readAsDataURL(file);
      
        const fileInput = fileInputRefs[index].current;
      
        if (fileInput && fileInput.files.length > 0) {
          const fileName = fileInput.files[0].name;
          const updatedFileNames = [...selectedFileNames];
          updatedFileNames[index] = fileName;
          setSelectedFileNames(updatedFileNames);
        }
      
        console.log(selectedFiles);
      };

      const findFileIndexByRowNumber = (docId) => {
        return selectedFiles.findIndex((fileInfo) => fileInfo.docId === docId);
      };
    
      // Function to upload all selected files
      const uploadAllFiles = () => {
        console.log('Base64 data:', selectedFiles);
       selectedFiles.forEach(
        select =>{
          const sub=  select.base64.slice(select.base64.indexOf(',') + 1);
          console.log(sub);
        }
       )
      };

      const handleRemoveFile = (docId) => {
        setSelectedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((fileInfo) => fileInfo.docId !== docId);
            return updatedFiles;
          });
      };
      

      const readFileAsArrayBuffer = (inputFile) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            resolve(reader.result);
          };
    
          reader.onerror = (error) => {
            reject(error);
          };
    
          reader.readAsArrayBuffer(inputFile);
        });
      };

      const formatDate = (isoDateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const date = new Date(isoDateString);
        return new Intl.DateTimeFormat("en-GB", options).format(date);
      };
    
    useEffect(() => {
      dispatch(getTransactionsDocs(props.transactionId));
      dispatch(GetPortalUserProfile(props.userId)).then((data) => {
      setUserProfileData(userProfile);

      });
    }, [dispatch,props.transactionId,props.userId]);
    
    
    var submitPortalServiceBody = JSON.stringify({
    "Language": "ARABIC",
    "Trans_type": props.type,
    "Amount_Charged": "",
    "Trans_days": "",
    "REMARKS": "",
    "USER_ID": props.userId,
    "NAME": userProfile&&userProfile.fullName,
    "COMPANY_NAME": "",
    "CIVIL_ID": userProfile&&userProfile.civilID, 
    "EMAIL": userProfile&&userProfile.emailID,
    "PHONE": userProfile&&userProfile.phoneNum,
    "REQUEST_DATE": formatDate(new Date()),
    "REQUEST_TYPE": "",
    "LICENSE_OR_CONTRACT_ID": props.licenseNo,
    "TRANS_ID": props.transactionId,
    "GeneralInfo": "",
    "requestNo": ""
    });

    var submitPortalServiceRequestPayload = {
        method: 'POST',
        mode: 'cors',
        redirect:'follow',
        
       body:submitPortalServiceBody
       
    };

    const fileUploadSubmitRefs=useRef(null);

    const [forceRender, setForceRender] = useState(false);

    const submit=async (event) => {
       // event.preventDefault();
       setForceRender(prev => !prev);

        console.log("userProf >>> "+userProfileData);
        if(PortalOnlineDoc!==undefined){
          props.onDataFromChild(selectedFiles);
        const allMandatoryExist = PortalOnlineDoc
               .filter(file2 => file2.MANDATORY === "1") 
               .every(file2 => selectedFiles.some(file1 => file1.docId === file2.docId));

      if(allMandatoryExist){

                 const formData={
                  submitPayload:submitPortalServiceRequestPayload,
                  selectedFiles:selectedFiles,
                  PortalOnlineDoc:PortalOnlineDoc,
                  lic:props.licenseNo,

                 };
                 setFileData(formData);
               await dispatch(submitPortalService(formData)).then((res) =>{
         
                setReq(1);
                console.log("payload after submit"+res + JSON.stringify(submitPortalResponse));
              
                const request=submitedData["requestID"];
                console.log(request );
                // if (fileUploadSubmitRefs.current) {
                // fileUploadSubmitRefs.current.click();
                // }
               });
               
           
        }else{
            setMandatoryFileNotFound(true);
           
        }
       
      }else if(PortalOnlineDoc===null ||PortalOnlineDoc===undefined){
        const formData={
          submitPayload:submitPortalServiceRequestPayload,
          selectedFiles:selectedFiles,
          PortalOnlineDoc:PortalOnlineDoc,
          lic:props.licenseNo,

         };
         setFileData(formData);
        dispatch(submitPortalService(formData));
        setReq(1);

      }
 
    console.log(submitPortalResponse);
    //submitDocument();
    };

     

    const submitDocument= async()=>{


       selectedFiles.forEach(file1 => {
        const docType = PortalOnlineDoc.find((portal) => portal.docId === file1.docId);
        var submitArchiveDocumentBody = {
          Channel: "PORTAL",
          DocumentType: docType ? docType.docName : "", // Check if docType is available
          LicenseType: "L",
          RequestType: "L",
          ProcedureType: "P",
          DocumentName: file1.docName,
          RequestNumberId: props.requestId,
          CompanyName: "الشركه الوطنيه للمنتجات الورقيه",
          ClientNo_OR_LicenseNumber: props.licenseNo,
          contractNo: null,
          Document: file1.base64,
        };

            
          const res= dispatch(submitArchiveDocument(submitArchiveDocumentBody))
          console.log(res);
      })
      
    }
   
    // const fetchRequestNo = () => {
    //     console.log('request1'+raw);
    //     console.log('request'+requestOptions);
    //     return fetch("https://pai-soa-uat.pai.gov.kw:7017/PAI/SmartFormServices/SmartForm_RS/SubmitPortalService" ,requestOptions)
    //       .then((response) => response.text())
    //       .then((data) =>{
    //         console.log('fetchRequestNo data >>> '+data);
    //         setRequestNo(data)})
    //       .catch((error) => {
    //         console.log('fetchRequestNo data >>> '+error);
    //         setRequestNo(null);
    //       })
    //       .finally(() => {
    //         console.log('save is finished >>> ');
    //       });
    //   };

    // Change the length based on the number of records
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fileInputRefs = Array.from({ length: 10 }, () => useRef(null));

    const handleClickButton2 = (index) => {
      // Trigger a click event on button 1 when button 2 is clicked
      fileInputRefs[index].current.click();
     

    };
    // eslint-disable-next-line react-hooks/rules-of-hooks



    return(
        <>
        {
        isDocsLoading? '' : (
            <div className="col-12 table-responsive company-internal-table" > 
            {/* {documentAdded === false? `<span style={{color: "red"}}> must eneter all required document${JSON.stringify(count)}</span>` :`<h1>${JSON.stringify(count)}${documentAdded}</h1>`}                                                                     */}
            <table className="table">
                <thead>
                <tr>
                    <th>{t('pai-serial-no')}</th>
                    <th>{t('pai-doc-name')}</th>
                    <th>{t('pai-action')}</th>
                    
                </tr>
                </thead>
                <tbody>
         { PortalOnlineDoc &&
               PortalOnlineDoc.map((tableData, index) => (
                <tr key={index} >
                    <td>{index + 1}</td>
                    <td>{tableData.docName}{ tableData.MANDATORY === "1"? <i class="fa-solid fa-star fa-2xs" style={{color: "red"}}>*</i>:' '}</td>
                    
                    <td >
                        <ul >
                            <li >
                            
                                      <a href="#attached-file" onClick={()=>handleClickButton2(index)}>{t('pai-select-upload-file')} </a>
                                   

                                    
                                {/* <div className="drag-area">
                                  <button  type="button" className="file_button" onClick={()=>handleClickButton2(index)}>Select file To Upload</button>
                                  
                                  <input type="file" ref={fileInputRefs[index]} className="custom-file-input" id="attached-file" accept=".jpg, .png , .pdf, .jpeg, .doc, .docx" onChange={(event) => handleFileChange(event,tableData,index)}  />
                                  <div className="lable-for-input-file">{selectedFileNames[index] && <p> {selectedFileNames[index]}</p>}</div>

                                
                              </div> */}

                                
                                
                            </li>
                            <li>
                            <input type="file" ref={fileInputRefs[index]} className="custom-file-input" id="attached-file" accept=".jpg, .png , .pdf, .jpeg, .doc, .docx" onChange={(event) => handleFileChange(event,tableData,index)}  />
                                  <div className="lable-for-input-file">{selectedFileNames[index] && <p> {selectedFileNames[index]}</p>}</div>
                            </li>
                        </ul>
                    </td>
                    {/* <td><input type="button" value="clear" className="btn btn-primary mb1 bg-green" onClick={() =>handleRemoveFile(tableData.docId)}></input></td> */}
                    
                </tr>                                                            
                
         ))}
        </tbody>
            </table>
           <div>{submitPortalResponse}</div>
        
        </div>
        )}

         <div className="service_control">                    
        <input type="button" name="next" className="btn btn-secondary" value={t('pai-send-request')} onClick={submit}  />
        
        </div> 
        {/* { <input type="button" name="next" ref={fileUploadSubmitRefs} className="file_button" value="print attachment" onClick={submitDocument}  /> } */}
       
        </>


    );
}

export default TransactionAttachment;