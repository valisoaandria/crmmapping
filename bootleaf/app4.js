var map, featureList, regionSearch = [], pdvSearch = [], routeSearch = [],districtSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(region.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through theaters layer and add only features which are in the map bounds */
  pdv.eachLayer(function (layer) {
    if (map.hasLayer(pdvLayer)) {
      if (map.getBounds()) {
        $("#feature-list tbody").append('<tr class="feature-row" ><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/icone.png"></td><td class="feature-name">' + layer.feature.properties.nom + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var usgsImagery = L.layerGroup([L.tileLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 15,
}), L.tileLayer.wms("https://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer?", {
  minZoom: 16,
  maxZoom: 19,
  layers: "0",
  format: 'image/jpeg',
  transparent: true,
  attribution: "Aerial Imagery courtesy USGS"
})]);

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

var region = L.tileLayer.wms('http://localhost:8080/geoserver/TP/wms', {
				attribution: '(C) OMA 2017',
				layers: 'TP:Region_WGS84',
				format: 'image/png',
				transparent: true,
				maxZoom: 20, 
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
    regionSearch.push({
      name: layer.feature.properties.Region,
      source: "Region",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});

 var route = L.tileLayer.wms('http://localhost:8080/geoserver/TP/wms', {
				attribution: '(C) OMA 2017',
				layers: 'TP:route_mada',
				format: 'image/png',
				transparent: true,
				maxZoom: 20,
				  style: function (feature) {
				return {
				  color: "black",
				  fill: false,
				  opacity: 1,
				  clickable: true
				};
			  },
			  onEachFeature: function (feature, layer) {
				routeSearch.push({
				  name: layer.feature.properties.name,
				  source: "route",
				  id: L.stamp(layer),
				  bounds: layer.getBounds()
				});
			  }
			});
			
 var district = L.tileLayer.wms('http://localhost:8080/geoserver/RN1/wms', {
				attribution: '(C) OMA 2017',
				layers: 'RN1:district_WGS84',
				format: 'image/png',
				transparent: true,
				maxZoom: 20,
				opacity: 0.3,
				  style: function (feature) {
				return {
				  color: "black",
				  fill: false,
				  opacity: 1,
				  clickable: true
				};
			  },
			  onEachFeature: function (feature, layer) {
				districtSearch.push({
				  name: layer.feature.properties.name,
				  source: "district",
				  id: L.stamp(layer),
				  bounds: layer.getBounds()
				});
			  }
			});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };


/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var pdvLayer = L.geoJson(null);
var pdv = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.nom,
      riseOnHover: true
    });
  },
  
    onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Ville</th><td>" + feature.properties.ville + "</td></tr>" + "<tr><th>Nom</th><td>" + feature.properties.nom + "</td></tr>" + "<tr><th>Type</th><td>" + feature.properties.type + "</td></tr>" + "<tr><th>Adresse</th><td>" + feature.properties.adresse + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("<h3 class=''><img src='bootleaf/icone.png' width='24' height='28'>&nbsp;Point de Vente</h3>");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" ><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/icone.png"></td><td class="feature-name">' + layer.feature.properties.nom + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      pdvSearch.push({
        name: layer.feature.properties.nom,
        ville: layer.feature.properties.ville,
        source: "pdv"
      });
    }
  }
 
});
$.getJSON("leaflet/pdv.geojson", function (data) {
  pdv.addData(data);
  map.addLayer(pdvLayer);
});


map = L.map("map", {
  zoom: 6,
  center: [-18.90955, 47.52752],
  layers: [cartoLight, region, route, district,markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === pdvLayer) {
    markerClusters.addLayer(pdv);
    syncSidebar();
  }

});

map.on("overlayremove", function(e) {
  if (e.layer === pdvLayer) {
    markerClusters.removeLayer(pdv);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://www.facebook.com/valisoa.miandry'>Valisoa Andriamiadanarivo</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "topleft"
}).addTo(map);

var measureControl = L.control.polylineMeasure({
    position: 'topleft',                    // Position to show the control. Possible values are: 'topright', 'topleft', 'bottomright', 'bottomleft'
    unit: 'metres',                         // Show imperial or metric distances. Values: 'metres', 'landmiles', 'nauticalmiles'
    measureControlTitleOn: 'Turn on PolylineMeasure',   // Title for the control going to be switched on
    measureControlTitleOff: 'Turn off PolylineMeasure', // Title for the control going to be switched off
    measureControlLabel: '&#8614;',         // HTML to place inside the control
    measureControlClasses: [],              // Classes to apply to the control
    backgroundColor: '#8f8',                // Background color for control when selected
    cursor: 'crosshair',                    // Cursor type to show when creating measurements
    clearMeasurementsOnStop: true,          // Clear all the measurements when the control is unselected
    showMeasurementsClearControl: false,    // Show a control to clear all the measurements
    clearControlTitle: 'Clear Measurements',// Title text to show on the clear measurements control button
    clearControlLabel: '&times',            // Clear control inner html
    clearControlClasses: [],                // Collection of classes to add to clear control button
    showUnitControl: false,                 // Show a control to change the units of measurements
    tempLine: {                             // Styling settings for the temporary dashed line
        color: '#00f',                      // Dashed line color
        weight: 2                           // Dashed line weight
    },          
    fixedLine: {                            // Styling for the solid line
        color: '#006',                      // Solid line color
        weight: 2                           // Solid line weight
    },
    startCircle: {                          // Style settings for circle marker indicating the starting point of the polyline
        color: '#000',                      // Color of the border of the circle
        weight: 1,                          // Weight of the circle
        fillColor: '#0f0',                  // Fill color of the circle
        fillOpacity: 1,                     // Fill opacity of the circle
        radius: 3                           // Radius of the circle
    },
    intermedCircle: {                       // Style settings for all circle markers between startCircle and endCircle
        color: '#000',                      // Color of the border of the circle
        weight: 1,                          // Weight of the circle
        fillColor: '#ff0',                  // Fill color of the circle
        fillOpacity: 1,                     // Fill opacity of the circle
        radius: 3                           // Radius of the circle
    },
    currentCircle: {                        // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#000',                      // Color of the border of the circle
        weight: 1,                          // Weight of the circle
        fillColor: '#f0f',                  // Fill color of the circle
        fillOpacity: 1,                     // Fill opacity of the circle
        radius: 3                           // Radius of the circle
    },
    endCircle: {                            // Style settings for circle marker indicating the last point of the polyline
        color: '#000',                      // Color of the border of the circle
        weight: 1,                          // Weight of the circle
        fillColor: '#f00',                  // Fill color of the circle
        fillOpacity: 1,                     // Fill opacity of the circle
        radius: 3                           // Radius of the circle
    },
}).addTo(map);

var rulerControl = L.control.ruler({
      position: 'topleft',         // Leaflet control position option
      circleMarker: {               // Leaflet circle marker options for points used in this plugin
        color: 'red',
        radius: 2
      },
      lineStyle: {                  // Leaflet polyline options for lines used in this plugin
        color: 'red',
        dashArray: '1,6'
      },
      lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
        display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
        decimal: 2,                 // Distance result will be fixed to this value. 
        factor: null                // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
      },
      angleUnit: {
        display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
        decimal: 2,                 // Bearing result will be fixed to this value.
        factor: null                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
      }
    }).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "topleft",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": cartoLight,
  "Aerial Imagery": usgsImagery,
  "Orthophotography" : usgsImagery,
};

var groupedOverlays = {
  "Points of Interest": {
  "<img src='bootleaf/icone1.png' width='24' height='24'>&nbsp;Point de vente": pdvLayer,
  },
  "Reference": {
    "Region": region,	
	"district" : district,
	"route" : route,
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to region bounds */
  map.fitBounds(region.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var regionBH = new Bloodhound({
    name: "Region",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: regionSearch,
    limit: 10
  });

  var pdvBH = new Bloodhound({
    name: "pdv",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: pdvSearch,
    limit: 10
  });
  
    var districtBH = new Bloodhound({
    name: "district",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: districtSearch,
    limit: 10
  });


  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  regionBH.initialize();
  pdvBH.initialize();
  districtBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Region",
    displayKey: "name",
    source: regionBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Region</h4>"
    }
  }, {
    name: "pdv",
    displayKey: "name",
    source: pdvBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='bootleaf/icone.png' width='24' height='28'>&nbsp;Point de Vente</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{type}}</small>"].join(""))
    }
  }, {
    name: "district",
    displayKey: "name",
    source: districtBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>District</h4>"
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Region") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "pdv") {
      if (!map.hasLayer(pdvLayer)) {
        map.addLayer(pdvLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
