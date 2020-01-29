let data;
let chart;

const drawGeoChart = () => {
  data = google.visualization.arrayToDataTable([
    ['City', 'Population', 'Area'],
    ['Rome', 2761477, 1285.31],
    ['Milan', 1324110, 181.76],
    ['Naples', 959574, 117.27],
    ['Turin', 907563, 130.17],
    ['Palermo', 655875, 158.9],
    ['Genoa', 607906, 243.60],
    ['Bologna', 380181, 140.7],
    ['Florence', 371282, 102.41],
    ['Fiumicino', 67370, 213.44],
    ['Anzio', 52192, 43.43],
    ['Ciampino', 38262, 11]
  ]);

  const options = {
    region: 'IT',
    displayMode: 'markers',
    colorAxis: {colors: ['green', 'blue']}
  };
  chart = new google.visualization.GeoChart(document.getElementById('chart'));
  chart.draw(data, options);
};

google.charts.load('current', {
  packages: ['geochart'],
  mapsApiKey: MAPS_API_KEY
});
google.charts.setOnLoadCallback(drawGeoChart);