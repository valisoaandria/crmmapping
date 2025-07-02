    //Create the map
      var region = L.tileLayer.wms('http://localhost:8080/geoserver/RN1/wms', {
				attribution: '(C) OMA 2017',
				layers: 'RN1:Region_wgs84',
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
}).addTo(map);
       
       
        var map = new L.map('map', {
           zoom: 6,
			center: [-18.90955, 47.52752],
            layers: [region],
            zoomControl: false
        });
        
        var zoomHome = L.Control.zoomHome({position: 'topleft'}).addTo(map);
		
		var zoomBox =L.Control.boxzoom({ position:'topleft' }).addTo(map);
        
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