const axios = require("axios");

// Return date string in yyyy-mm-dd format
function formatAUDate(d) {
    function z(n) {
        return (n < 10 ? '0' : '') + +n;
    }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
}

function last7Days(d) {
    d = +(d || new Date()), days = [], i = 7;
    while (i--) {
        days.push(formatAUDate(new Date(d -= 8.64e7)));
    }
    return days;
}
async function callAPI(query_region, queryDate) {

    // Set up localvars
    let dailyDeaths = 0;

    let queryURL = `https://covid-api.com/api/reports?date=${queryDate}&q=${query_region}`;

    let {
        data: response
    } = await axios.get(queryURL)

    response.data.forEach(item => {
        dailyDeaths += item.deaths_diff;
    });

    return {
        datalabel: `${queryDate}`,
        datavalue: dailyDeaths
    };
}

module.exports = function buildObject(country) {
    let responseObject = {
        labels: [],
        values: []
    }

    let dateArray = last7Days();

    return new Promise((res, rej) => {
        async function getAllData() {
            for (let i = 0; i < dateArray.length; i++) {
                const {
                    datalabel,
                    datavalue
                } = await callAPI(country, dateArray[i])
                responseObject.labels.push(datalabel)
                responseObject.values.push(datavalue)

                console.log(responseObject);
            }
            res(responseObject);
        }
        getAllData()
    })
}