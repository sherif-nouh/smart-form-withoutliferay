
/*export const getObjects = () => {
	return fetch('https://pai-soa-uat.pai.gov.kw:7017/TransactionProj/Transactions_RS/getTransactionsDocs?transId=6', {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
            'Channel' :'portal',
            'host':'host',
		},
		method: 'GET',
	});
};


export const getRequest = async (endpoint,method) => {
    try {
      const response = await fetch('https://pai-soa-uat.pai.gov.kw:7017/TransactionProj/Transactions_RS/getTransactionsDocs?transId=6', {
        method: method,
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };*/


  /*export const findData = async (endpoint) => {
    try {
      return await fetch(endpoint).then(function(response) {
        return response.json();
      })
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };*/



export const invokeRestClientGet = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) =>{
        //setError(null);
        console.log('abc'+data)
        //setData(data)
        })
      .catch((err) => {
        //setError(err.message);
        //setData(null);
      })
      .finally(() => {
       // setLoading(false);
      });
  };


  