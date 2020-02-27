const ctx = document.getElementById('my-chart');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [1900, 1950, 1999, 2050],
    datasets: [
      {
        label: 'Africa',
        borderColor: '#3e95cd',
        data: [133, 221, 783, 2478],
        type: 'line',
        fill: false
      },
      {
        label: 'Europe',
        borderColor: '#3cba9f',
        data: [408, 547, 675, 734],
        type: 'line',
        fill: false
      },
      {
        label: 'Africa',
        data: [133, 221, 783, 2478]
      },
      {
        label: 'Europe',
        data: [408, 547, 675, 734]
      }
    ]
  },
  options: {
    legend: {
      display: false
    }
  }
});
