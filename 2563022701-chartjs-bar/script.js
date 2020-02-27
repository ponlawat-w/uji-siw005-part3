const years = [2050];
const africa = [2478];
const asia = [5267];
const europe = [734];
const latinAmerica = [784];
const northAmerica = [433];

const ctx = document.getElementById('my-chart');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: years,
    datasets: [
      {
        data: africa,
        label: 'Africa',
        backgroundColor: '#3e95cd'
      },
      {
        data: asia,
        label: 'Asia',
        backgroundColor: '#8e5ea2'
      },
      {
        data: europe,
        label: 'Europe',
        backgroundColor: '#3cba9f'
      },
      {
        data: latinAmerica,
        label: 'Latin America',
        backgroundColor: '#e8c3b9'
      },
      {
        data: northAmerica,
        label: 'North America',
        backgroundColor: '#c45850'
      },
    ]
  }
});
