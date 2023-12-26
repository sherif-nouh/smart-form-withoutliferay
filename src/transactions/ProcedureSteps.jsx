import React from "react";
//import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function ProcedureSteps({flowStepsByTrans,isLoading}){
  const { t } = useTranslation();

    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // const fetchData = () => {
    //   return fetch("https://pai-soa-uat.pai.gov.kw:7017/PAI/TransactionProj/Transactions_RS/FlowStepsByTransId?transId=6")
    //     .then((response) => response.json())
    //     .then((data) =>{
    //       setError(null);
    //       console.log('abc'+data)
    //       setData(data)})
    //     .catch((err) => {
    //       setError(err.message);
    //       console.log('erorr >>>> ')
    //       setData(null);
    //     })
    //     .finally(() => {

    //       setLoading(false);
    //     });
    // };
  

    
    // useEffect(() => {
    //   fetchData();
    // }, []);
  
    return (
      <div>
  {
    isLoading ? 'loading...' : (
          
      <div className="col-12 item text-start py-3">
        <div className="item_head">
          {t('pai-service-procedure')}
        </div>  
        
          <div className="text-start">
          { flowStepsByTrans &&
            flowStepsByTrans.FlowStep.map((dataObj, index) => (
            <div className="item_text"  key={index}>
               {dataObj.STEP_NO} - {dataObj.STEPS_DESC}  
            </div>

             ))}
          </div>
      </div>
      ) }
    </div>
      
    );
     
}

export default ProcedureSteps;