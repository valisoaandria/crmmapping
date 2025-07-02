$('#toolbar .hamburger').on('click', function() {
  $(this).parent().toggleClass('open');
});

var mymap = L.map('leafletmap', {
  zoomControl: false
});
var mapTiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

mapTiles.addTo(mymap);
mymap.setView([38.8486555, -104.824], 17);
new L.Control.Zoom({
  position: 'topright'
}).addTo(mymap);

var buildingLayers = L.layerGroup().addTo(mymap);

L.geoJson(bldgData, {
  onEachFeature: function(feature, layer) {
    var thisLayer = layer;
    // layer.bindPopup(feature.properties.NAME);
    var $listItem = $('<li>').html(feature.properties.NAME).appendTo('#toolbar ul');
    $listItem.on('click', function(){
      buildingLayers.clearLayers(); // remove existing markers
      var thisLat = thisLayer.feature.geometry.coordinates[1];
      var thisLon = thisLayer.feature.geometry.coordinates[0];
      mymap.panTo([thisLat,thisLon]);
      //thisLayer.addTo(mymap);
      buildingLayers.addLayer(thisLayer);
      var notifyIcon = L.divIcon({
        className: 'notify-icon',
        iconSize: [25, 25],
        html: '<span></span>'
	    });
      var notifyMarker = L.marker([thisLat,thisLon], {icon: notifyIcon});
      buildingLayers.addLayer(notifyMarker);
      
      if(mymap.getSize().x < 768){
        $('#toolbar').removeClass('open');
      }
      thisLayer.on('click', function(){alert(thisLayer.feature.properties.NAME + " :: " + thisLayer.feature.properties.BODY);});
    });
  }
});




/*
var gjFeatures = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "1234",
      "properties": {
        "name": "Sonderman Park",
        "img": "",
        "desc":"An oasis of wilderness within the city limits of Colorado Springs, Sondermann Park provides an outstanding opportunity for wildlife viewing or just a refreshing walk along a small creek located on Colorado Springs’ west side. This park is a great place to look for foothills breeding birds. Trails access good foothills scrub and some riparian growth, with species such as Lazuli Bunting, Black-chinned Hummingbird, Black-headed Grosbeak, and others. Directions: Take I-25 to Fontanero Street (exit 144) and head west. Take your first right, which is Chestnut Street. Then watch for a small sign on the left for the entrance. This should be Caramillo Street.", 
        "markerType": "",
        "weight": ""
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -104.840011,
          38.856837
        ]
      }
    },
  {
      "type": "Feature",
      "id": "1234",
      "properties": {
        "name": "Williams Canyon",
        "img": "",
        "desc":"*CURRENTLY CLOSED DUE TO FLOODING* a 3.1 mile trail just north of Manitou Springs, Williams Canyon perfect for hikers looking to briefly escape urban life. The large limestone walls of Williams Canyon provide a shady environment that eventually transitions into the larger Waldo Canyon area. The Williams Canyon limestone formation was formed around 315 million years ago, and is considered a significant geological feature of the area. Park in downtown Manitou Springs, and take Canyon Avenue North to the trailhead.", 
        "markerType": "",
        "weight": ""
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -104.917262,
          38.860395
        ]
      }
    }
  
  ]};
var myStyle2 = {
    "color": "#f00",
    "weight": 4,
    "opacity": 0.85,
  	"lineCap": "round"
};
*/