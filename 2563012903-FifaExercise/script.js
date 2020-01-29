const loadCsvToJson = (url, options = {}) => new Promise((resolve, reject) => {
  $.ajax({
    url: url,
    method: 'GET',
    success: data => {
      const allRows = data.split('\n').map(row => row.split(',').map(cell => cell.trim()));
      const heads = allRows[0];
      const rows = allRows.slice(1);
      const objs = [];
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].length !== heads.length) {
          continue;
        }
        const obj = {};
        for (let j = 0; j < heads.length; j++) {
          obj[heads[j]] = rows[i][j];
        }
        objs.push(obj);
      }
      resolve(objs);
    },
    error: data => { reject(data) },
    ...options
  })
});

const prepareChartData = (worldCups) => {
  const results = [
    [
      'Country',
      'Win'
    ]
  ];

  const countries = Array.from(
    new Set(
      worldCups.filter(w => w).map(w => w.Country.split('/')).flat()
    )
  );
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    if (!country) {
      continue;
    }
    const countryWon = worldCups.filter(w => w.Country === country && w.Country === w.Winner).length;
    results.push([
      country,
      countryWon
    ]);
  }

  return results;
};

let chartRawData;
let chartData;
let chart;
const drawChart = () => {
  if (!chartRawData) {
    return;
  }

  const options = {
    colorAxis: {colors: ['blue', 'green']}
  };

  console.log(chartRawData);
  chartData = google.visualization.arrayToDataTable(chartRawData);
  chart = new google.visualization.GeoChart(document.getElementById('chart'));
  chart.draw(chartData, options)
};

$(document).ready(async() => {
  try {
    const worldCups = await loadCsvToJson('../2563012802-Exercise/data/world-cups.csv');

    chartRawData = prepareChartData(worldCups);

    google.load('visualization', '1', {
      packages: ['geochart']
    });
    google.setOnLoadCallback(drawChart);
  } catch (error) {
    console.error(error);
  }
});
