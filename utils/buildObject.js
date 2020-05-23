const axios = require("axios");

// Return date string in yyyy-mm-dd format
function formatAUDate(d) {
  function z(n) {
    return (n < 10 ? "0" : "") + +n;
  }
  return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
}

function last7Days(d) {
  (d = +(d || new Date())), (days = []), (i = 8);
  while (i--) {
    days.push(formatAUDate(new Date((d -= 8.64e7))));
  }
  days.shift();
  return days;
}
async function callAPI(query_region, queryDate, dataChoice) {
  // Set up localvars
  console.log("querying");
  let totalCases = 0;
  let totalDeaths = 0;
  let totalRecovered = 0;
  let dailyCases = 0;
  let dailyDeaths = 0;
  let dailyRecovered = 0;
  let fatalityRate = [];
  let queryResult;
  // structure the query string
  let queryURL = `https://covid-api.com/api/reports?date=${queryDate}&q=${query_region}`;
  // request the data
  let { data: response } = await axios.get(queryURL);
  // find out if returned data has a country total as the first object and if not iterate the data to create totals
  let data = response.data[0];
  if (data.region.province === "") {
    totalCases = data.confirmed;
    totalDeaths = data.deaths;
    totalRecovered = data.recovered;
    dailyCases = data.confirmed_diff;
    dailyDeaths = data.deaths_diff;
    dailyRecovered = data.recovered_diff;
    fatalityRate = data.fatality_rate;
  } else {
    response.data.forEach((item) => {
      totalCases += item.confirmed;
      totalDeaths += item.deaths;
      totalRecovered += item.recovered;
      dailyCases += item.confirmed_diff;
      dailyDeaths += item.deaths_diff;
      dailyRecovered += item.recovered_diff;
      fatalityRate.push(item.fatality_rate);
    });
  }
  // assign the data  to the graph array based on data choice of user
  const fatalityRateAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  switch (dataChoice) {
    case "confirmedTotal":
      queryResult = totalCases;
      break;
    case "deathsTotal":
      queryResult = totalDeaths;
      break;
    case "recoveredTotal":
      queryResult = totalRecovered;
      break;
    case "confirmed":
      queryResult = dailyCases;
      break;
    case "deaths":
      queryResult = dailyDeaths;
      break;
    case "recovered":
      queryResult = dailyRecovered;
      break;
    case "fatality-rate":
      queryResult = fatalityRateAvg(fatalityRate);
      break;
  }
  return {
    datalabel: `${queryDate}`,
    datavalue: queryResult,
  };
}

module.exports = function buildObject(country, dataChoice) {
  let responseObject = {
    labels: [],
    values: [],
  };

  let dateArray = last7Days();

  return new Promise((res, rej) => {
    async function getAllData() {
      for (let i = 0; i < dateArray.length; i++) {
        const { datalabel, datavalue } = await callAPI(
          country,
          dateArray[i],
          dataChoice
        );
        responseObject.labels.unshift(datalabel);
        responseObject.values.unshift(datavalue);
      }
      res(responseObject);
    }
    getAllData();
  });
};
