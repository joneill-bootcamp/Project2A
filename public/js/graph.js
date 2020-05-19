// if function to choose graph based on user choice

switch (graphStyleEl) {
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
      data: { labels: ["a", "b"], values: [10, 20] },
      title: "Regions",
      width: window.innerWidth / 2,
      roughness: 2,
      colors: ["red", "orange", "blue", "skyblue"],
      stroke: "black",
      strokeWidth: 3,
      fillStyle: "cross-hatch",
      fillWeight: 3.5,
    });
    break;
  case "donut":
    new roughViz.Donut({
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
      fillWeight: 3.5,
    });
    break;
}
