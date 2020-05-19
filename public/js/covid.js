$(document).ready(function () {
  var graphStyleEl = $("#graph-button");
  var saveEl = $("#save-button");
  async function createMyGraph() {
    let countryEl = $("#country");
    let confiremedCasesEl = $("confirmed");
    let deathsEl = $("deaths");
    let recoveredEl = $("recovered");
    let fatalityRateEl = $("fatality-rate");
    //let userData = await $.ajax(method: "GET", url: "api/get", data: )
  }
  $(document).on("click", "#graph-button", function (event) {
    // event.preventDefault();
    // event.stopPropagation();
    console.log("inside the graph click function");
    // if function to choose graph based on user choice
    console.log($("#graph-choice").val());
    switch ($("#graph-choice").val()) {
      case "bar":
        new roughViz.Bar({
          element: "#graph",
          data: {
            labels: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            values: [10, 20, 30, 15, 18, 29, 14],
          },
          title: "Bar Graph",
          width: window.innerWidth / 2,
          roughness: 2,
          colors: ["red", "orange", "blue", "skyblue"],
          stroke: "black",
          strokeWidth: 2,
          fillStyle: "cross-hatch",
          fillWeight: 1,
          labelFontSize: "2rem",
        });
        break;
      case "barH":
        new roughViz.BarH({
          element: "#graph",
          data: {
            labels: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            values: [10, 20, 30, 15, 18, 29, 14],
          },
          title: "Regions",
          width: window.innerWidth / 2,
          roughness: 2,
          colors: ["red", "orange", "blue", "skyblue"],
          stroke: "black",
          strokeWidth: 3,
          fillStyle: "cross-hatch",
          fillWeight: 1,
        });
        break;
      case "donut":
        new roughViz.Donut({
          element: "#graph",
          data: {
            labels: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            values: [10, 20, 30, 15, 18, 29, 14],
          },
          title: "Regions",
          width: window.innerWidth / 2,
          roughness: 2,
          colors: ["red", "orange", "blue", "skyblue"],
          stroke: "black",
          strokeWidth: 3,
          fillStyle: "cross-hatch",
          fillWeight: 1,
        });
        break;
      case "scatter":
        new roughViz.Scatter({
          element: "#graph",
          data: {
            labels: ["North", "South", "East", "West"],
            values: [10, 5, 8, 3],
          },
          title: "Regions",
          width: window.innerWidth / 2,
          roughness: 2,
          colors: ["red", "orange", "blue", "skyblue"],
          stroke: "black",
          strokeWidth: 3,
          fillStyle: "cross-hatch",
          fillWeight: 1,
        });
        break;
    }
  });
  $(document).on("click", "#save-button", function () {
    console.log("inside the save click function ");
  });
});
