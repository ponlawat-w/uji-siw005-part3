const createUrl = (baseUrl, params = {}) =>
  `${baseUrl}?${Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')}`;

const getLocationFromIP = () => new Promise((resolve, reject) => {
  const success = response => {
    resolve({
      lat: parseFloat(response.latitude),
      lng: parseFloat(response.longitude)
    });
  };

  const failed = response => {
    reject(response);
  };

  $.ajax({
    url: createUrl('https://api.ipgeolocation.io/ipgeo', {apiKey: IP_GEOLOCATION_API_KEY}),
    method: 'GET',
    success: success,
    error: failed
  });
});

const getScript = url => new Promise((resolve, reject) => {
  $.getScript(url).done(() => { resolve(); }).fail(() => { reject(); });
});

let map;
const initMap = location => {
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 14
  });
};

$(document).ready(async() => {
  try {
    const location = await getLocationFromIP();
    await getScript(`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`);
    initMap(location);
  } catch (error) {
    console.error(error);
  }
});
