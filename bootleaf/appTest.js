var center = [40, 0];

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

        var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });

        var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });
        /* Overlay Layers */
        var highlight = L.geoJson(null);
        var highlightStyle = {
          stroke: false,
          fillColor: "#00FFFF",
          fillOpacity: 0.7,
          radius: 10
        };

        var region = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
        attribution: '(C) CRM 2023',
        layers: 'crm:fkt_majunga',
        format: 'image/png',
        transparent: true,
        maxZoom: 20,
        opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.fokontany;

          }
        });

        var andavamamba_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:limite_fkt_tana',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.fokontany;

          }
        });



        var fokontanyCible = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:fokontany_cible',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.fokontany;

          }
        });

        var sect_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:secteurs_tana',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.id;

          }
        });

        var inondation_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:inondation_anjezika',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.id;

          }
        });

        var incendie_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:incendie_anjezika',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.id;

          }
        });

        var epidemie_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:epidemie_anjezika',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.id;

          }
        });

        var ruelle_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:ruelle_anjezika',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.fid;

          }
        });

        var ocsol_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:ocsol_anjezika',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.fid;

          }
        });

        var batiment_anjezika = L.tileLayer.wms('http://192.168.1.82:8080/geoserver/crm/wms', {
                attribution: '(C) CRM 2023',
                layers: 'crm:batiment_anjezika',
                format: 'image/png',
                transparent: true,
                maxZoom: 20,
                opacity: 1, 
          onEachFeature: function (feature, layer) {
            return layer.feature.properties.fid;

          }
        });

        var map = L.map('map', {
            layers: [googleSat],
            center: [-18.91520,47.50616],
            zoom: 17
        });

        var baseTree = [
            {
                label: 'OpenStreeMap',
                layer: cartoLight,
                children: [
                    {label: 'B&W', layer: googleSat, name: 'OpenStreeMap <b>B&W</b>'},
                    {label: 'OpenTopoMap', layer: googleStreets, name: 'Topographic - OSM'},
                ]
            },
        ];

        var granada = L.marker([37.133, -3.636]);
        var malaga = L.marker([36.674, -4.499]);
        var sevilla = L.marker([37.418, -5.893]);

        malaga.addTo(map);
        granada.addTo(map);
        sevilla.addTo(map);

        var overlaysTree = {
            label: 'Some cities',
            selectAllCheckbox: 'Un/select all',
            children: [
                {label: '<div id="onlysel">-Show only selected-</div>'},
                {label: 'France', children: [
                    {label: 'Lyon', layer: epidemie_anjezika},
                    {label: 'Paris', layer: sect_anjezika},
                    {label: 'Toulouse', layer: ocsol_anjezika},
                ]},
                {label: 'Germany', selectAllCheckbox: true, children: [
                    {label: 'Berlin', layer: L.marker([52.559, 13.287])},
                    {label: 'Cologne', layer: L.marker([50.866, 7.143])},
                    {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
                    {label: 'Munich', layer: L.marker([48.354, 11.786])},
                ]},
                {label: 'Spain',
                    selectAllCheckbox: 'De/seleccionar todo',
                    children: [
                        {label: 'Madrid', layer: L.marker([40.472, -3.561])},
                        {label: 'Andalucia', selectAllCheckbox: true, children: [
                            {label: 'Granada', layer: granada},
                            {label: 'Málaga', layer: malaga},
                            {label: 'Sevilla', layer: sevilla},
                        ]},
                        {label: 'Bask Country', children: [
                            {label: '---', layer: L.layerGroup([]), radioGroup: 'bc'},
                            {label: 'Bilbao', layer: L.marker([43.301, -2.911]), radioGroup: 'bc'},
                            {label: 'San Sebastian', layer: L.marker([43.356, -1.791]), radioGroup: 'bc'},
                            {label: 'Vitoria', layer: L.marker([42.883, -2.724]), radioGroup: 'bc'},
                        ]},
                        {label: 'Catalonia', children: [
                            {label: 'Barcelona', layer: L.marker([41.297, 2.078])},
                            {label: 'Gerona', layer: L.marker([41.901, 2.760])},
                        ]},
                    ],
                },
            ]
        }

        var lay = L.control.layers.tree(baseTree, overlaysTree,
            {
                namedToggle: true,
                selectorBack: false,
                closedSymbol: '&#8862; &#x1f5c0;',
                openedSymbol: '&#8863; &#x1f5c1;',
                collapseAll: 'Collapse all',
                expandAll: 'Expand all',
                collapsed: false,
            });


        lay.addTo(map).collapseTree().expandSelected().collapseTree(true);
        L.DomEvent.on(L.DomUtil.get('onlysel'), 'click', function() {
            lay.collapseTree(true).expandSelected(true);
        });