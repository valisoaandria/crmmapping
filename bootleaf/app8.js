var map, featureList, pdvSearch = [], hostoSearch = [], pharmaSearch = [], genSearch = [], regionRN1Search = [] ;

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
  /* Loop through pdv layer and add only features which are in the map bounds */
  pdv.eachLayer(function (layer) {
    if (map.hasLayer(pdvLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/icone.png"></td><td class="feature-name">' + layer.feature.properties.nom + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through hosto layer and add only features which are in the map bounds */
  hosto.eachLayer(function (layer) {
    if (map.hasLayer(hostoLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/ho.png"></td><td class="feature-name">' + layer.feature.properties.nom + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
   /* Loop through pharma layer and add only features which are in the map bounds */
  pharma.eachLayer(function (layer) {
    if (map.hasLayer(pharmaLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/frm.jpg"></td><td class="feature-name">' + layer.feature.properties.nom + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
    /* Loop through pharma layer and add only features which are in the map bounds */
  gen.eachLayer(function (layer) {
    if (map.hasLayer(genLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/gen.png"></td><td class="feature-name">' + layer.feature.properties.nom + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

      /* Loop through pharma layer and add only features which are in the map bounds */
  regionRN1.eachLayer(function (layer) {
    if (map.hasLayer(regionRN1Layer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/gen.png"></td><td class="feature-name">' + layer.feature.properties.region + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
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
var cartoLight = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var fond = L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  maxZoom: 20, 
  attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
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

var region = L.tileLayer.wms('http://localhost:8080/geoserver/RN1/wms', {
        attribution: '(C) OMA 2017',
        layers: 'RN1:region_wgs84',
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
});


/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});


/* Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer */
var pdvLayer = L.geoJson(null);
var pdv = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker-icon.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.nom,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    var popupContent = " Botika : ";

      if (feature.properties && feature.properties.nom ) {
        popupContent += feature.properties.nom + "</p>" + "Adresse : " + feature.properties.adresse + "</p>" + " Type : " + feature.properties.type+ "</p>" + " Ville : " + feature.properties.ville+ "</p>" ;

      }

      layer.bindPopup(popupContent);
  }
});
$.getJSON("bootleaf/ess.geojson", function (data) {
  pdv.addData(data);
  map.addLayer(pdvLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove hosto to markerClusters layer */
var hostoLayer = L.geoJson(null);
var hosto = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/hos.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.nom,
      riseOnHover: true
    });
  },
    onEachFeature: function (feature, layer) {
    var popupContent = " Hopital : ";

      if (feature.properties && feature.properties.nom ) {
        popupContent += feature.properties.nom + "</p>" + "Adresse : " + feature.properties.adresse + "</p>" + " Horaires : " + feature.properties.Horaires+ "</p>" + " Contact : " + feature.properties.Contact+ "</p>" +"Region :"+ feature.properties.region + "</p>";

      }

      layer.bindPopup(popupContent);
  }
  });
$.getJSON("leaflet/hosto.geojson", function (data) {
  hosto.addData(data);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove hosto to markerClusters layer */
var pharmaLayer = L.geoJson(null);
var pharma = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/frm.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.nom,
      riseOnHover: true
    });
  },    
  onEachFeature: function (feature, layer) {
    var popupContent = " Pharmacie : ";

      if (feature.properties && feature.properties.nom ) {
        popupContent += feature.properties.nom + "</p>" + "Adresse : " + feature.properties.Adresse + "</p>" + " Contact : " + feature.properties.Contact+ "</p>" + "Region :"+ feature.properties.region + "</p>";

      }

      layer.bindPopup(popupContent);
  }
});
$.getJSON("leaflet/pharmacie.geojson", function (data) {
  pharma.addData(data); 
});

/* Empty layer placeholder to add to layer control for listening when to add/remove hosto to markerClusters layer */
var genLayer = L.geoJson(null);
var gen = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/gen1.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.nom,
      riseOnHover: true
    });
  },
      onEachFeature: function (feature, layer) {
    var popupContent = " Gendarmerie : ";

      if (feature.properties && feature.properties.nom ) {
        popupContent += feature.properties.nom + "</p>" + "Adresse : " + feature.properties.adresse + "</p>" + " Contact : " + feature.properties.Contact+ "</p>" +"Region :"+ feature.properties.region + "</p>";

      }

      layer.bindPopup(popupContent);
  }
});
$.getJSON("leaflet/gendarme.geojson", function (data) {
  gen.addData(data);
});


var couleur = {"AMBOHIDRATRIMO":"#8080ff", "ANDRAMASINA":"#ccccff", "ANKAZOBE":"#8080ff","ANTANANARIVO-ATSIMONDRANO":"#8080ff", "ANTANANARIVO-AVARADRANO":"#8080ff", "ANTANANARIVO-RENIVOHITRA":"#9d09ff","ARIVONIMAMO":"#0000cc", "FENOARIVOBE":"#8080ff", "MANJAKANDRIANA":"#8080ff","MIARINARIVO":"#0000cc", "SOAVINANDRIANA":"#ccccff", "TSIROANOMANDIDY":"#0000cc","ANJOZOROBE":"#8080ff"};


var subwayColors = {"ANALAMANGA":"#0000cc", "ITASY":"#ccccff", "BONGOLAVA":"#8080ff"};

/* Empty layer placeholder to add to layer control for listening when to add/remove hosto to markerClusters layer */

var districtRN1 = L.geoJson(null, {
    style: function (feature) {
    return {
      color: couleur[feature.properties.NOM_FIV],
      weight : 1
    };
    riseOnHover: true
  },
 onEachFeature: function (feature, layer) {
    var popupContent = " DISTRICT : ";

      if (feature.properties && feature.properties.NOM_FIV ) {
        popupContent += feature.properties.NOM_FIV + "</p>" ;

      }

      layer.bindPopup(popupContent);
  }
});
$.getJSON("bootleaf/district_rn1.geojson", function (data) {
  districtRN1.addData(data);
});

var regionRN1 = L.geoJson(null, {
   transparent: true,
        maxZoom: 20,
   style: function (feature) {
      return {
        color: subwayColors[feature.properties.Region],
        weight: 1
      };
  },
 onEachFeature: function (feature, layer) {
    var popupContent = " Region : ";

      if (feature.properties && feature.properties.Region ) {
        popupContent += feature.properties.Region + "</p>"+ "Point de Vente : " + feature.properties.pdv + "</p>";

      }

      layer.bindPopup(popupContent);
  }
});
$.getJSON("bootleaf/region_rn1.geojson", function (data) {
  regionRN1.addData(data);
});


map = L.map("map", {
  zoom: 8,
  center: [-18.90955, 47.52752],
  layers: [cartoLight, region, regionRN1 , markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

// say this is your scale
var scale = L.control.scale({

position: 'bottomleft',
// @option maxWidth: Number = 100
// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
maxWidth: 100,
// @option metric: Boolean = True
// Whether to show the metric scale line (m/km).
metric: true,
// @option imperial: Boolean = True
// Whether to show the imperial scale line (mi/ft).
imperial: true,
// @option updateWhenIdle: Boolean = false
// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
}).addTo(map);   

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === pdvLayer) {
    markerClusters.addLayer(pdv);
    syncSidebar();
  }
  if (e.layer === hostoLayer) {
    markerClusters.addLayer(hosto);
    syncSidebar();
  }
    if (e.layer === pharmaLayer) {
    markerClusters.addLayer(pharma);
    syncSidebar();
  }
   if (e.layer === genLayer) {
    markerClusters.addLayer(gen);
    syncSidebar();
  }

});

map.on("overlayremove", function(e) {
  if (e.layer === pdvLayer) {
    markerClusters.removeLayer(pdv);
    syncSidebar();
  }
  if (e.layer === hostoLayer) {
    markerClusters.removeLayer(hosto);
    syncSidebar();
  }
    if (e.layer === pharmaLayer) {
    markerClusters.removeLayer(pharma);
    syncSidebar();
  }
    if (e.layer === genLayer) {
    markerClusters.removeLayer(gen);
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

var zoomHome = L.Control.zoomHome({position: 'topright'}).addTo(map);

var boxZoom = L.Control.boxzoom({ position:'topright' }).addTo(map);

/* Globe */
var miniMap = new L.Control.GlobeMiniMap({     
  land:'#ffff8c',
  water:'#3333FF',
  marker:'#000000',
  topojsonSrc: 'leaflet-globeminimap-master/src/world.json'
}).addTo(map);

var measureControl = L.control.polylineMeasure({
    position: 'topright',                    // Position to show the control. Possible values are: 'topright', 'topleft', 'bottomright', 'bottomleft'
    unit: 'metres',                         // Show imperial or metric distances. Values: 'metres', 'landmiles', 'nauticalmiles'
    measureControlTitleOn: 'Activer Mesure',   // Title for the control going to be switched on
    measureControlTitleOff: 'Desactiver Mesure', // Title for the control going to be switched off
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

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "topright",
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


//Create the opacity controls
    var higherOpacity = new L.Control.higherOpacity();
    map.addControl(higherOpacity);
    var lowerOpacity = new L.Control.lowerOpacity();
    map.addControl(lowerOpacity);
    var opacitySlider = new L.Control.opacitySlider();
    map.addControl(opacitySlider);

//Specify the layer for which you want to modify the opacity. Note that the setOpacityLayer() method applies to all the controls.
//You only need to call it once. 
    opacitySlider.setOpacityLayer(region);

//Set initial opacity to 0.5 (Optional)
    region.setOpacity(0.5);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": cartoLight,
  "Orthophotography": usgsImagery,
  "Fond": fond , 
};

var groupedOverlays = {
  "Points d'interet": {
    "<img src='bootleaf/icone1.png' width='24' height='24'>&nbsp;Point de vente": pdvLayer,

  },
  "Reference": {
  "Region": region, 
  "Nbre par Region": regionRN1,
  "Nbre par District" :districtRN1,
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
  /* Fit map to boroughs bounds */
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});


  var pdvBH = new Bloodhound({
    name: "pdv",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: pdvSearch,
    limit: 10
  });

  var hostoBH = new Bloodhound({
    name: "Hopital",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: hostoSearch,
    limit: 10
  });
  
    var pharmaBH = new Bloodhound({
    name: "Pharmacie",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: pharmaSearch,
    limit: 10
  });

      var pgenBH = new Bloodhound({
    name: "Gendarmerie",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: genSearch,
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
  pdvBH.initialize();
  hostoBH.initialize();
  pharmaBH.initialize();
  genBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "pdv",
    displayKey: "name",
    source: pdvBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Hopital",
    displayKey: "name",
    source: hostoBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/museum.png' width='24' height='28'>&nbsp;Hopital</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Pharmacie",
    displayKey: "name",
    source: pharmaBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/museum.png' width='24' height='28'>&nbsp;Pharmacie</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Gendarmerie",
    displayKey: "name",
    source: genBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='leaflet/gen.png' width='24' height='28'>&nbsp;Gendarmerie</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{nom}}</small>"].join(""))
    }
  },{
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(pdvLayer)) {
        map.addLayer(pdvLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Hopital") {
      if (!map.hasLayer(hostoLayer)) {
        map.addLayer(hostoLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Pharmacie") {
      if (!map.hasLayer(pharmaLayer)) {
        map.addLayer(pharmaLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
     if (datum.source === "Gendarmerie") {
      if (!map.hasLayer(genLayer)) {
        map.addLayer(genLayer);
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
		