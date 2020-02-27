const labels = [
  'Africa',
  'Asia',
  'Europe',
  'Latin America',
  'North America'
];

const makePercentage = data => {
  max = Math.max(...data);
  return data.map(d => d / max * 100);
};

const datasets = [
  {
    data: makePercentage([221, 1402, 547, 167, 172]),
    label: '1950',
    borderColor: '#4e545c'
  },
  {
    data: makePercentage([2478, 5267, 734, 784, 433]),
    label: '2050',
    borderColor: '#e0288e'
  }
];

const ctx = document.getElementById('my-chart');
const myChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: labels,
    datasets: datasets
  }
});
