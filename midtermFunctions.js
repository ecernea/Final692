/* ================================
Week 6 Assignment: Midterm Functions + Signatures
================================ */
/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [46.353968, -94.642163],
  zoom: 7
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var myStyle = function(feature) {
  if (feature.properties.pct_ebll_cat_label == 'No significant difference'){
  return {color: '#7ccba2'};}
  else if (feature.properties.pct_ebll_cat_label == 'Significantly higher (1-2 times)') {
  return {color: '#089099'};}
  else if (feature.properties.pct_ebll_cat_label == 'Significantly higher (3+ times)') {
  return {color: '#045275'};}
  else if (feature.properties.pct_ebll_cat_label == 'Significantly lower (<1.1%)') {
  return {color: '#f7feae'};}
};

var myStyle_all = function(feature) {
return {color: "#00718b",opacity: 0.2};
};

var showResults = function() {
  if(PageNum==1){
    $('#slide1').hide();
    $('#results').show();
  }
};

var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    if(PageNum==1){
      var level = (layer.feature.properties.pct_ebll_cat_label);
      console.log(level);
      $(".tract").text(level);
    }
        map.fitBounds(event.target.getBounds());
        showResults();
  });
};

var dataset = "https://raw.githubusercontent.com/EchoWOO/MUSA692-Midterm-Project/master/childhoodLeadTract.json";

/*
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    console.log(parsedData);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle_all
    }).addTo(map);
    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
  });
});
*/
