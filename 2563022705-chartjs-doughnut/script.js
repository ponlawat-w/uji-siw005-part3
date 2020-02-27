const ctx = document.getElementById('my-chart');
const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [2478, 5267, 734, 784, 433],
      backgroundColor: [
        '#3e95cd',
        '#8e5ea2',
        '#3cba9f',
        '#e8c3b9',
        '#c45850'
      ]
    }],
    labels: [
      'Africa',
      'Asia',
      'Europe',
      'Latin America',
      'North America'
    ]
  }
});
