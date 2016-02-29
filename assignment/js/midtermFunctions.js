

var dataset = 'https://raw.githubusercontent.com/labyer/midterm/master/NYSDestinations_5.geojson';


//equestrian text
var equestrianText = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem';

//nature observation text
var natureObservationText = 'Incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.';

//boatingText
var boatingText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat';

//campground text
var campgroundText = 't dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum. Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam';

var allMarkers;
var equestrianMarkers;
var natureObservationMarkers;
var boatingMarkers;
var campgroundMarkers;

//plot entire dataset
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    var allMarkers = L.geoJson(parsedData, {
      style: function(feature){
        return feature.properties.style;
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup(feature.properties.NAME);
      }
    });
    allMarkers.addTo(map);
    //plot only the features where feature.properties.FEATURE == 'EQUESTRIAN'
    $(document).ready(function(){
      $('#next-button').on('click', function(){
        map.removeLayer(allMarkers);
        $('#previous-button').toggleClass().toggleClass('button-previous').text('PREVIOUS');
        $('#next-button').toggleClass('button-next-rest').toggleClass('button-next-1');
        $('#attraction-feature').text('Equestrian');
        $('#info').text(equestrianText);
        $.ajax(dataset).done(function(data) {
          var parsedData = JSON.parse(data);
          var equestrianMarkers = L.geoJson(parsedData, {
            filter: function(feature, layer){
              return feature.properties.FEATURE == 'EQUESTRIAN';
            },
            style: function(feature){
              return feature.properties.style;
            },
            onEachFeature: function(feature, layer){
              layer.bindPopup(feature.properties.NAME);
            }
          });
          equestrianMarkers.addTo(map);
        });
        //plot only the features where feature.properties.FEATURE == 'NATRURE OBSERVATION'
        $(document).ready(function(){
          $('#next-button').on('click', function(){
            //map.removeLayer(equestrianMarkers);
            $('#previous-button').toggleClass().toggleClass('button-previous').text('PREVIOUS');
            $('#next-button').toggleClass('button-next-rest').toggleClass('button-next-1');
            $('#attraction-feature').text('Nature Observation');
            $('#info').text(natureObservationText);
            $.ajax(dataset).done(function(data) {
              var parsedData = JSON.parse(data);
              var natureObservationMarkers = L.geoJson(parsedData, {
                filter: function(feature, layer){
                  return feature.properties.FEATURE == 'NATURE OBSERVATION';
                },
                style: function(feature){
                  return feature.properties.style;
                },
                onEachFeature: function(feature, layer){
                  layer.bindPopup(feature.properties.NAME);
                }
              });
              natureObservationMarkers.addTo(map);
            });
            //plot only the features where feature.properties.FEATURE == 'BOATING'
            $(document).ready(function(){
              $('#next-button').on('click', function(){
                //map.removeLayer(natureObservationMarkers);
                $('#previous-button').toggleClass().toggleClass('button-previous').text('PREVIOUS');
                $('#next-button').toggleClass('button-next-rest').toggleClass('button-next-1');
                $('#attraction-feature').text('Boating');
                $('#info').text(boatingText);
                $.ajax(dataset).done(function(data) {
                  var parsedData = JSON.parse(data);
                  var boatingMarkers = L.geoJson(parsedData, {
                    filter: function(feature, layer){
                      return feature.properties.FEATURE == 'BOATING';
                    },
                    style: function(feature){
                      return feature.properties.style;
                    },
                    onEachFeature: function(feature, layer){
                      layer.bindPopup(feature.properties.NAME);
                    }
                  });
                  boatingMarkers.addTo(map);
                });
                //plot only the features where feature.properties.FEATURE == 'CAMPGROUND'
                $(document).ready(function(){
                  $('#next-button').on('click', function(){
                    //map.removeLayer(boatingMarkers);
                    $('#previous-button').toggleClass().toggleClass('button-previous').text('PREVIOUS');
                    $('#next-button').toggleClass('button-next-1').toggleClass();
                    $('#attraction-feature').text('Campgrounds');
                    $('#info').text(campgroundText);
                    $.ajax(dataset).done(function(data) {
                      var parsedData = JSON.parse(data);
                      var campgroundMarkers = L.geoJson(parsedData, {
                        filter: function(feature, layer){
                          return feature.properties.FEATURE == 'CAMPGROUND';
                        },
                        style: function(feature){
                          return feature.properties.style;
                        },
                        onEachFeature: function(feature, layer){
                          layer.bindPopup(feature.properties.NAME);
                        }
                      });
                      campgroundMarkers.addTo(map);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});




/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [43.061485, -75.975287],
  zoom: 7
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
