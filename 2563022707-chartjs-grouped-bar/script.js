const ctx = document.getElementById('my-chart');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [1900, 1950, 1999, 2050],
    datasets: [
      {
        label: 'Africa',
        backgroundColor: '#3e95cd',
        data: [133, 221, 783, 2478]
      },
      {
        label: 'Europe',
        backgroundColor: '#3cba9f',
        data: [408, 547, 675, 734]
      }
    ]
  }
});
