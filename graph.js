window.onload = function () {
  var dataPoints = [];

  var stockChart = new CanvasJS.StockChart("chartContainer", {
    title: {
      text: "Stock Chart"
    },
    charts: [{
      data: [{
        type: "line", //Change it to "spline", "area", "column"
        dataPoints: dataPoints
      }]
    }],
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      inputFields: {
        enabled: false,
      }
    }
  });
  
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=QEHLSEQZWQ0SZGJA'
      const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onerror = function (xhr) {
          console.log("error:", xhr);
        };
        xhr.onprogress = function (xhr) {
          console.log("bytes loaded:", xhr.loaded);
        }; /// or something
        xhr.onload = callback;
        xhr.send(null);
        

        function callback(xhr) {
          const response = xhr.target.response;
          console.log(response);  

          if (response.slice(0, 1) !== "{") {
            return;
          } // not a json file
          
          const json = JSON.parse(response)

          const intraDay = json["Time Series (Daily)"];
          var stock_Dates = []; //Array Of Data
          var stock_opens = [];
          var stock_highs = [];
          var stock_lows = [];
          var stock_closes = [];
          var stock_volumes = [];
          // var intraDay_date = { intraday: stock_Dates };
          for (var update in intraDay) {
            var stock_Date = update;
            var stock_open = intraDay[update]["1. open"]; //Narrowing the endpoints for accessing the req Data
            var stock_high = intraDay[update]["2. high"];
            var stock_low = intraDay[update]["3. low"];
            var stock_close = intraDay[update]["4. close"];
            var stock_volume = intraDay[update]["5. volume"];
            stock_Dates.push(stock_Date); //Pushing the Data into the Array of Data
            stock_opens.push(stock_open);
            stock_highs.push(stock_high);
            stock_lows.push(stock_low);
            stock_closes.push(stock_close);
            stock_volumes.push(stock_volume);
          }

       
       

          console.log(stock_Date)
            
          

          for (let i = 0; i < stock_Dates.length; i++) {

            //Create an object to store the formatted data
            dataPoints.push({
                x: new Date(stock_Dates[i]), //x value is the date
                y: Number (stock_closes[i])
            });
        }

         
          stockChart.render();
        }
      }