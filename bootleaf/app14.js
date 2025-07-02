    var map = L.map('map').setView([-18.90955, 47.52752], 7);
       
    var owsrootUrl = 'http://localhost:8080/geoserver/ows';
 
    var defaultParameters = {
      service: 'WFS',
      version: '1.0.0',
            request: 'GetFeature',
      typeName: ' cecam:caisse_cecam',
      outputFormat: 'application/json',
 
    };
    var parameters = L.Util.extend(defaultParameters);
 
    var URL = owsrootUrl + L.Util.getParamString(parameters);
      
    $.ajax({
      url: URL,
      success: function (data) {
        var geojson = new L.geoJson(data, {
          style: {"color":"#2ECCFA","weight":2},
          onEachFeature: function(feature, layer){
            layer.bindPopup("Has hecho click en " + feature.properties.caisse);
          }}
        ).addTo(map);
      }
    });