// Leaflet map setup
var map = L.map('map', {
  center: [44.980814, -93.335080],
  zoom: 12
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

  var cartoUserName = 'echoxiaowu1993';
  var sql = "SELECT * FROM pointsjson2 where stpws_p > 0.8";
  var format = "GeoJSON";

  var url = "https://"+cartoUserName+".carto.com/api/v2/sql?format="+format+"&q="+sql;

  $.ajax(url).done(function(data){
    L.geoJson(data, {
      style: {color: "#0B645E", fillOpacity: 0.5}
    }).addTo(map);
  });
