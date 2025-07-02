var map, featureList, pdvSearch = [], hostoSearch = [], pharmaSearch = [], genSearch = [] ;

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
  group.eachLayer(function (layer) {
    if (map.hasLayer(geojsonlayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="bootleaf/icone.png"></td><td class="feature-name">' + layer.feature.properties.caisse + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
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
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

// initialize the map
 var map = L.map("map", {
  zoom: 7,
  center: [-18.90955, 47.52752],
  zoomControl: false
});

/* Basemap Layers */
var cartoLight = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var fond = L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  maxZoom: 20, 
  attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
});

var usgsImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: false
}).addTo(map);


var rootUrl = 'http://localhost:8080/geoserver/ows';

var defaultParameters = {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: 'cecam:caisse_cecam',
    maxFeatures: 500,
    outputFormat: 'text/javascript'
   , format_options: 'callback: getJson',
    srsName:'EPSG:4326'

};

var parameters = L.Util.extend(defaultParameters);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
    jsonp : false,
    url: rootUrl + L.Util.getParamString(parameters),
    dataType: 'jsonp',
   jsonpCallback: 'getJson',
    success: handleJson
});

var group = new L.featureGroup().addTo(map);
var geojsonlayer;
function handleJson(data) {
//    console.log(data);
    geojsonlayer=L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "bootleaf/icone.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
     var popupContent = " <img src='img/"+feature.properties.image+".jpg' width='250' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " Province : " + feature.properties.province+ "</p>" + " Région : " + feature.properties.region+ "</p>" + " District : " + feature.properties.district+ "</p>" + " COURANT : " + feature.properties.courant+ "</p>" ; 
      /*
      if (feature.properties && feature.properties.CAISSE) {
         var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

      }
      */
      layer.bindPopup(popupContent);
  }
}).addTo(group);
  map.fitBounds(group.getBounds());
}


function getJson(data) {
console.log("callback function fired");
}

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

      if (feature.properties && feature.properties.nom ) 
    {    popupContent += feature.properties.nom + "</p>" + "Adresse : " + feature.properties.adresse + "</p>" + " Horaires : " + feature.properties.Horaires+ "</p>" + " Contact : " + feature.properties.Contact+ "</p>" +"Region :"+ feature.properties.region + "</p>";

      }

      layer.bindPopup(popupContent);
  }
  });
$.getJSON("leaflet/hosto.geojson", function (data) {
  hosto.addData(data);
  map.addLayer(hostoLayer);
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
  map.addLayer(pharmaLayer);
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
  map.addLayer(genLayer);
});


/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Orthophotography": usgsImagery,
  "Fond": fond , 
  "Street Map": cartoLight,
};

var groupedOverlays = {
  "Points d'interet": {
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;Caisse": group,
    "<img src='bootleaf/ho.png' width='24' height='24'>&nbsp;Hopital": hostoLayer,
  "<img src='bootleaf/frm.jpg' width='24' height='24'>&nbsp;Pharmacie": pharmaLayer,
  "<img src='bootleaf/gen.png' width='24' height='24'>&nbsp;Gendarmerie": genLayer,
  },
  "Reference": {
  /*"Region": region, 
  "Region RN1": region_rn1,
  "District" : district,
  "Commune" : commune,
  "Route" : route,
  "Route RN1" :route_rn1,*/
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

var zoomHome = L.Control.zoomHome({position: 'topright'}).addTo(map);

var boxZoom = L.Control.boxzoom({ position:'topright' }).addTo(map);


/* Globe */
var miniMap = new L.Control.GlobeMiniMap({     
  land:'#ffff8c',
  water:'#3333FF',
  marker:'#000000',
  topojsonSrc: 'leaflet-globeminimap-master/src/world.json'
}).addTo(map);




