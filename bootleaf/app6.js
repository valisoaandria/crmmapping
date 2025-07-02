Ext.BLANK_IMAGE_URL = "ext/resources/images/default/s.gif";
		var app, items = [], controls = [];
		Ext.onReady(function() {
			app = new Ext.Viewport({
			layout: "border",
			items: items
		});
		});

		items.push({
			xtype: "gx_mappanel",
			ref: "mapPanel",
			region: "center",
			map: {
				numZoomLevels: 19,
				controls: controls
				// projection: "EPSG:29702"
			},
			extent: OpenLayers.Bounds.fromArray([
				47.51326577312483, -18.919642639586357,
                47.54540452355454, -18.89782355360929
			]),
			
			layers: [new OpenLayers.Layer.WMS(
				"Orthophotographie",
				"http://localhost:8080/geoserver/TP/wms",
				{layers: "TP:ortho"},
				{isBaseLayer: true}
			)]
			});

			controls.push(
				new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.PanPanel(),
				new OpenLayers.Control.ZoomPanel()
			);
			
			items.push({
				xtype: "grid",
				ref: "capsGrid",
				title: "Available Layers",
				region: "north",
				height: 140,
				viewConfig: {forceFit: true},
				store: new GeoExt.data.WMSCapabilitiesStore({
					url:
					"/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.1.1",
					autoLoad: true
				}),
				columns: [
					{header: "Name", dataIndex: "name", sortable: true},
					{header: "Title", dataIndex: "title", sortable: true},
					{header: "Abstract", dataIndex: "abstract"}
				],
				bbar: [{
					text: "Ajouter sur la carte",
					handler: function() {
						app.capsGrid.getSelectionModel().each(function(record) {
						var clone = record.clone();
						clone.getLayer().mergeNewParams({
							format: "image/png",
							transparent: true
						});
						app.mapPanel.layers.add(clone);
						app.mapPanel.map.zoomToExtent(
							OpenLayers.Bounds.fromArray(clone.get("llbbox"))
						);
					});
				}
			}]
	});
	
	items.push({
		xtype: "treepanel",
		ref: "tree",
		region: "west",
		width: 200,
		autoScroll: true,
		enableDD: true,
		root: new GeoExt.tree.LayerContainer({
			expanded: true
		}),
		bbar: [{
			text: "Enlever de la carte",
			handler: function() {
				var node = app.tree.getSelectionModel().getSelectedNode();
				if (node && node.layer instanceof OpenLayers.Layer.WMS) {
					app.mapPanel.map.removeLayer(node.layer);
				}
			}
		}]
	});
	
	items.push({
		xtype: "gx_legendpanel",
		region: "east",
		width: 200,
		autoScroll: true,
		padding: 5
	});
	