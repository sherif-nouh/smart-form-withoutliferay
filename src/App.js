import React from 'react';
import { useEffect , useState } from 'react';
import Transaction from './transactions/Transaction';
import queryString from 'query-string';
import './App.css';
import './css/style.css';
import './css/style_rtl.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom-pai.css';
import './css/jquery.dataTables.min.css';
import './css/media----.css';
import './css/media.css';
import './css/assets/bootstrap/css/bootstrap.rtl.css';
import LanguageSwitcher from "./transactions/LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import Banner from './transactions/Banner';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {getSessionInfo} from './store/dashBoardSlice';
import { useDispatch ,useSelector} from "react-redux";
import { FileDataProvider } from './transactions/FileDataContext';


function App() {

  const { t  , i18n} = useTranslation();
  const dispatch=useDispatch();

    const [transactionId, setTransactionId] = useState('');
	  const [licenseNo, setLicenseNo] = useState('');
	  const [categoryType, setCategoryType] = useState('');
    const  [type,setType]=useState('');
    const [lang , setLang] = useState('en');
    const  [userId,setUserId]=useState('');
    const  [transactionType,setTransactionType]=useState('');
    const  [sessionId,setSessionId]=useState(''); 
    const {isSession} = useSelector(state => state.dashBoard);


	 useEffect(() => {
  
  const params = queryString.parse(window.location.search);

   
  const transId = atob(params.ti);//params.transId);
  const licenseNo = atob(params.lc);//params.licenseNo);
  const catType =params.ct=='null'?' PLOTS': atob(params.ct).replace('+',' ');//params.catType); Larg industry , small workshop, plot
  const type=atob(params.t);//params.catType); C for contract L for licence 
  const lang=atob(params.l);//params.lang);
  const userId =  atob(params.u);
  const transactionType = atob(params.tt); //example Small Mudium Compelex
  const sessionId = params.si;
  const reqId=atob(params.ri);
    
    setTransactionId(transId);
    setLicenseNo(licenseNo);
    setCategoryType(catType);
    setLang(lang);
    setType(type);
    setUserId(userId);
    setTransactionType(transactionType);
    setSessionId(sessionId);
    const fetchData = async () => {
      try {
        const formData={
          userId:userId,
          sessionId:sessionId,
         };
       
       dispatch(getSessionInfo(formData));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error cases
      }
    };
  
  
    const delayTime = 2000;

    // Call setTimeout to schedule the delayedFunction
   

    // Now you can use these parameters to make API requests or perform other actions
    console.log('transId:', transId);
    console.log('licenseNo:', licenseNo);
    console.log('catType:', catType);
    console.log('type:', type);
    console.log('lang:', lang);
    console.log('userId:', userId);
    console.log('transactionType:', transactionType);
    console.log('sessionId:', sessionId);
    console.log('requestId: ',reqId);
    fetchData();
    setTimeout(console.log('delay'), delayTime);
   }, [transactionId,licenseNo,categoryType,type,lang,userId,transactionType,sessionId]);

  return (
    <div className="App" dir={i18n.dir()}>
      <FileDataProvider>
      {<Banner></Banner>}
       {!isSession?  <Transaction transactionId={transactionId} licenseNo={licenseNo} categoryType={categoryType} type={type} lang={lang} userId={userId} sessionId={sessionId}/> :''   }
      { <LanguageSwitcher lang={lang}/>}
      </FileDataProvider>
    </div>
  );
}

export default App;
