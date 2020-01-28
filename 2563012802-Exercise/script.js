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

const parseDate = dateString => {
  let splited = dateString.split('-');
  if (splited.length === 3) {
    return new Date(parseInt(splited[0]), parseInt(splited[1]) - 1, parseInt(splited[2]));
  }
  splited = dateString.split(' ');
  if (splited.length === 3) {
    return new Date(parseInt(splited[2]), parseInt(splited[1]) - 1, parseInt(splited[0]));
  }
  return null;
};

const isHomeWin = match => parseInt(match.home_score) > parseInt(match.away_score);

const prepareChartData = (matches, worldCups) => {
  const results = [
    [
      'YearCountry',
      'TotalGames',
      {role: 'annotation'},
      {role: 'style'}
    ]
  ];

  for (let i = 0; i < worldCups.length; i++) {
    const worldCup = worldCups[i];
    const year = parseInt(worldCup.Year);
    const yearMatches = matches.filter(m => m.date.getFullYear() === year);
    const homeCountries = Array.from(new Set(yearMatches.map(m => m.country)));
    for (let j = 0; j < homeCountries.length; j++) {
      const homeCountry = homeCountries[j];
      const homeMatches = yearMatches.filter(m => m.country === homeCountry);
      const homeWin = worldCup.Winner === homeCountry;
      const totalGames = homeMatches.length;
      results.push([
        `${year} - ${homeCountry}`,
        homeMatches.length,
        homeMatches.length,
        homeWin ? 'blue' : 'red'
      ]);
    }
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
    title: 'Local Team was Benefit?',
    series: {
      0: {visibleInLegend: false}
    }
  };

  chartData = google.visualization.arrayToDataTable(chartRawData);
  chart = new google.visualization.ColumnChart(document.getElementById('chart'));
  chart.draw(chartData, options)
};

$(document).ready(async() => {
  try {
    let matches = await loadCsvToJson('data/international-football-results-1872-2019.csv');
    matches = matches
      .filter(match => match.tournament === 'FIFA World Cup'
        && match.home_team === match.country)
      .map(match => ({
        ...match,
        date: parseDate(match.date),
        homeWin: isHomeWin(match)
      }));

    const worldCups = await loadCsvToJson('data/world-cups.csv');

    chartRawData = prepareChartData(matches, worldCups);

    google.charts.load('current', {
      packages: ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);
  } catch (error) {
    console.error(error);
  }
});
