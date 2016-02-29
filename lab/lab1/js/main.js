/* =====================

## Task 1

Load the dataset into our application. Set the dataset variable initialized below to https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson

You should now have GeoJSON data projected onto your map!

## Task 2

Style each garbage collection area with a different color depending on what dayo f the week garbage collection occurs. For example, all areas with Monday garbage collection could be red, all areas with Tuesday garbage collection could be blue, etc.

The myStyle function should return an object that contains style information. For example, if you add the following line inside of the myStyle function, every feature should be colored red.

return {fillColor: 'red'}

Other options for styling include opacity and weight. For a full list, see: http://leafletjs.com/reference.html#path

For our myStyle function, we want a different fillColor to be returned depending on the day of the week. If you need help, review http://leafletjs.com/examples/geojson.html for working examples of this function.

## Task 3

You might have noticed that two of the features we are mapping have empty strings as their value for collection date. These will probably have the default style on your map, not the new styles you defined for the days of the week.

Our map is better than that. Let's filter out the junk data.

Check out the myFilter function. This function is similar to the Underscore _.filter() function. The filter loops through each feature in your GeoJSON file. For each feature, when the function returns true, that feature is added to the map. When it does not return true, that feature is not added to the map.

Currently, the myFilter function contains only:

`return true;`

Since it always returns true, it will add each feature to the map. Modify the code so it only adds features to the map if they have a collection day (not an empty string).

## Task 4

Let's make something happen when a user clicks on a feature. Change the "Day of Week" in the sidebar to show the day of the week of garbage removal. Make sure to display the full name (display "Monday" instead of "MON").

We will write everything we want to happen on each feature inside of the following block of code:

var eachFeature = function(feature, layer) {
  ...
});

Notice that inside of that block of code we have a second block of code:

layer.on('click', function (e) {
  ...
})

That part sets up a click event on each feature. Any code inside that second block of code will happen each time a feature is clicked.

## Task 5

Create a legend for the map. You do not need to use Javascript. You can use HTML and CSS to create legend boxes and give each a different color. Put a label next to each box. Position the legend on top of the map (hint, you will need to use) absolute positioning, which is the technique used to position the sidebar and map on this page).

## Task 6 (Stretch Goal)

Use fitBounds (http://leafletjs.com/reference.html#map-fitbounds) to zoom in and center the map on one particular feature. To find the bounds for a feature, use e.target.getBounds() or this.getBounds() inside of the layer.on function.

## Task 7 (Stretch Goal)

Add a "Close" or "X" button to the top right of your sidebar. When when the button is clicked, call a function closeResults that performs the opposite processes as showResults, returning the user to the original state of the application.

## Task 8 (Stretch Goal)

Use Underscore to perform analysis on this GeoJSON data: find out which day of the week was the most common for garbage removal?

===================== */
//Task 1: set dataset
var dataset = 'https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson';

//Task 2: set color based on day of the week
var myStyle = function(feature) {
  if (feature.properties.COLLDAY === 'MON'){
    return {fillColor: '#B5121E', color: '#B5121E', weight: 0, fillOpacity: 1 };
  }
  if (feature.properties.COLLDAY === 'TUE'){
    return {fillColor: '#4DB93C', color: '#4DB93C', weight: 0, fillOpacity: 1  };
  }
  if (feature.properties.COLLDAY === 'WED'){
    return {fillColor: '#E08248', color: '#E08248', weight: 0, fillOpacity: 1  };
  }
  if (feature.properties.COLLDAY === 'THU'){
    return {fillColor: '#0C7860', color: '#0C7860', weight: 0, fillOpacity: 1  };
  }
  if (feature.properties.COLLDAY === 'FRI'){
    return {fillColor: '#DA4651', color: '#DA4651', weight: 0, fillOpacity: 1  };
  }
  if (feature.properties.COLLDAY === 'SAT'){
    return {fillColor: '#A3DF9A', color: '#A3DF9A', weight: 0, fillOpacity: 1  };
  }
  if (feature.properties.COLLDAY === 'SUN'){
    return {fillColor: '#BA5212', color: '#BA5212', weight: 0, fillOpacity: 1  };
  }
};


//Task 4: change text when user clicks on a polygon
var eachFeature = function(feature, layer) {
  layer.on('click', function (e) {
    if (feature.properties.COLLDAY === 'MON'){
      $('.day-of-week').text('Monday');
    }
    if (feature.properties.COLLDAY === 'TUE'){
      $('.day-of-week').text('Tuesday');
    }
    if (feature.properties.COLLDAY === 'WED'){
      $('.day-of-week').text('Wednesday');
    }
    if (feature.properties.COLLDAY === 'THU'){
      $('.day-of-week').text('Thursday');
    }
    if (feature.properties.COLLDAY === 'FRI'){
      $('.day-of-week').text('Friday');
    }
    if (feature.properties.COLLDAY === 'SAT'){
      $('.day-of-week').text('Saturday');
    }
    if (feature.properties.COLLDAY === 'SUN'){
      $('.day-of-week').text('Sunday');
    }
    console.log(feature);
    showResults();
    //Task 6: fitBounds
    map.fitBounds(this.getBounds());
  });
};



//Task 3: filter out the ones that don't specify a day
var myFilter = function(feature) {
  if (feature.properties.COLLDAY === 'MON' ||
      feature.properties.COLLDAY === 'TUE' ||
      feature.properties.COLLDAY === 'WED' ||
      feature.properties.COLLDAY === 'THU' ||
      feature.properties.COLLDAY === 'FRI' ||
      feature.properties.COLLDAY === 'SAT' ||
      feature.properties.COLLDAY === 'SUN' ){
    return true;
  }
  else {
    return false;
  }
};



$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    var myFeatureGroup = L.geoJson(parsedData, {
      onEachFeature: eachFeature,
      style: myStyle,
      filter: myFilter
    }).addTo(map);
  });
});

var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).hide() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  $('#intro').hide();
  $('#results').show();
};

/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
