function onEachFeature(feature, layer) {
				var popupContent = "Point de  Vente: </p>";

				if (feature.properties && feature.properties.nom && feature.properties.adresse) {
					popupContent += feature.properties.nom += feature.properties.adresse; 
				}

				layer.bindPopup(popupContent);
			}
			function onEachFeature1(feature, layer) {
				var popupContent = "Region: </p>";

				if (feature.properties && feature.properties.Region) {
					popupContent += feature.properties.Region; 
				}

				layer.bindPopup(popupContent);
			}
			 var map = L.map('map');
			 
			var region = L.tileLayer.wms('http://localhost:8080/geoserver/TP/wms', {
				attribution: '(C) OMA 2017',
				layers: 'TP:Region_WGS84',
				format: 'image/png',
				transparent: true,
			   maxZoom: 20
			 }).addTo(map); 

			   var orthotana = L.tileLayer.wms('http://localhost:8080/geoserver/TP/wms', {
				attribution: '(C) OMA 2017',
				layers: 'TP:ortho',
				format: 'image/png',
				transparent: true,
				maxZoom: 20
			 }).addTo(map);
			 
					 
			 var route = L.tileLayer.wms('http://localhost:8080/geoserver/TP/wms', {
				attribution: '(C) OMA 2017',
				layers: 'TP:route_mada',
				format: 'image/png',
				transparent: true,
				maxZoom: 20
			 }).addTo(map);
			 
			  var district = L.tileLayer.wms('http://localhost:8080/geoserver/RN1/wms', {
				attribution: '(C) OMA 2017',
				layers: 'RN1:hopital',
				format: 'image/png',
				transparent: true,
				maxZoom: 20,
				 }).addTo(map);
			//var region = L.geoJson(region_mada,
					//{
					//	onEachFeature: onEachFeature1
					//}
			 //).addTo(map);
			
			var pdv = L.geoJson(pdv_tana,
					{
						onEachFeature: onEachFeature
					}
			 );
					 
			 map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
			 
			var baseLayers = {
				"fond":region	 
			 };
			 
			   var overlays = {
			   "region" : region,
			   "orthotana" : orthotana,
			  "route" : route,
			  "district" : district,
				"pdv" : pdv
			 };
			 
			 L.control.layers(baseLayers, overlays, {
				 position: 'topright',
				 collapsed:false,
				 autoZIndex:true
			 }).addTo(map);
			 L.control.scale().addTo(map);
					
					
			 var centretana = new L.LatLng(-18.90955, 47.52752);
			 map.setView(centretana, 5);
		  