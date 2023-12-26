
import React, { useEffect } from "react";

import QRCode from 'qrcode.react';
import ProcedureSteps from './ProcedureSteps';
import { useTranslation } from 'react-i18next';

function TransactionInfo(props){
    const { t } = useTranslation();
    useEffect(() => {
        console.log("categoryType",props.categoryType);
      });
 //get data from service and draw it to the page  
    const getTransactions= props.PortalAlltransactionVw && props.PortalAlltransactionVw.map((transInfo,index)=>(
      <>
                <div className="collapse show shadow-for-box" id="service_overview" key={index}>
                   {transInfo.ed_service_category === props.categoryType? 
                    <div className="card card-body" >
                        <div className="body_item">
                            <div className="items_content">
                                <div className="block_left">
                                    {/*<img className="img-fluid" src="/o/SmartForms/images/qrcode.svg" alt="qr Code image" />
                                    افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.*/}
                                    <div id="qrcode">
                                        <QRCode value={props.currentUrl}  />    
                                    </div>	
                                    {t('pai-open-service')}
                                </div>
								
                                <div className="block_right" >
								 
                                    <div className="item">
                                        <div className="item_head">{t('pai-service-category')}</div>
                                        <div className="item_body" > {transInfo.ad_service_category}</div>
												
                                    </div>
                                    <div className="item">
                                        <div className="item_head">{t('pai-target-audience')}</div>
                                        <div className="item_body">{transInfo.a_service_audience}</div>
                                    </div>
                                </div>
								
                            </div>
                        </div>
                        <div className="body_item">
                            <div className="row">
                                <div className="col-6 item">
                                    <div className="item_head">{t('pai-service-fees')}</div>
                                    <div className="item_body"> {transInfo.transAmount} {t('pai-kwd')}</div>
                                </div>
                                <div className="col-6 item">
                                    <div className="item_head">{t('pai-service-time')}</div>
                                    <div className="item_body">{transInfo.transDays} 
									 {transInfo.transDays === 1? t('pai-day'): 
                                                    (props.locale ==='en_US' && transInfo.transDays >= 2)? t('pai-day'):  
                                                    (props.locale ==='ar_SA' && transInfo.transDays > 10) ||
                                                          (transInfo.transDays ===2)?t('pai-day') : t('pai-day')}
									
									</div>
                                </div>
                            </div>
                        </div>
                        <div className="body_item">
                            <div className="row">
                                <div className="col-6 item">
                                    <div className="item_head">{t('pai-users-no')}</div>
                                    <div className="item_body">{props.NoOfUsersForTrans&&props.NoOfUsersForTrans.Counter}</div>  
                                </div>
                                <div className="col-6 item">
                                    <div className="item_head">{t('pai-transactions-no')}</div>
                                    <div className="item_body" >{props.NoOfTempRequests&&props.NoOfTempRequests.counter}</div>
                                </div>
                            </div>
                            <div className="row row_item">
                               <ProcedureSteps flowStepsByTrans={props.flowStepsByTrans} isLoading={props.isFlowStepsByTransLoading}/>
                            </div>
                        </div>
                         
                    </div>
                   :''}
                   
                </div>

            
      </>
    ));

     return (
       <>
       {
        props.isLoading ? (<div>A moment please...</div>) : (
       <div className="col-xl-4 col-lg-5 menu_sidebar ">
            <div className="menu__item ">
                <a className="toggle_btn shadow-for-box" data-bs-toggle="collapse" href="#service_overview" role="button"
                    aria-expanded="true" aria-controls="service_overview">
                  {t('pai-service-overflow')}

                    <i className="fa-regular fa-chevron-down"></i>
                </a>
                {props.isLoading ? 'Loading...' : getTransactions}
            </div>
        </div>
    ) }
    
       </>
     );
}

export default TransactionInfo;