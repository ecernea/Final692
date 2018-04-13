/* ================================
Week 6 Assignment: slide Model
================================ */
var featureGroup = L.featureGroup();

var resetMap = function() {
   featureGroup = L.featureGroup();
   map.removeLayer(featureGroup);
};

var parsed;
var layer1;
var layer2;
var layer3;
var layer4;
var parsedAjax = $.ajax(dataset).then(JSON.parse);
parsedAjax.then(function(parsed) {
  layer1 = L.geoJson(parsed, {
    style: myStyle_all
  });
});
parsedAjax.then(function(parsed) {
  layer2 = L.geoJson(parsed, {
    style: myStyle
  });
});
parsedAjax.then(function(parsed) {
  layer3 = L.geoJson(parsed, {
    style: myStyle,
    filter: function(feature) {
      return feature.properties.pct_ebll_cat_label == 'Significantly higher (3+ times)';
    }
  });
});
parsedAjax.then(function(parsed) {
  layer4 = L.geoJson(parsed, {
    style: myStyle,
    filter: function(feature) {
      return feature.properties.pct_ebll_cat_label == 'Significantly higher (1-2 times)';
    }
  });
});
parsedAjax.then(function(parsed) {
  layer5 = L.geoJson(parsed, {
    style: myStyle,
    filter: function(feature) {
      return feature.properties.pct_ebll_cat_label == 'Significantly lower (<1.1%)';
    }
  });
});
var slide1 = function() {
  layer1.addTo(map);
  layer1.eachLayer(eachFeatureFunction);
};

var slide2 = function() {
   layer2.addTo(map);
   layer2.eachLayer(eachFeatureFunction);
};

var slide3 = function() {
   layer3.addTo(map);
   layer3.eachLayer(eachFeatureFunction);
};

var slide4 = function() {
   layer4.addTo(map);
   layer4.eachLayer(eachFeatureFunction);
};

var slide5 = function() {
   layer5.addTo(map);
   layer5.eachLayer(eachFeatureFunction);
};

/*
var remove=function(data){
  _.each(data, function(layer){
      map.removeLayer(layer);
  });
};

var remove=function(data){
  _.each(map.layers, function(layer){
      map.removeLayer(layer);
  });
};*/

var PageNum=0;

$('#slide1').show();
$('#results').hide();
$('#slide2').hide();
$('#slide3').hide();
$('#slide4').hide();
$('#slide5').hide();
$('.legend').hide();
$('#buttonPre').hide();
$('#buttonNext').show();

var slideNum = function(Number) {
  if (Number==1){
    $('#slide1').show();
    $('#results').hide();
    $('#slide2').hide();
    $('#slide3').hide();
    $('#slide4').hide();
    $('#slide5').hide();
    $('.legend').hide();
    $('#buttonPre').hide();
    $('#buttonNext').show();
  }
  else if(Number==2){
    $('#slide1').hide();
    $('#results').hide();
    $('#slide2').show();
    $('#slide3').hide();
    $('#slide4').hide();
    $('#slide5').hide();
    $('.legend').show();
    $('#buttonPre').show();
    $('#buttonNext').show();
  }
  else if(Number==3){
    $('#slide1').hide();
    $('#results').hide();
    $('#slide2').hide();
    $('#slide3').show();
    $('#slide4').hide();
    $('#slide5').hide();
    $('.legend').show();
    $('#buttonPre').show();
    $('#buttonNext').show();
  }
  else if(Number==4){
    $('#slide1').hide();
    $('#results').hide();
    $('#slide2').hide();
    $('#slide3').hide();
    $('#slide4').show();
    $('#slide5').hide();
    $('.legend').show();
    $('#buttonPre').show();
    $('#buttonNext').show();
  }
  else if(Number==5){
    $('#slide1').hide();
    $('#results').hide();
    $('#slide2').hide();
    $('#slide3').hide();
    $('#slide4').hide();
    $('#slide5').show();
    $('.legend').show();
    $('#buttonPre').show();
    $('#buttonNext').hide();
  }
};

$(document).ready(function(){
  $('#buttonNext').click(function() {
    PageNum++;
    slideNum(PageNum);
    if(PageNum==1){
      slide1();
    }
    if(PageNum==2){
      map.removeLayer(layer1);
      slide2();
    }
    else if(PageNum==3){
      map.removeLayer(layer2);
      slide3();
    }
    else if(PageNum==4){
      map.removeLayer(layer3);
      slide4();
    }
    else if(PageNum==5){
      map.removeLayer(layer4);
      slide5();
    }
  });

  $('#buttonPre').click(function() {
    resetMap();
    PageNum--;
    slideNum(PageNum);
    console.log(PageNum);
    if(PageNum==4){
      map.removeLayer(layer5);
      slide4();
    }
    else if(PageNum==3){
      map.removeLayer(layer4);
      slide3();
    }
    else if(PageNum==2){
      map.removeLayer(layer3);
      slide2();
    }
    else if(PageNum==1){
      map.removeLayer(layer2);
      slide1();
    }
    return PageNum;
  });
});
