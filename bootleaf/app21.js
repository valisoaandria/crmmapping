var map = new L.Map('map', {center: new L.LatLng(-18.90955, 47.52752), zoom: 7});
  var googleLayer = new L.Google('ROADMAP');      
  map.addLayer(googleLayer);

function BoundingBox(){
var bounds = map.getBounds().getSouthWest().lng + "," +map.getBounds().getSouthWest().lat + "," + map.getBounds().getNorthEast().lng + "," + map.getBounds().getNorthEast().lat;
return bounds;
}
var geoJsonUrl ="http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cecam:caisse_cecam&maxFeatures=50&outputFormat=text/javascript&format_options=callback:loadGeoJson"; 

var geojsonLayerWells = new L.GeoJSON();

function loadGeoJson(data) {
console.log(data);
geojsonLayerWells.addData(data);
};

$.ajax({ 
    url: geoJsonUrl, 
    dataType : 'jsonp',
    success: loadGeoJson
    });


map.on('moveend', function(){

    if(map.getZoom() >= 18){

        map.removeLayer(geojsonLayerWells);

        }
    if(map.getZoom() < 18){
        map.addLayer(geojsonLayerWells);
        }
        console.log(map.getZoom());
        console.log(BoundingBox());
    });