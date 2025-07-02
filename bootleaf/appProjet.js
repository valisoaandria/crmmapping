var map, featureList, pdvSearch = [];

$(window).resize(function () {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function (e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if (!("ontouchstart" in window)) {
  $(document).on("mouseover", ".feature-row", function (e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function () {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#legend-btn").click(function () {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function () {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function () {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function () {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function () {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function () {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function () {
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

  if (layer) {
    if (layer instanceof L.Marker) {
      // Si c'est un marqueur (point)
      map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
      layer.fire("click");
    } else if (layer instanceof L.Polygon) {
      // Si c'est un polygone
      map.fitBounds(layer.getBounds());
      layer.fire("click");
    }

    /* Masque la barre latérale et ajuste la taille de la carte sur les petits écrans */
    if (document.body.clientWidth <= 767) {
      $("#sidebar").hide();
      map.invalidateSize();
    }
  } else {
    console.log("No corresponding layer found in markerClusters for ID:", id);
  }
}


function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();

  // LIMITE FOKONTANY
  /*
    anjezika.eachLayer(function (layer) {
    if (map.hasLayer(anjezikaLayer)) {
        if (map.getBounds().contains(layer.getLatLng())) {
          $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:11px;"><i class="fas fa-store-alt" style="font-size:10px;color:red"></i>' + layer.feature.properties.fokontany + '</strong></br></td></tr>');
        }
      }
    });
  */
  // BALISES

  balises.eachLayer(function (layer) {
    if (map.hasLayer(balisesLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#0f3c93;font-size:11px;"><i class="fas fa-store-alt" style="font-size:10px;color:#0f3c93"></i> ' + layer.feature.properties.name + '</strong></br><i class="fa fa-key" style="font-size:10px;color:red"></i><strong style="color: red;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> ' + layer.feature.properties.tags + '</strong></br><strong style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fas fa-home" style="font-size:12x;color:red"></i> Accuracy ' + layer.feature.properties.accuracy + '</strong></br><strong style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i> Provider ' + layer.feature.properties.provider + '</strong></br></td></tr>');
      }
    }
  });

  // Fokontany

  // Créer un tableau pour stocker les layers et leurs informations
  var fokontanyLayers = [];

  fokontanyCible.eachLayer(function (layer) {
    if (map.hasLayer(fokontanyCibleLayer)) {
      if (map.getBounds().intersects(layer.getBounds())) {
        // Ajouter le layer à la carte
        map.addLayer(layer);

        // Ajouter le layer et ses informations au tableau
        fokontanyLayers.push({
          layer: layer,
          id: L.stamp(layer),
          fokontany: layer.feature.properties.fokontany
        });

        // Ajouter une entrée dans la liste
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '"><td style="vertical-align: middle;"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#0f3c93;font-size:11px;"><i class="fas fa-store-alt" style="font-size:10px;color:#0f3c93"></i> ' + layer.feature.properties.fokontany + '</strong></tr>');
      }
    }
  });

  // Ajouter un événement click pour chaque élément de la liste
  $("#feature-list tbody").on('click', '.feature-row', function () {
    var rowId = $(this).attr('id'); // Récupère l'ID de la ligne
    var selectedLayer = fokontanyLayers.find(layerInfo => layerInfo.id === rowId); // Trouve le layer correspondant

    // Centrer et zoomer sur le polygone correspondant
    if (selectedLayer) {
      map.flyToBounds(selectedLayer.layer.getBounds());
    }
  });



  // VAKINANKARATRA
  vak.eachLayer(function (layer) {

    if (map.hasLayer(vakLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.fokontany + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  Fokontany  ' + layer.feature.properties.fokontany + type + ' </strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Chef Fkt ' + layer.feature.properties.coordonnee_chef_fkt + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> Surface Fokontany  ' + layer.feature.properties.surface_fkt + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i> Nombre Secteur ' + layer.feature.properties.nombre_secteur + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i> Vice President fokontany  ' + layer.feature.properties.coordonnee_vice_fkt + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });


  // DRAPEAUX
  cso.eachLayer(function (layer) {

    if (map.hasLayer(csoLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="50" height="50" src="img/' + layer.feature.properties.image + '"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:11px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>' + layer.feature.properties.name + '</strong></br> <i class="fa fa-key" style="font-size:10px;color:red"></i><strong  style="color: red;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> ' + layer.feature.properties.tags + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> Accuracy  ' + layer.feature.properties.accuracy + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i> Provider ' + layer.feature.properties.provider + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.accuracy + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // CSE
  cse.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }

    if (map.hasLayer(cseLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + ' </strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });


  // SOFIA
  sof.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }

    if (map.hasLayer(sofLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // MENABE
  men.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }

    if (map.hasLayer(menLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // IVM
  ivm.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(ivmLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // ITASY
  ita.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(itaLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // BOENY
  boe.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(boeLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // BON
  bon.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(bonLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // ANL
  anl.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(anlLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // AMI
  ami.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(amiLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // AMM
  amm.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(ammLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });



  // ALA FO
  alaotraFO.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(alaotraFOLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // ANJ
  anj.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(anjLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  /* CAISSE */
  pdv.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(pdvLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  /* CAISSE FRONT OFFICE*/
  fo.eachLayer(function (layer) {
    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:12px;align:center;" > (FO) </strong>';

    } else {

      type = '';
    }
    if (map.hasLayer(foLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + type + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });


  /* FIN CAISSE FRONT OFFICE */


  urcecam.eachLayer(function (layer) {
    if (map.hasLayer(urcecamLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" >' + layer.feature.properties.denomination + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.boitepostale + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  Nombre Caisse : ' + layer.feature.properties.nombrecaisse + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  unicecam.eachLayer(function (layer) {
    if (map.hasLayer(unicecamLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" >' + layer.feature.properties.denomination + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.boitepostale + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-envelope" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.mail + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
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

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};


/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 1
});


// #VAKINANKARATRA#

var rootUrl_vak = 'http://localhost:8080/geoserver/crm/ows';

var defaultParameters_vak = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'crm:donnees_majunga',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonVak',
  srsName: 'EPSG:4326'

};

var parameters_vak = L.Util.extend(defaultParameters_vak);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_vak + L.Util.getParamString(parameters_vak),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonVak',
  success: handleJsonVak
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var vakLayer = L.geoJson(null);
var vak = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/icone_mlai.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var test = parseInt(layer.feature.properties.retard);

    var type = layer.feature.properties.typecaisse;

    if (layer.feature.properties.typecaisse == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.fokontany + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.fokontany + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  FOKONTANY  ' + layer.feature.properties.fokontany + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i>Chef FKT ' + layer.feature.properties.coordonnee_chef_fkt + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> Surface  ' + layer.feature.properties.surface_fkt + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRC : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.commune + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i> Nombre secteur  ' + layer.feature.properties.nombre_secteur + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Enquete du  ' + layer.feature.properties.daty + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Total personnes enquêtées  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.total_personnes + '</strong> </br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.epargne).toLocaleString("en-US") + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.credit).toLocaleString("en-US") + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + test.toLocaleString("en-US") + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.fokontany, { noHide: true });

  }
});

function handleJsonVak(data) {
  //    console.log(data);
  vak.addData(data);
  //map.addLayer(vakLayer);
}


function getJsonVak(data) {
  console.log("callback function fired");
}

//FIN VAKINANKARATRA



// #CSO#

var rootUrl_cso = 'http://localhost:8080/geoserver/crm/ows';

var defaultParameters_cso = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'crm:drapeaux',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonCso',
  srsName: 'EPSG:4326'

};

var parameters_cso = L.Util.extend(defaultParameters_cso);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_cso + L.Util.getParamString(parameters_cso),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonCso',
  success: handleJsonCso
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var csoLayer = L.geoJson(null);

/*
csoLayer.once('add', function() {
    console.log("Les données CSO ont été ajoutées à la carte !");
    // Vous pouvez ajouter ici d'autres actions à effectuer lorsque les données sont chargées pour la première fois.
});
*/

var cso = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "img/drapeau-rouge.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    var type = layer.feature.properties.typecaisse;

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '" target="_blank"><img src="img/' + layer.feature.properties.image + '" alt="image" width="250px" height="150px"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > ' + layer.feature.properties.name + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.image + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.name, { noHide: true });

  }
});

function handleJsonCso(data) {
  //    console.log(data);
  cso.addData(data);
  //csoLayer.addLayer(cso);
  //map.addLayer(pdvLayer);
}


function getJsonCso(data) {
  console.log("callback function fired");
}

//FIN CSO



// #CSE#

var rootUrl_cse = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_cse = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:cse',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonCse',
  srsName: 'EPSG:4326'

};

var parameters_cse = L.Util.extend(defaultParameters_cse);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_cse + L.Util.getParamString(parameters_cse),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonCse',
  success: handleJsonCse
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var cseLayer = L.geoJson(null);
var popupContent; // Déclarer la variable en dehors de la fonction

var cse = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        popupAnchor: [0, -25]
      }),
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    // Affecter la valeur à la variable sans "var"
    popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br> <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>   ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
  }
});


function handleJsonCse(data) {
  //    console.log(data);
  cse.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonCse(data) {
  console.log("callback function fired");
}

//FIN CSE



// #SOFIA#

var rootUrl_sof = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_sof = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Sofia',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonSof',
  srsName: 'EPSG:4326'

};

var parameters_sof = L.Util.extend(defaultParameters_sof);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_sof + L.Util.getParamString(parameters_sof),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonSof',
  success: handleJsonSof
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var sofLayer = L.geoJson(null);
var sof = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });

  }
});

function handleJsonSof(data) {
  //    console.log(data);
  sof.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonSof(data) {
  console.log("callback function fired");
}

//FIN SOFIA

// #IVM#

var rootUrl_ivm = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_ivm = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:ivm',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonIvm',
  srsName: 'EPSG:4326'

};

var parameters_ivm = L.Util.extend(defaultParameters_ivm);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_ivm + L.Util.getParamString(parameters_ivm),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonIvm',
  success: handleJsonIvm
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var ivmLayer = L.geoJson(null);
var ivm = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonIvm(data) {
  //    console.log(data);
  ivm.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonIvm(data) {
  console.log("callback function fired");
}

// FIN IVM

// #MEN#

var rootUrl_men = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_men = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Menabe',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonMen',
  srsName: 'EPSG:4326'

};

var parameters_men = L.Util.extend(defaultParameters_men);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_men + L.Util.getParamString(parameters_men),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonMen',
  success: handleJsonMen
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var menLayer = L.geoJson(null);
var men = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonMen(data) {
  //    console.log(data);
  men.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonMen(data) {
  console.log("callback function fired");
}

// FIN MEN

// #ALA#

var rootUrl_balises = 'http://localhost:8080/geoserver/crm/ows';

var defaultParameters_balises = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'crm:balises',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonBalises',
  srsName: 'EPSG:4326'

};

var parameters_balises = L.Util.extend(defaultParameters_balises);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_balises + L.Util.getParamString(parameters_balises),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonBalises',
  success: handleJsonBalises
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
/*
var balisesLayer = L.geoJson(null);
var balises = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "img/mapmarker_106655.png",
        iconSize: [16, 18],
        //iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    
  var type = layer.feature.properties.typecaisse ;
	
  if ( type== 'FO') {
      // Utiliser directement la variable sans la redéclarer
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';
  	
    }else{
  	
    type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
  }
	
  var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/'+layer.feature.properties.image+'" target="_blank"><img src="img/'+layer.feature.properties.image+'" alt="image" width="250px" height="150px"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > ' + layer.feature.properties.name + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.image + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en '  + layer.feature.properties.unite +  ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    
      layer.bindPopup(popupContent);
      layer.bindLabel(feature.properties.name, {noHide: true});
      //layer.bindLabel('Default centered polygon label');
  }
});
*/

var balisesLayer = L.geoJson(null);
var alaInfoDiv = document.getElementById('alaInfo');
var isInfoVisible = false;

var balises = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    var type = feature.properties.typecaisse;
    //var iconUrl = (type === 'FO') ? "img/mapmarker_green.png" : "img/mapmarker_red.png";

    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "img/mapmarker_106655.png",
        iconSize: [28, 30],
        popupAnchor: [0, -25]
      }),
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    layer.on('click', function (e) {
      var type = feature.properties.typecaisse;

      if (type == 'FO') {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';
      } else {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
      }

      var description = feature.properties.descriptio;

      if (description == null) {
        description = '';

      } else {
        description = '<strong style="font-family: Roboto, Arial, sans-serif;color:#70757A;font-size:14px;align:center;" >' + feature.properties.descriptio + '</strong>';
      }
      /*
      var content = '<div class="feature-info">' +
          '<h3>' + feature.properties.name + '</h3>' +
          '<p><i class="fas fa-store-alt" style="font-size:12px;color:red"></i> ' + type + '</p>' +
          '<p><strong><i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse:</strong> ' + feature.properties.codecaisse + '</p>' +
          '<p><strong><i class="fas fa-home" style="font-size:12px;color:red"></i> URCECAM:</strong> ' + feature.properties.urcecam + '</p>' +
          // ... Ajoutez d'autres propriétés ici
          '</div>';
      */
      var content = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '" target="_blank"><img src="img/' + layer.feature.properties.image + '" alt="image" width="250px" height="150px"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > ' + layer.feature.properties.name + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + description + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.image + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
      alaInfoDiv.innerHTML = content;
    });
    layer.bindLabel(feature.properties.name, { noHide: true });
  }
});

function handleJsonBalises(data) {
  //    console.log(data);
  balises.addData(data);
  //map.addLayer(balisesLayer);
}


function getJsonBalises(data) {
  console.log("callback function fired");
}

// FIN Alaotra


// DEBUT

/* Empty layer placeholder to add to layer control for listening when to add/remove hosto to markerClusters layer */
var balisesLayer = L.geoJson(null);
var balises = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/hos.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    layer.on('click', function (e) {
      var type = feature.properties.typecaisse;

      if (type == 'FO') {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';
      } else {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
      }

      var description = feature.properties.descriptio;

      if (description == null) {
        description = '';

      } else {
        description = '<strong style="font-family: Roboto, Arial, sans-serif;color:#70757A;font-size:14px;align:center;" >' + feature.properties.descriptio + '</strong>';
      }
      /*
      var content = '<div class="feature-info">' +
          '<h3>' + feature.properties.name + '</h3>' +
          '<p><i class="fas fa-store-alt" style="font-size:12px;color:red"></i> ' + type + '</p>' +
          '<p><strong><i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse:</strong> ' + feature.properties.codecaisse + '</p>' +
          '<p><strong><i class="fas fa-home" style="font-size:12px;color:red"></i> URCECAM:</strong> ' + feature.properties.urcecam + '</p>' +
          // ... Ajoutez d'autres propriétés ici
          '</div>';
      */
      var content = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '" target="_blank"><img src="img/' + layer.feature.properties.image + '" alt="image" width="250px" height="150px"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > ' + layer.feature.properties.name + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + description + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.image + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
      alaInfoDiv.innerHTML = content;
    });
    //layer.bindLabel(feature.properties.name, {noHide: true});
  }
});
$.getJSON("bootleaf/balises.geojson", function (data) {
  balises.addData(data);
});

// FIN

// DEBUT TEST POLYGONE

var regionRN1 = L.geoJson(null, {
  transparent: true,
  maxZoom: 20,
  onEachFeature: function (feature, layer) {
    layer.on('click', function (e) {
      var type = feature.properties.fokontany;

      if (type == 'FO') {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';
      } else {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
      }

      var description = feature.properties.fokontany;

      if (description == null) {
        description = '';

      } else {
        description = '<strong style="font-family: Roboto, Arial, sans-serif;color:#70757A;font-size:14px;align:center;" >' + feature.properties.fokontany + '</strong>';
      }
      /*
      var content = '<div class="feature-info">' +
          '<h3>' + feature.properties.name + '</h3>' +
          '<p><i class="fas fa-store-alt" style="font-size:12px;color:red"></i> ' + type + '</p>' +
          '<p><strong><i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse:</strong> ' + feature.properties.codecaisse + '</p>' +
          '<p><strong><i class="fas fa-home" style="font-size:12px;color:red"></i> URCECAM:</strong> ' + feature.properties.urcecam + '</p>' +
          // ... Ajoutez d'autres propriétés ici
          '</div>';
      */
      var content = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.fokontany + '" target="_blank"><img src="img/' + layer.feature.properties.fokontany + '" alt="image" width="250px" height="150px"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > ' + layer.feature.properties.name + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + description + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.image + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
      alaInfoDiv.innerHTML = content;
    });
    layer.bindLabel(feature.properties.fokontany, { noHide: true });
  }
});
$.getJSON("bootleaf/fokontany_cible.geojson", function (data) {
  regionRN1.addData(data);
  //map.addLayer(regionRN1);
});
// FIN TEST POLYGONE

// DEBUT FokontanyCible


var fokontanyCibleLayer = L.geoJson(null);
var fokontanyCible = L.geoJson(null, {
  style: function (feature) {
    // Définissez le style des polygones ici
    return {
      fillColor: 'blue',  // Couleur de remplissage
      weight: 2,           // Épaisseur de la bordure
      //opacity: 1,          // Opacité de la bordure
      color: 'blue',      // Couleur de la bordure
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on('click', function (e) {
      var type = feature.properties.fokontany;

      if (type == 'FO') {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';
      } else {
        type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
      }

      var description = feature.properties.fokontany;

      if (description == null) {
        description = '';

      } else {
        description = '<strong style="font-family: Roboto, Arial, sans-serif;color:#70757A;font-size:14px;align:center;" >' + feature.properties.ADM1_EN + '</strong>';
      }
      /*
      var content = '<div class="feature-info">' +
          '<h3>' + feature.properties.name + '</h3>' +
          '<p><i class="fas fa-store-alt" style="font-size:12px;color:red"></i> ' + type + '</p>' +
          '<p><strong><i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse:</strong> ' + feature.properties.codecaisse + '</p>' +
          '<p><strong><i class="fas fa-home" style="font-size:12px;color:red"></i> URCECAM:</strong> ' + feature.properties.urcecam + '</p>' +
          // ... Ajoutez d'autres propriétés ici
          '</div>';
      */
      var content = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.ADM1_EN + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.ADM1_EN + '.jpg" alt="image" width="250px" height="150px"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > REGION ' + layer.feature.properties.ADM1_EN + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + description + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Activités : ' + layer.feature.properties.ACTIVITES.split(',').map((ACTIVITES, index) => (index + 1) + '. ' + ACTIVITES.trim()).join('<br>') + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"></tr>';
      alaInfoDiv.innerHTML = content;
    });
    layer.bindLabel(feature.properties.ADM1_EN, { noHide: true });
  }
});
$.getJSON("bootleaf/region_intervention.geojson", function (data) {
  fokontanyCible.addData(data);
  map.addLayer(fokontanyCibleLayer);
});

// FIN fokontanyCible

// #ALA FO#

var rootUrl_alaotraFO = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_alaotraFO = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:AlaotraFO',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonAlaotraFO',
  srsName: 'EPSG:4326'

};

var parameters_alaotraFO = L.Util.extend(defaultParameters_alaotraFO);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_alaotraFO + L.Util.getParamString(parameters_alaotraFO),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonAlaotraFO',
  success: handleJsonAlaotraFO
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var alaotraFOLayer = L.geoJson(null);
var alaotraFO = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonAlaotraFO(data) {
  //    console.log(data);
  alaotraFO.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonAlaotraFO(data) {
  console.log("callback function fired");
}

// FIN Alaotra FO

// AMI

var rootUrl_ami = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_ami = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Ami',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonAmi',
  srsName: 'EPSG:4326'

};

var parameters_ami = L.Util.extend(defaultParameters_ami);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_ami + L.Util.getParamString(parameters_ami),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonAmi',
  success: handleJsonAmi
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var amiLayer = L.geoJson(null);
var ami = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.epargne).toLocaleString("en-US") + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.credit).toLocaleSttring("en-US") + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.retard).toLocaleString("en-US") + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonAmi(data) {
  //    console.log(data);
  ami.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonAmi(data) {
  console.log("callback function fired");
}

// FIN AMI


// ANL

var rootUrl_anl = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_anl = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Anl',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonAnl',
  srsName: 'EPSG:4326'

};

var parameters_anl = L.Util.extend(defaultParameters_anl);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_anl + L.Util.getParamString(parameters_anl),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonAnl',
  success: handleJsonAnl
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var anlLayer = L.geoJson(null);
var anl = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonAnl(data) {
  //    console.log(data);
  anl.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonAnl(data) {
  console.log("callback function fired");
}

// FIN ANL

// AMM

var rootUrl_amm = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_amm = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Amm',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonAmm',
  srsName: 'EPSG:4326'

};

var parameters_amm = L.Util.extend(defaultParameters_amm);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_amm + L.Util.getParamString(parameters_amm),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonAmm',
  success: handleJsonAmm
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var ammLayer = L.geoJson(null);
var amm = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }


    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonAmm(data) {
  //    console.log(data);
  amm.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonAmm(data) {
  console.log("callback function fired");
}

// FIN AMM

// ITA


var rootUrl_ita = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_ita = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Itasy',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonIta',
  srsName: 'EPSG:4326'

};

var parameters_ita = L.Util.extend(defaultParameters_ita);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_ita + L.Util.getParamString(parameters_ita),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonIta',
  success: handleJsonIta
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var itaLayer = L.geoJson(null);
var ita = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        popupAnchor: [0, -25]
      }),
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
  }
});

function handleJsonIta(data) {
  ita.addData(data);
}

function getJsonIta(data) {
  console.log("callback function fired");
}

// FIN ITA

//BOENY

var rootUrl_boe = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_boe = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Boeny',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonBoe',
  srsName: 'EPSG:4326'

};

var parameters_boe = L.Util.extend(defaultParameters_boe);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_boe + L.Util.getParamString(parameters_boe),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonBoe',
  success: handleJsonBoe
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var boeLayer = L.geoJson(null);
var boe = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonBoe(data) {
  //    console.log(data);
  boe.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonBoe(data) {
  console.log("callback function fired");
}

// FIN BOENY

//BON

var rootUrl_bon = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_bon = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Bongolava',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonBon',
  srsName: 'EPSG:4326'

};

var parameters_bon = L.Util.extend(defaultParameters_bon);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_bon + L.Util.getParamString(parameters_bon),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonBon',
  success: handleJsonBon
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var bonLayer = L.geoJson(null);
var bon = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonBon(data) {
  //    console.log(data);
  bon.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonBon(data) {
  console.log("callback function fired");
}

// FIN BON

// ANJ

var rootUrl_anj = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_anj = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Analanjirofo',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonAnj',
  srsName: 'EPSG:4326'

};

var parameters_anj = L.Util.extend(defaultParameters_anj);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_anj + L.Util.getParamString(parameters_anj),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonAnj',
  success: handleJsonAnj
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var anjLayer = L.geoJson(null);
var anj = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonAnj(data) {
  //    console.log(data);
  anj.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonAnj(data) {
  console.log("callback function fired");
}

// FIN ANJ

// caisse


var rootUrl = 'http://localhost:8080/geoserver/crm/ows';

var defaultParameters = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'crm:fkt_majunga',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJson',
  srsName: 'EPSG:4326'

};

var parameters = L.Util.extend(defaultParameters);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl + L.Util.getParamString(parameters),
  dataType: 'jsonp',
  jsonpCallback: 'getJson',
  success: handleJson
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var pdvLayer = L.geoJson(null);
var pdv = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    //var lab = feature.properties.caisse + ' ' +feature.properties.typecaisse ;

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJson(data) {
  //    console.log(data);
  pdv.addData(data);
  //map.addLayer(pdvLayer);
}


function getJson(data) {
  console.log("callback function fired");
}

// FIN CAISSE

// caisse Front Office


var rootUrl_fo = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_fo = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:FrontOffice',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJson',
  srsName: 'EPSG:4326'

};

var parameters_fo = L.Util.extend(defaultParameters_fo);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_fo + L.Util.getParamString(parameters_fo),
  dataType: 'jsonp',
  jsonpCallback: 'getJson',
  success: handleJsonFo
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var foLayer = L.geoJson(null);
var fo = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/marker.png",
        iconSize: [16, 18],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.caisse,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {

    var type = layer.feature.properties.typecaisse;

    if (type == 'FO') {
      // Utiliser directement la variable sans la redéclarer
      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:green;font-size:14px;align:center;" > CAISSE FRONT OFFICE </strong>';

    } else {

      type = '<strong style="font-family: Roboto, Arial, sans-serif;color:red;font-size:14px;align:center;" > CAISSE BACK OFFICE </strong>';
    }

    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  ' + type + '</center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

    //var lab = feature.properties.caisse + ' ' +feature.properties.typecaisse ;

    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonFo(data) {
  //    console.log(data);
  fo.addData(data);
  //map.addLayer(pdvLayer);
}


function getJson(data) {
  console.log("callback function fired");
}

// FIN CAISSE FRONT OFFICE

// URCECAM


var rootUrl_urcecam = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_urcecam = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:andavamamba_anjezika',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJson',
  srsName: 'EPSG:4326'

};

var parameters_urcecam = L.Util.extend(defaultParameters_urcecam);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_urcecam + L.Util.getParamString(parameters_urcecam),
  dataType: 'jsonp',
  jsonpCallback: 'getJson',
  success: handleJsonUrcecam
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var urcecamLayer = L.geoJson(null);
var urcecam = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/pngkit_map-pin-png_1294869.png",
        iconSize: [18, 20],
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.denomination,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    var test = layer.feature.properties.epargne;
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '" target="_blank"><img src="img/' + layer.feature.properties.image + '" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >' + layer.feature.properties.denomination + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.boitepostale + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-envelope" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.mail + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-map-marker-alt" style="font-size:12px;color:red"></i> Long. :  ' + layer.feature.properties.longitude + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-map-marker-alt" style="font-size:12px;color:red"></i> Lat. : ' + layer.feature.properties.latitude + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  Nombre Caisse  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.nombrecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.nombremembre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.nombremembre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Conseillers  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(test).toLocaleString("en-US") + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.credit).toLocaleString("en-US") + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.retard).toLocaleString("en-US") + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.denomination, { noHide: true });
  }
});

function handleJsonUrcecam(data) {
  //    console.log(data);
  urcecam.addData(data);
  //map.addLayer(urcecamLayer);
}


function getJson(data) {
  console.log("callback function fired");
}

// FIN URCECAM

// UNICECAM

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var unicecamLayer = L.geoJson(null);
var unicecam = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/toppng.com-map-marker-icon-600x-map-marker-600x800.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      //title: feature.properties.denomination,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img width="250" height="175" src="img/' + layer.feature.properties.image + '.jpg" target="_blank"></a></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:14px;align:center;" >' + layer.feature.properties.denomination + '</strong></center></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.boitepostale + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-envelope" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.mail + '</strong></br><strong style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-globe" style="font-size:12px;color:red"></i>   <a href="http://www.cecam.mg/" target="_blank">www.cecam.mg</a></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.denomination, { noHide: true });
  }
});
$.getJSON("bootleaf/unicecam.geojson", function (data) {
  unicecam.addData(data);
  //map.addLayer(unicecamLayer);
});


var region = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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



var andavamamba_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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


/*
var fokontanyCible = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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
*/
var sect_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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

var inondation_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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

var incendie_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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

var epidemie_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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

var ruelle_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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

var ocsol_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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

var batiment_anjezika = L.tileLayer.wms('http://localhost:8080/geoserver/crm/wms', {
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

var rootUrl_anjezika = 'http://localhost:8080/geoserver/cecam/ows';

var defaultParameters_anjezika = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:andavamamba_anjezika',
  maxFeatures: 500,
  outputFormat: 'application/json', // Change to GeoJSON format
  srsName: 'EPSG:4326'
};

var parameters_anjezika = L.Util.extend(defaultParameters_anjezika);

// Using Fetch API for AJAX request
fetch(rootUrl_anjezika + L.Util.getParamString(parameters_anjezika))
  .then(response => response.json())
  .then(data => handleJsonUrcecam(data))
  .catch(error => console.error('Error fetching GeoJSON:', error));

// Empty layer placeholder for GeoJSON data
var anjezikaLayer = L.geoJson(null);

// Creating GeoJSON layer with custom styling and popup content
var anjezika = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "leaflet/images/pngkit_map-pin-png_1294869.png",
        iconSize: [18, 20],
        popupAnchor: [0, -25]
      }),
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    var test = layer.feature.properties.fokontany;
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >' + layer.feature.properties.fokontany + '</strong></center></br>'; // Continue your popup content
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.fokontany, { noHide: true });
  }
});

function handleJsonUrcecam(data) {
  anjezika.addData(data);
  // Add the GeoJSON layer to the map or do other processing
  map.addLayer(anjezika);
}


map = L.map("map", {
  zoom: 6,
  center: [-18.91520, 47.50616],
  layers: [googleStreets, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});


map.on('click', function () {
  //if (!e.originalEvent.target.classList.contains('fa-info-circle')) {
  alaInfoDiv.innerHTML = '';
  //}
});

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Google Street": googleStreets,
  "Google Satellite": googleSat,
  "Street Map": cartoLight,
};


var groupedOverlays = {
  "Branche Croix Rouge Malagasy": {
    "<img src='img/crm.jpg' width='15' height='15'>&nbsp;Branche": fokontanyCibleLayer,
  },
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed,
  position: 'topleft',
}).addTo(map);


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
map.on("overlayadd", function (e) {
  if (e.layer === vakLayer) {
    markerClusters.addLayer(vak);
    syncSidebar();
  }
  if (e.layer === csoLayer) {
    markerClusters.addLayer(cso);
    syncSidebar();
  }
  if (e.layer === cseLayer) {
    markerClusters.addLayer(cse);
    syncSidebar();
  }
  if (e.layer === sofLayer) {
    markerClusters.addLayer(sof);
    syncSidebar();
  }
  if (e.layer === menLayer) {
    markerClusters.addLayer(men);
    syncSidebar();
  }
  if (e.layer === ivmLayer) {
    markerClusters.addLayer(ivm);
    syncSidebar();
  }
  if (e.layer === itaLayer) {
    markerClusters.addLayer(ita);
    syncSidebar();
  }
  if (e.layer === boeLayer) {
    markerClusters.addLayer(boe);
    syncSidebar();
  }
  if (e.layer === bonLayer) {
    markerClusters.addLayer(bon);
    syncSidebar();
  }
  if (e.layer === anlLayer) {
    markerClusters.addLayer(anl);
    syncSidebar();
  }
  if (e.layer === amiLayer) {
    markerClusters.addLayer(ami);
    syncSidebar();
  }
  if (e.layer === ammLayer) {
    markerClusters.addLayer(amm);
    syncSidebar();
  }
  if (e.layer === balisesLayer) {
    markerClusters.addLayer(balises);
    syncSidebar();
  }
  if (e.layer === fokontanyCibleLayer) {
    markerClusters.addLayer(fokontanyCible);
    syncSidebar();
  }
  if (e.layer === alaotraFOLayer) {
    markerClusters.addLayer(alaotraFO);
    syncSidebar();
  }
  if (e.layer === anjLayer) {
    markerClusters.addLayer(anj);
    syncSidebar();
  }
  if (e.layer === pdvLayer) {
    markerClusters.addLayer(pdv);
    syncSidebar();
  }
  if (e.layer === foLayer) {
    markerClusters.addLayer(fo);
    syncSidebar();
  }
  if (e.layer === urcecamLayer) {
    markerClusters.addLayer(urcecam);
    syncSidebar();
  }
  if (e.layer === unicecamLayer) {
    markerClusters.addLayer(unicecam);
    syncSidebar();
  }
});

map.on("overlayremove", function (e) {
  if (e.layer === vakLayer) {
    markerClusters.removeLayer(vak);
    syncSidebar();
  }
  if (e.layer === csoLayer) {
    markerClusters.removeLayer(cso);
    syncSidebar();
  }
  if (e.layer === cseLayer) {
    markerClusters.removeLayer(cse);
    syncSidebar();
  }
  if (e.layer === sofLayer) {
    markerClusters.removeLayer(sof);
    syncSidebar();
  }
  if (e.layer === menLayer) {
    markerClusters.removeLayer(men);
    syncSidebar();
  }
  if (e.layer === ivmLayer) {
    markerClusters.removeLayer(ivm);
    syncSidebar();
  }
  if (e.layer === itaLayer) {
    markerClusters.removeLayer(ita);
    syncSidebar();
  }
  if (e.layer === boeLayer) {
    markerClusters.removeLayer(boe);
    syncSidebar();
  }
  if (e.layer === bonLayer) {
    markerClusters.removeLayer(bon);
    syncSidebar();
  }
  if (e.layer === anlLayer) {
    markerClusters.removeLayer(anl);
    syncSidebar();
  }
  if (e.layer === amiLayer) {
    markerClusters.removeLayer(ami);
    syncSidebar();
  }
  if (e.layer === ammLayer) {
    markerClusters.removeLayer(amm);
    syncSidebar();
  }
  if (e.layer === balisesLayer) {
    markerClusters.removeLayer(balises);
    syncSidebar();
  }
  if (e.layer === fokontanyCibleLayer) {
    markerClusters.removeLayer(fokontanyCible);
    syncSidebar();
  }
  if (e.layer === alaotraFOLayer) {
    markerClusters.removeLayer(alaotraFO);
    syncSidebar();
  }
  if (e.layer === anjLayer) {
    markerClusters.removeLayer(anj);
    syncSidebar();
  }
  if (e.layer === pdvLayer) {
    markerClusters.removeLayer(pdv);
    syncSidebar();
  }
  if (e.layer === foLayer) {
    markerClusters.removeLayer(fo);
    syncSidebar();
  }
  if (e.layer === urcecamLayer) {
    markerClusters.removeLayer(urcecam);
    syncSidebar();
  }
  if (e.layer === unicecamLayer) {
    markerClusters.removeLayer(unicecam);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
/*
map.on("moveend", function (e) {
  syncSidebar();
});
*/
/* Clear feature highlight when map is clicked */
map.on("click", function (e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function (index, layer) {
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
  div.innerHTML = "<span class='hidden-xs'><a href='https://www.croixrougemalagasy.mg/' target='_blank'>CRM - 2023 </a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomHome = L.Control.zoomHome({ position: 'topright' }).addTo(map);

//var boxZoom = L.Control.boxzoom({ position:'topleft' }).addTo(map);

/* Globe */
var miniMap = new L.Control.GlobeMiniMap({
  //position: 'topleft';    
  land: '#ffff8c',
  water: '#3333FF',
  marker: '#000000',
  topojsonSrc: 'leaflet-globeminimap-master/src/world.json'
}).addTo(map);

/*
var measureControl = L.control.polylineMeasure({
    position: 'topleft',                    // Position to show the control. Possible values are: 'topright', 'topleft', 'bottomright', 'bottomleft'
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
*/
/* GPS enabled geolocation control set to follow the user's location */
/*
var locateControl = L.control.locate({
  position: "topleft",
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
*/
/*var rootUrl = 'http://localhost:8080/geoserver/ows';

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
      
      layer.bindPopup(popupContent);
  }
}).addTo(group);
  map.fitBounds(group.getBounds());
}


function getJson(data) {
console.log("callback function fired");
}
*/

//L.marker([41.18, 9.35]).addTo(map).bindLabel('Top label is top', {permanent: true, direction: 'top'});



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
  featureList = new List("features", { valueNames: ["feature-name"] });
  featureList.sort("feature-name", { order: "asc" });

  var anjezikaBH = new Bloodhound({
    name: "anjezika",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: anjezikaSearch,
    limit: 10
  });

  var vakBH = new Bloodhound({
    name: "cso",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: vakSearch,
    limit: 10
  });

  var csoBH = new Bloodhound({
    name: "cso",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: csoSearch,
    limit: 10
  });

  var cseBH = new Bloodhound({
    name: "cse",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: cseSearch,
    limit: 10
  });

  var sofBH = new Bloodhound({
    name: "men",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: sofSearch,
    limit: 10
  });

  var menBH = new Bloodhound({
    name: "men",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: menSearch,
    limit: 10
  });

  var ivmBH = new Bloodhound({
    name: "ivm",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ivmSearch,
    limit: 10
  });

  var itaBH = new Bloodhound({
    name: "ita",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: itaSearch,
    limit: 10
  });

  var bonBH = new Bloodhound({
    name: "bon",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: bonSearch,
    limit: 10
  });

  var anlBH = new Bloodhound({
    name: "anl",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: anlSearch,
    limit: 10
  });

  var amiBH = new Bloodhound({
    name: "ami",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: amiSearch,
    limit: 10
  });

  var balisesBH = new Bloodhound({
    name: "balises",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: balisesSearch,
    limit: 10
  });

  var anjBH = new Bloodhound({
    name: "anj",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: anjSearch,
    limit: 10
  });

  var pdvBH = new Bloodhound({
    name: "pdv",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: pdvSearch,
    limit: 10
  });

  var urcecamBH = new Bloodhound({
    name: "urcecam",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: urcecamSearch,
    limit: 10
  });

  var unicecamBH = new Bloodhound({
    name: "pdv",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: unicecamSearch,
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
  anjezikaBH.initialize();
  vakBH.initialize();
  csoBH.initialize();
  cseBH.initialize();
  sofBH.initialize();
  menBH.initialize();
  ivmBH.initialize();
  itaBH.initialize();
  bonBH.initialize();
  anlBH.initialize();
  amiBH.initialize();
  balisesBH.initialize();
  anjBH.initialize();
  pdvBH.initialize();
  urcecamBH.initialize();
  unicecamBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "anjezika",
    displayKey: "name",
    source: anjezikaBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;Anjezika</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "vak",
    displayKey: "name",
    source: vakBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "cso",
    displayKey: "name",
    source: csoBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "cse",
    displayKey: "name",
    source: cseBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "sof",
    displayKey: "name",
    source: sofBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "men",
    displayKey: "name",
    source: menBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "ivm",
    displayKey: "name",
    source: ivmBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "ita",
    displayKey: "name",
    source: itaBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "bon",
    displayKey: "name",
    source: bonBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "anl",
    displayKey: "name",
    source: anlBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "ami",
    displayKey: "name",
    source: amiBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "balises",
    displayKey: "name",
    source: balisesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "anj",
    displayKey: "name",
    source: anjBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "pdv",
    displayKey: "name",
    source: pdvBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "urcecam",
    displayKey: "name",
    source: urcecamBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "unicecam",
    displayKey: "name",
    source: unicecamBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;pdv</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(anjezikaLayer)) {
        map.addLayer(anjezikaLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(vakLayer)) {
        map.addLayer(vakLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(csoLayer)) {
        map.addLayer(csoLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(cseLayer)) {
        map.addLayer(cseLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(sofLayer)) {
        map.addLayer(sofLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(menLayer)) {
        map.addLayer(menLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(ivmLayer)) {
        map.addLayer(ivmLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(itaLayer)) {
        map.addLayer(itaLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(boeLayer)) {
        map.addLayer(boeLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(bonLayer)) {
        map.addLayer(bonLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(anlLayer)) {
        map.addLayer(anlLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(amiLayer)) {
        map.addLayer(amiLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(balisesLayer)) {
        map.addLayer(balisesLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(fokontanyCibleLayer)) {
        map.addLayer(fokontanyCibleLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(anjLayer)) {
        map.addLayer(anjLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(pdvLayer)) {
        map.addLayer(pdvLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(urcecamLayer)) {
        map.addLayer(urcecamLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Point de Vente") {
      if (!map.hasLayer(unicecamLayer)) {
        map.addLayer(unicecamLayer);
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
