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
  var pointsLayer;

  var allpoints = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    legends: true,
    sublayers: [
      {
        type: 'mapnik',
        sql: "SELECT * FROM pointsjson2",
        cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
        interactivity: 'stpws_p' // Define properties you want to be available on interaction
     }
    ]
  });

  var highpoints = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    legends: true,
    sublayers: [
      {
        type: 'mapnik',
        sql: "SELECT * FROM pointsjson2 where stpws_p > 0.7",
        cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
        interactivity: 'stpws_p' // Define properties you want to be available on interaction
     }
    ]
  });

  var medianpoints = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    legends: true,
    sublayers: [
      {
        type: 'mapnik',
        sql: "SELECT * FROM pointsjson2 where stpws_p < 0.7 and stpws_p > 0.3",
        cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
        interactivity: 'stpws_p' // Define properties you want to be available on interaction
     }
    ]
  });
  // medianpoints.addTo(map);

  var lowpoints = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    legends: true,
    sublayers: [
      {
        type: 'mapnik',
        sql: "SELECT * FROM pointsjson2 where stpws_p < 0.3",
        cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
        interactivity: 'stpws_p' // Define properties you want to be available on interaction
     }
    ]
  });
  // lowpoints.addTo(map);

  // tried to change this pointsCDB into a function
  // function selectpointlayer(sqlquerry){
  //   cartodb.createLayer(map, {
  //     user_name: cartoUserName,
  //     type: 'cartodb',
  //     interactivity: true,
  //     legends: true,
  //     sublayers: [
  //       {
  //         type: 'mapnik',
  //         sql: sqlquerry,
  //         cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
  //         interactivity: 'stpws_p' // Define properties you want to be available on interaction
  //      }
  //     ]
  //   });
  // }
  //
  // var highpoints = selectpointlayer(sqlquerryhigh);
  // var medianpoints = selectpointlayer(sqlquerrymedian);
  // var lowpoints = selectpointlayer(sqlquerrylow);

  // pointsCDB = cartodb.createLayer(map, {
  //   user_name: cartoUserName,
  //   type: 'cartodb',
  //   interactivity: true,
  //   legends: true,
  //   sublayers: [
  //     {
  //       type: 'mapnik',
  //       sql: sqlquerry,
  //       cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
  //       interactivity: 'stpws_p' // Define properties you want to be available on interaction
  //    }
  //   ]
  // });

  // pointsCDB.addTo(map).done(function(layer) {
  //   pointsLayer = layer;
  //   points = layer.getSubLayer(0);
  //   // console.log(layer.options.legend);
  //   layer.setZIndex(1000);
  // });

  // Show parcel points of different probabilities
  $('#HighProb').on('click',function(e){
    $('#HighProbtext').fadeToggle();
    $('#MedianProbtext').hide();
    $('#LowProbtext').hide();
    // how to remove the map current layer and add the new selected points/ call the pointCDB function
    console.log(highpoints);
    highpoints.addTo(map).done(function(layer) {
      pointsLayer = layer;
      points = layer.getSubLayer(0);
      // console.log(layer.options.legend);
      layer.setZIndex(1000);
    });
  });
  $('#MedianProb').on('click',function(e){
    $('#HighProbtext').hide();
    $('#MedianProbtext').fadeToggle();
    $('#LowProbtext').hide();
    medianpoints.addTo(map);
  });
  $('#LowProb').on('click',function(e){
    $('#HighProbtext').hide();
    $('#MedianProbtext').hide();
    $('#LowProbtext').fadeToggle();
    lowpoints.addTo(map);
  });


  // pointsCDB = cartodb.createLayer(map, {
  //   user_name: cartoUserName,
  //   type: 'cartodb',
  //   interactivity: true,
  //   legends: true,
  //   sublayers: [
  //     {
  //       type: 'mapnik',
  //       sql: sqlquerry,
  //       cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
  //       interactivity: 'stpws_p' // Define properties you want to be available on interaction
  //    }
  //   ]
  // });
  //
  // pointsCDB.addTo(map).done(function(layer) {
  //   pointsLayer = layer;
  //   points = layer.getSubLayer(0);
  //   // console.log(layer.options.legend);
  //   layer.setZIndex(1000);
  // });

  var districts;
  var districtsLayer;
  var districtsCDB = cartodb.createLayer(map, layerUrl);

  // districtsCDB.addTo(map).done(function(layer) {
  //   districtsLayer = layer;
  //   districts = layer.getSubLayer(0);
  //   layer.setZIndex(0);
  // });

  // change points:
  // points.setSQL('SELECT * FROM pointsjson2')
  // points.setCartoCSS('')

  // change districts:
  // districts.setSQL('SELECT * FROM minblocksvars')
  // points.setCartoCSS('')

  //cartodb.createLayer(map, layerUrl)
  //  .on('done', function(layer) {
  //    layer.addTo(map);
  //  }).on('error', function(err) {
  //    console.log(err);
  //  });
