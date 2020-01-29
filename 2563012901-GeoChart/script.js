let data;
let chart;

const drawGeoChart = () => {
  data = google.visualization.arrayToDataTable([
    ['Country', 'Popularity'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700]
  ]);

  const options = {};
  chart = new google.visualization.GeoChart(document.getElementById('chart'));
  chart.draw(data, options);
};

google.load('visualization', '1', {
  packages: ['geochart']
});
google.setOnLoadCallback(drawGeoChart);
