let chart;
let data;

const selectHandler = () => {
  if (!chart || !data) {
    return;
  }

  const selectedItem = chart.getSelection()[0];
  if (selectedItem) {
    const value = data.getValue(selectedItem.row, selectedItem.column ? selectedItem.column : 0);
    if (value) {
      alert(`The user selected ${value}`);
    }
  }
};

const drawChart = () => {
  data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]);

  const options = {
    title: 'My Daily Activities'
  };

  chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
  google.visualization.events.addListener(chart, 'select', selectHandler);
  chart.draw(data, options);
};

google.charts.load('current', {
  packages: ['corechart']
});
google.charts.setOnLoadCallback(drawChart);
