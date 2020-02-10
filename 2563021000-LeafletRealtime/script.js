let map, realtime;

const openSkyResponseToGeojson = states => {
  const features = [];
  for (let i = 0; i < states.length; i++) {
    features.push({
      type: 'Feature',
      properties: {
        id: states[i][0]
      },
      geometry: {
        type: 'Point',
        coordinates: [states[i][5], states[i][6]]
      }
    });
  }
  return {
    type: 'FeatureCollection',
    features: features
  };
};

const realtimeSource = async(success, error) => {
  try {
    const currentBounds = map.getBounds();
    const lats = [currentBounds.getNorth(), currentBounds.getSouth()];
    const lngs = [currentBounds.getEast(), currentBounds.getWest()];
    const lamin = Math.min(...lats);
    const lamax = Math.max(...lats);
    const lomin = Math.min(...lngs);
    const lomax = Math.max(...lngs);
    const results = await axios.get(
      `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`
    );
    const featureCollection = openSkyResponseToGeojson(results.data.states);
    success(featureCollection);
  } catch (error) {
    error(typeof error === 'string' ? error : error.toString());
  }
};

const init = () => {
  map = L.map('map').setView([39.9914806, -0.0759291], 10);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: MAPBOX_ACCESS_TOKEN
  }).addTo(map);

  realtime = L.realtime(realtimeSource, {
    interval: 10000
  }).addTo(map);
};

init();
