
window.onload = function () {
  var dataPoints = [];

  var stockChart = new CanvasJS.StockChart("chartContainer", {
    title: {
      text: "StockChart Title"
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

  $.getJSON("/data2.json").done(function (data) {
    let timeSer = "Time Series (Daily)";
    let close = "4. close";
    for (var key in data[timeSer]) {
      dataPoints.push({ x: new Date(key), y: Number(data[timeSer][key][close]) });
    }
    stockChart.render();
  });
}
