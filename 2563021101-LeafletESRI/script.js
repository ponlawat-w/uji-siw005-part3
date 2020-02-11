let map;

const init = () => {
  map = L.map('map').setView([39.9914806, -0.0759291], 10);
  L.esri.basemapLayer('Topographic').addTo(map);
  L.esri.Heat.featureLayer({
    url: 'https://services1.arcgis.com/k8WRSCmxGgCwZufI/ArcGIS/rest/services/Castell%c3%b3nIncidents_al394260/FeatureServer/0',
    where: 'Status = \'InProgress\' OR Status = \'Solved\'',
    radius: 50
  }).addTo(map);
};

init();
