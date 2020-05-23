const axios = require("axios");

// Return date string in yyyy-mm-dd format
function formatAUDate(d) {
  function z(n) {
    return (n < 10 ? "0" : "") + +n;
  }
  return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
}

function last7Days(d) {
  (d = +(d || new Date())), (days = []), (i = 7);
  while (i--) {
    days.push(formatAUDate(new Date((d -= 8.64e7))));
  }
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

  let queryURL = `https://covid-api.com/api/reports?date=${queryDate}&q=${query_region}`;

  let { data: response } = await axios.get(queryURL);

  if (response.data[0].region.province === "") {
    totalCases = response.data[0].confirmed;
    totalDeaths += response.data[0].deaths;
    totalRecovered = response.data[0].recovered;
    dailyCases = response.data[0].confirmed_diff;
    dailyDeaths = response.data[0].deaths_diff;
    dailyRecovered = response.data[0].recovered_diff;
    fatalityRate = response.data[0].fatality_rate;
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
  const fatalityRateAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  if (dataChoice === "confirmedTotal") {
    queryResult = totalCases;
  } else if (dataChoice === "deathsTotal") {
    queryResult = totalDeaths;
  } else if (dataChoice === "recoveredTotal") {
    queryResult = totalRecovered;
  } else if (dataChoice === "confirmed") {
    queryResult = dailyCases;
  } else if (dataChoice === "deaths") {
    queryResult = dailyDeaths;
  } else if (dataChoice === "recovered") {
    queryResult = dailyRecovered;
  } else if (dataChoice === "fatality-rate") {
    queryResult = fatalityRateAvg(fatalityRate);
  } else {
    console.log("data choice script error");
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
