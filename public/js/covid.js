$(document).ready(function () {
  $("form.graph").on("click", "#graph-button", async function (event) {
    event.preventDefault();
    const country = $("#country").val();
    const dataChoice = $("#data-choice").find(":selected").val();
    const dataChoiceText = $("#data-choice").find(":selected").text();
    $("#graph").empty();
    $("#spinner").show();
    await graphBuilder(country, dataChoice, dataChoiceText);
  });

  $(document).on("click", "#save-button", async function (event) {
    alert('Click!');
  });

  function graphBuilder(country, dataChoice, dataChoiceText) {
    $.post("/api/getdata", {
        country: country,
        dataChoice: dataChoice,
      })
      .then(function success(data) {
        $("#spinner").hide();
        graphRender(data, country, dataChoiceText);
      })
      .catch(handleGraphErr);
  }

  function handleGraphErr(err) {
    $("#alert .msg").text(
      "sorry the graph was unable to load, please try again"
    );
    $("#alert").fadeIn(500);
  }

  function graphRender(data, country, dataChoiceText) {
    switch ($("#graph-choice").find(":selected").val()) {
      case "bar":
        new roughViz.Bar({
          element: "#graph",
          data: data,
          title: String(`${country} - ${dataChoiceText}`),
          width: window.innerWidth / 1.9,
          roughness: 2,
          colors: ["red", "orange", "blue", "skyblue"],
          stroke: "black",
          strokeWidth: 2,
          fillStyle: "cross-hatch",
          fillWeight: 1,
          labelFontSize: "20rem",
        });
        break;
      case "barH":
        new roughViz.BarH({
          element: "#graph",
          data: data,
          title: String(`${country} - ${dataChoiceText}`),
          width: window.innerWidth / 1.8,
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
          data: data,
          title: String(`${country} - ${dataChoiceText}`),
          width: window.innerWidth / 2,
          roughness: 2,
          colors: ["red", "orange", "blue", "skyblue"],
          stroke: "black",
          strokeWidth: 3,
          fillStyle: "cross-hatch",
          fillWeight: 1,
        });
        break;
      case "pie":
        new roughViz.Donut({
          element: "#graph",
          data: data,
          title: String(`${country} - ${dataChoiceText}`),
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
  }
  $(document).on("click", "#save-button", function () {
    // Need to create the save function of the graph search query of each user
    console.log("inside the save click function ");
  });
});