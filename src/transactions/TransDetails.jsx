import React from "react";
import { useEffect, useState } from 'react';
import {findData} from '../util/Requests'

function TransDetails(props){


//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchData = () => {
//       return fetch("https://pai-soa-uat.pai.gov.kw:7017/PAI/TransactionProj/Transactions_RS/getTransactionsDocs?transId=6")
//         .then((response) => response.json())
//         .then((data) =>{
//           setError(null);
//           console.log('abc'+data)
//           setData(data)})
//         .catch((err) => {
//           setError(err.message);
//           setData(null);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     };
  

    
//     useEffect(() => {
//       fetchData();
//     }, []);
  
//     return (
//       <main>
//       <h1>User List</h1>
//   {
//     loading == true ? (<div>A moment please...</div>) : (
          
//       <ul>
//         { data &&
//         data.PortalOnlineDoc.map((dataObj, index) => (
//             <li key={dataObj.docId}>h1 {dataObj.docName}</li>
//           ))}
//       </ul>
//       ) }
//     </main>
      
//     );
     
 }

export default TransDetails;