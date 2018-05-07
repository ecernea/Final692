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
  //
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
  var cartoVizId = '8b7b846f-6556-4c59-91cf-468e390daeee';
  var cartoVizId1 = '358592c6-3aa2-465a-9682-0ba1fddae5ef';
  var layerUrl = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId+'/viz.json';
  var layerUrl1 = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId1+'/viz.json';

  var points;
  var pointsLayer;
  var allpoints;
  var highpoints;
  var medianpoints;
  var lowpoints;

  // var allpoints = cartodb.createLayer(map, {
  //   user_name: cartoUserName,
  //   type: 'cartodb',
  //   interactivity: true,
  //   legends: true,
  //   sublayers: [
  //     {
  //       type: 'mapnik',
  //       sql: "SELECT * FROM pointsjson2",
  //       cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
  //       interactivity: 'stpws_p' // Define properties you want to be available on interaction
  //    }
  //   ]
  // });
  // allpoints.addTo(map);
  //
  // var highpoints = cartodb.createLayer(map, {
  //   user_name: cartoUserName,
  //   type: 'cartodb',
  //   interactivity: true,
  //   legends: true,
  //   sublayers: [
  //     {
  //       type: 'mapnik',
  //       sql: "SELECT * FROM pointsjson2 where stpws_p > 0.7",
  //       cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
  //       interactivity: 'stpws_p' // Define properties you want to be available on interaction
  //    }
  //   ]
  // });
  //
  // var medianpoints = cartodb.createLayer(map, {
  //   user_name: cartoUserName,
  //   type: 'cartodb',
  //   interactivity: true,
  //   legends: true,
  //   sublayers: [
  //     {
  //       type: 'mapnik',
  //       sql: "SELECT * FROM pointsjson2 where stpws_p < 0.7 and stpws_p > 0.3",
  //       cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
  //       interactivity: 'stpws_p' // Define properties you want to be available on interaction
  //    }
  //   ]
  // });
  // // medianpoints.addTo(map);
  //
  // var lowpoints = cartodb.createLayer(map, {
  //   user_name: cartoUserName,
  //   type: 'cartodb',
  //   interactivity: true,
  //   legends: true,
  //   sublayers: [
  //     {
  //       type: 'mapnik',
  //       sql: "SELECT * FROM pointsjson2 where stpws_p < 0.3",
  //       cartocss: "#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }",
  //       interactivity: 'stpws_p' // Define properties you want to be available on interaction
  //    }
  //   ]
  // });
  // // lowpoints.addTo(map);
  //
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
  //
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
  //
  // // Show parcel points of different probabilities
  // $('#HighProb').on('click',function(e){
  //   $('#HighProbtext').fadeToggle();
  //   $('#MedianProbtext').hide();
  //   $('#LowProbtext').hide();
  //   // how to remove the map current layer and add the new selected points/ call the pointCDB function
  //   // console.log(highpoints);
  //   highpoints.addTo(map);
  // });
  // $('#MedianProb').on('click',function(e){
  //   $('#HighProbtext').hide();
  //   $('#MedianProbtext').fadeToggle();
  //   $('#LowProbtext').hide();
  //   // console.log(medianpoints);
  //   medianpoints.addTo(map);
  // });
  // $('#LowProb').on('click',function(e){
  //   $('#HighProbtext').hide();
  //   $('#MedianProbtext').hide();
  //   $('#LowProbtext').fadeToggle();
  //   // console.log(lowpoints);
  //   lowpoints.addTo(map);
  // });
  //

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

  // var districts;
  // var districtsLayer;
  // var districtsCDB = cartodb.createLayer(map, layerUrl);
  //
  // districtsCDB.addTo(map).done(function(layer) {
  //   districtsLayer = layer;
  //   districts = layer.getSubLayer(0);
  //   layer.setZIndex(0);
  // });

  // var map = L.map('map', {
  //           center: [39.8282,-98.5795],
  //           zoom: 4
  //          });

  // var vacancyLegend = new cdb.geo.ui.Legend.Choropleth({
  //   title: "Number of Vacant Homes Quintile Breaks",
  //   left:  "Bottom 20%",
  //   right: "Top 20%",
  //   colors: [ "#ffc6c4", "#ee919b", "#cc607d", "#9e3963", "#672044"]
  // });
  // var educationLegend = new cdb.geo.ui.Legend.Choropleth({
  //   title: "HS Degree or Above Quintile Breaks",
  //   left:  "Bottom 20%",
  //   right: "Top 20%",
  //   colors: [ "#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]
  // });
  // var povertyLegend = new cdb.geo.ui.Legend.Choropleth({
  //   title: "Number of Familes in Poverty Quintile Breaks",
  //   left:  "Bottom 20%",
  //   right: "Top 20%",
  //   colors: [ "#f7f7f7", "#cccccc", "#969696", "#636363", "#252525"]
  // });
  var medianIncLegend = new cdb.geo.ui.Legend.Choropleth({
    title: "Median Income Quintile Breaks",
    left:  "Bottom 20%",
    right: "Top 20%",
    colors: [ "#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"]
  });
// basemap url
var mapURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png';

// add basemap tiles to map
L.tileLayer(mapURL, {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

// add cartodb data layers to map
cartodb.createLayer(
    map,
    layerUrl,
    {
        https: true,
        legends: true,
        cartodb_logo:true,
        layerIndex:1,
    })
.addTo(map)
.done(function(layer) { // when successful, do this stuff

    var sublayer0 = layer.getSubLayer(0);
    var sublayer1 = layer.getSubLayer(1);
    var sublayer2 = layer.getSubLayer(2);
    var sublayer3 = layer.getSubLayer(3);
    var sublayer4 = layer.getSubLayer(4);

    // hide sublayer1
    sublayer0.hide();
    sublayer1.hide();
    sublayer2.hide();
    sublayer3.hide();
    sublayer4.hide();


    $("#load_3").on('click', function() {
    // turn on layer off, turn off layer on
        sublayer0.hide();
        sublayer1.show();
        sublayer2.hide();
        sublayer3.hide();
        sublayer4.hide();
        $('#map').append(medianIncLegend.render().el);
        $('.legend-title').replaceWith("Median Income Quintile Breaks");
        $(".colors").replaceWith("<div class='quartile' style='background-color:#ffffcc'></div><div class='quartile' style='background-color:#c2e699'></div><div class='quartile' style='background-color:#78c679'></div><div class='quartile' style='background-color:#31a354'></div><div class='quartile' style='background-color:#006837'></div>");
        sublayer1.setInteractivity("medianh");
        sublayer1.setInteraction(true);
        sublayer0.setInteraction(false);
        sublayer2.setInteraction(false);
        sublayer3.setInteraction(false);
        $('div#sublayer0.cartodb-popup.v2').remove();
        $('div#sublayer2.cartodb-popup.v2').remove();
        $('div#sublayer3.cartodb-popup.v2').remove();
        cdb.vis.Vis.addInfowindow(
          map, sublayer1, ["vacancy","educati", "poverty","medianh"],
          {
             infowindowTemplate: $('#iw_template_sublayer1').html()
          });
          sublayer0.on('featureClick',function(e,latlng,pos,data){
          $('.cartodb-infowindow #sublayer0' ).css('visibility', 'hidden');
          return false;
    });
      });
    $("#load_4").on('click', function() {
    // turn on layer off, turn off layer on
        sublayer0.show();
        sublayer1.hide();
        sublayer2.hide();
        sublayer3.hide();
        sublayer4.hide();
        $('#map').append(medianIncLegend.render().el);
        $(".legend-title").replaceWith("HS Degree or Above Quintile Breaks");
        $(".colors").replaceWith("<div class='quartile' style='background-color:#eff3ff'></div><div class='quartile' style='background-color:#bdd7e7'></div><div class='quartile' style='background-color:#6baed6'></div><div class='quartile' style='background-color:#3182bd'></div><div class='quartile' style='background-color:#08519c'></div>");
        sublayer0.setInteractivity("educati");
        sublayer1.setInteraction(false);
        sublayer0.setInteraction(true);
        $('div#sublayer1.cartodb-popup.v2').remove();
        $('div#sublayer2.cartodb-popup.v2').remove();
        $('div#sublayer3.cartodb-popup.v2').remove();
        cdb.vis.Vis.addInfowindow(
          map, sublayer0, ["vacancy","educati", "poverty","medianh"],
          {
             infowindowTemplate: $('#iw_template_sublayer0').html()
          });
          sublayer1.on('featureClick',function(e,latlng,pos,data){
          $('.cartodb-infowindow #sublayer1' ).css('visibility', 'hidden');
          return false;
    });
      });
      $("#load_5").on('click', function() {
      // turn on layer off, turn off layer on
          sublayer0.hide();
          sublayer1.hide();
          sublayer2.show();
          sublayer3.hide();
          sublayer4.hide();
          $('#map').append(medianIncLegend.render().el);
          $(".legend-title").replaceWith("Number of Familes In Poverty Quintile Breaks");
          $(".colors").replaceWith("<div class='quartile' style='background-color:#f7f7f7'></div><div class='quartile' style='background-color:#cccccc'></div><div class='quartile' style='background-color:#969696'></div><div class='quartile' style='background-color:#636363'></div><div class='quartile' style='background-color:#252525'></div>");
          sublayer0.setInteractivity("poverty");
          sublayer1.setInteraction(false);
          sublayer0.setInteraction(false);
          sublayer2.setInteraction(true);
          sublayer3.setInteraction(false);
          $('div#sublayer0.cartodb-popup.v2').remove();
          $('div#sublayer1.cartodb-popup.v2').remove();
          $('div#sublayer3.cartodb-popup.v2').remove();
          cdb.vis.Vis.addInfowindow(
            map, sublayer2, ["vacancy","educati", "poverty","medianh"],
            {
               infowindowTemplate: $('#iw_template_sublayer2').html()
            });
            sublayer0.on('featureClick',function(e,latlng,pos,data){
            $('.cartodb-infowindow #sublayer0' ).css('visibility', 'hidden');
            return false;
      });
        });
        $("#load_6").on('click', function() {
        // turn on layer off, turn off layer on
          sublayer0.hide();
          sublayer1.hide();
          sublayer2.hide();
          sublayer3.show();
            $('#map').append(medianIncLegend.render().el);
            $(".legend-title").replaceWith("Number of Vacant Homes Quintile Breaks");
            $(".colors").replaceWith("<div class='quartile' style='background-color:#ffc6c4'></div><div class='quartile' style='background-color:#ee919b'></div><div class='quartile' style='background-color:#cc607d'></div><div class='quartile' style='background-color:#9e3963'></div><div class='quartile' style='background-color:#672044'></div>");
            sublayer0.setInteractivity("vacancy");
            sublayer1.setInteraction(false);
            sublayer0.setInteraction(false);
            sublayer2.setInteraction(false);
            sublayer3.setInteraction(true);
            $('div#sublayer1.cartodb-popup.v2').remove();
            $('div#sublayer2.cartodb-popup.v2').remove();
            $('div#sublayer3.cartodb-popup.v2').remove();
            cdb.vis.Vis.addInfowindow(
              map, sublayer3, ["vacancy","educati", "poverty","medianh"],
              {
                 infowindowTemplate: $('#iw_template_sublayer3').html()
              });
              sublayer0.on('featureClick',function(e,latlng,pos,data){
              $('.cartodb-infowindow #sublayer0' ).css('visibility', 'hidden');
              return false;
        });
          });

})
.error(function(err) { // when error, do this
    console.log("error: " + err);
});

$("#HighProb").on('click', function(){
  cartodb.createLayer(
      map,
      layerUrl1,
      {
          https: true,
          legends: true,
          cartodb_logo:true,
          layerIndex:1
      },function(layer){
        layer.createSubLayer({
          sql:'SELECT * FROM pointsjson2 where stpws_p > 0.8',
          cartocss: '#layer { marker-fill: red; }'
        });
      }).addTo(map);


// / 'SELECT * FROM pointsjson2 where stpws_p > 0.8' }]
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
});
