$(document).ready(function () {
  async function createMyGraph() {
    let countryEl = $('#country')
    let confiremedCasesEl = $('confirmed')
    let deathsEl = $('deaths')
    let recoveredEl = $('recovered')
    let fatalityRateEl = $('fatality-rate')
    let graphStyleEl = $('graph-choice')
    let saveEl = $('save-button')

    let userData = await $.ajax(method: "GET", url: "api/get", data:)

    graphStyleEl.on("click", function(){
      console.log("inside the graph click function")
    })

    saveEl.on("click", function(){
      console.log("inside the save click function ")
    })


  }

 
});