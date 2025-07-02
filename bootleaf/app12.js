Ext.BLANK_IMAGE_URL = "extjs-3.3.1-src/resources/images/default/s.gif";
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
				"District Mada",
				"http://localhost:8080/geoserver/RN1/wms",
				{layers: "RN1:district_WGS84"},
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
				title: "Couches disponibles",
				region: "east",
				width: 250,
				autoScroll: true,
				padding: 5,
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
	
	
	controls.push(new OpenLayers.Control.WMSGetFeatureInfo({
		autoActivate: true,
		infoFormat: "application/vnd.ogc.gml",
		maxFeatures: 3,
		eventListeners: {
			"getfeatureinfo": function(e) {
				var items = [];
				Ext.each(e.features, function(feature) {
					items.push({
						xtype: "propertygrid",
						title: feature.fid,
						source: feature.attributes
					});
				});
		new GeoExt.Popup({
				title: "Feature Info",
				width: 200,
				height: 200,
				layout: "accordion",
				map: app.mapPanel,
				location: e.xy,
				items: items
			}).show();
		}
	}
}));

	var vectorLayer = new OpenLayers.Layer.Vector("Vector features");
	items.push({
			xtype: "grid",
			ref: "featureGrid",
			title: "Feature Table",
			region: "south",
			height: 150,
			sm: new GeoExt.grid.FeatureSelectionModel(),
				store: new Ext.data.Store(),
			columns: []
	});
	
	var read = OpenLayers.Format.WFSDescribeFeatureType.prototype.read;
	OpenLayers.Format.WFSDescribeFeatureType.prototype.read = function() {
			rawAttributeData = read.apply(this, arguments);
			return rawAttributeData;
		};
	
	var rawAttributeData, selectedLayer;
	function setLayer(model, node) {
			if(!(node && node.layer instanceof OpenLayers.Layer.WMS)) {
				return;
			}
			selectedLayer = null;
			vectorLayer.removeAllFeatures();
			app.featureGrid.reconfigure(
				new Ext.data.Store(),
				new Ext.grid.ColumnModel([])
			);
			var layer = node.layer;
			var url = layer.url.split("?")[0];
			var schema = new GeoExt.data.AttributeStore({
					url: url,
					baseParams: {
						"SERVICE": "WFS",
						"REQUEST": "DescribeFeatureType",
						"VERSION": "1.1.0",
						"TYPENAME": layer.params.LAYERS
				},
			autoLoad: true,
			listeners: {
					"load": function(store) {
							app.featureGrid.setTitle(layer.name);
							selectedLayer = layer;
							configureGrid(store, url);
						}
				}
			});
		}
	
	function configureGrid(store, url) {
			var fields = [], columns = [], geometryName, geometryType;
			var geomRegex = /gml:(Multi)?(Point|Line|Polygon|Surface|Geometry).*/;
			var types = {
					"xsd:int": "int",
					"xsd:short": "int",
					"xsd:long": "int",
					"xsd:string": "string",
					"xsd:dateTime": "string",
					"xsd:double": "float",
					"xsd:decimal": "float",
					"Line": "Path",
					"Surface": "Polygon"
				};
			store.each(function(rec) {
					var type = rec.get("type");
					var name = rec.get("name");
					var match = geomRegex.exec(type);
					if (match) {
							geometryName = name;
							geometryType = match[2] == "Line" ? "Path" : match[2];
					} else {
							fields.push({
								name: name,
								type: types[type]
							});
			columns.push({
					xtype: types[type] == "string" ?
					"gridcolumn" :
					"numbercolumn",
					dataIndex: name,
					header: name
				});
			}
		});
		app.featureGrid.reconfigure(new GeoExt.data.FeatureStore({
		autoLoad: true,
		proxy: new GeoExt.data.ProtocolProxy({
		protocol: new OpenLayers.Protocol.WFS({
				url: url,	
				version: "1.1.0",
				featureType: rawAttributeData.featureTypes[0].typeName,
				featureNS: rawAttributeData.targetNamespace,
				srsName: "EPSG:4326",
				geometryName: geometryName,
				maxFeatures: 250,
			})
		}),
		fields: fields 
	}), new Ext.grid.ColumnModel(columns));
		app.featureGrid.store.bind(vectorLayer);
		app.featureGrid.getSelectionModel().bind(vectorLayer);
	}
	
	Ext.onReady(function() {
			app.mapPanel.map.addLayer(vectorLayer);
			app.tree.getSelectionModel().on(
					"selectionchange", setLayer
				);
		});