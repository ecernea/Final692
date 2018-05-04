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

  // var cartoUserName = 'echoxiaowu1993';
  // var sql = "SELECT * FROM pointsjson2 where stpws_p > 0.8";
  // var format = "GeoJSON";
  //
  // var url = "https://"+cartoUserName+".carto.com/api/v2/sql?format="+format+"&q="+sql;
  //
  // $.ajax(url).done(function(data){
  //   L.geoJson(data, {
  //     style: {color: "#0B645E", fillOpacity: 0.5}
  //   }).addTo(map);
  // });

  // To add your Carto visualization, change cartoUserName and cartoVizId to your username and
  // project ID. These values can be found in the URL of your map on Carto:
  // - https://[cartoUserName].carto.com/[cartoVizId]

  // Unfortunately, only some visualizations styles are available in this method:
  //
  // - None
  // - Animated
  // - Pixel
  //
  // This is a bummer. But don't worry, we'll learn about how to do more powerful visualizations
  // with Carto next week when we learn about SQL

  // To add visualizations created with the Analysis feature, you will need to export the data to a
  // GeoJSON. From there, you can either import the GeoJSON to Carto or use Leaflet's L.geoJson.

  var cartoUserName = 'echoxiaowu1993';
  var cartoVizId = '41b34693-185d-4912-8bc8-448f3a3b7de0';
  var layerUrl = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId+'/viz.json';

  var points;
  var pointsLayer = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    sublayers: [
      {
        type: 'mapnik',
        sql: "SELECT * FROM pointsjson2",
        cartocss: "#pointsjson2 { marker-width: 7; marker-fill: #EE4D5A; marker-fill-opacity: 0.9; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFFFFF; marker-line-opacity: 1; }",
        interactivity: 'stpws_p' // Define properties you want to be available on interaction
     }
    ]
  })

  var districts;
  var districtsLayer = cartodb.createLayer(map, layerUrl)

  pointsLayer.addTo(map).done(function(layer) {
    points = layer.getSubLayer(0);
    layer.setZIndex(1000)
  })

  districtsLayer.addTo(map).done(function(layer) {
    districts = layer.getSubLayer(0);
    layer.setZIndex(0)
  })

  //cartodb.createLayer(map, layerUrl)
  //  .on('done', function(layer) {
  //    layer.addTo(map);
  //  }).on('error', function(err) {
  //    console.log(err);
  //  });

