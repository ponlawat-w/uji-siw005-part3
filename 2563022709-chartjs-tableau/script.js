const getJson = url => new Promise(async(resolve, reject) => {
  try {
    const response = await axios.get(url);
    resolve(response.data);
  } catch (error) {
    reject(error);
  }
});

const init = async() => {
  try {
    const scholarships = await getJson('data/scholarship.json');
    const continents = await getJson('data/continent.json');
    const universities = await getJson('data/universities.json');
    
    const continentBackgroundColor = {
      AF: '#f56c42',
      AN: '#00c3ff',
      AS: '#ab0909',
      EU: '#092963',
      NA: '#1b8ca8',
      OC: '#a89c1b',
      SA: '#4aa81b'
    };

    for (let i = 0; i < scholarships.length; i++) {
      scholarships[i].rate = scholarships[i].total / universities[scholarships[i].country];
    }

    scholarships.sort((a, b) => b.rate - a.rate);

    labels = scholarships.map(s => s.country);

    data = scholarships.map(s => s.rate);
    backgroundColor = scholarships.map(s => continentBackgroundColor[continents[s.country]]);

    const ctx = document.getElementById('my-chart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }]
      },
      options: {
        legend: { display: false }
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


init();
