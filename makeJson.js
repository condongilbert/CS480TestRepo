'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key


// var userstocksymbol1 = test;
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';


request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data)

      const fs = require('fs')
    
      const saveData = (data)=>{
        const finished =(error)=>{
            if(error){
                console.error(error)
                return;
            }
        }
        
        const jsonData= JSON.stringify(data)
        
        fs.writeFile('data2.json',jsonData,finished)
      }
      saveData(data)
    }
});

