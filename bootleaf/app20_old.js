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

  // VAKINANKARATRA
  vak.eachLayer(function (layer) {
    if (map.hasLayer(vakLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });


  // CSO
  cso.eachLayer(function (layer) {
    if (map.hasLayer(csoLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // CSE
  cse.eachLayer(function (layer) {
    if (map.hasLayer(cseLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });


  // SOFIA
  sof.eachLayer(function (layer) {
    if (map.hasLayer(sofLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // MENABE
  men.eachLayer(function (layer) {
    if (map.hasLayer(menLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // IVM
  ivm.eachLayer(function (layer) {
    if (map.hasLayer(ivmLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // ITASY
  ita.eachLayer(function (layer) {
    if (map.hasLayer(itaLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // BOENY
  boe.eachLayer(function (layer) {
    if (map.hasLayer(boeLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // BON
  bon.eachLayer(function (layer) {
    if (map.hasLayer(bonLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // ANL
  anl.eachLayer(function (layer) {
    if (map.hasLayer(anlLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // AMI
  ami.eachLayer(function (layer) {
    if (map.hasLayer(amiLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // AMM
  amm.eachLayer(function (layer) {
    if (map.hasLayer(ammLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // ALA
  alaotra.eachLayer(function (layer) {
    if (map.hasLayer(alaotraLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  // ANJ
  anj.eachLayer(function (layer) {
    if (map.hasLayer(anjLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  /* CAISSE */
  pdv.eachLayer(function (layer) {
    if (map.hasLayer(pdvLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="75" height="75" src="img/' + layer.feature.properties.image + '.jpg"></td><td class="feature-name"><strong style="font-family: Roboto, Arial, sans-serif;color:#4eb9f9;font-size:12px;" > <i class="fas fa-store-alt" style="font-size:10px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:10px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:10px;color:red"></i>  ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 10px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:10px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

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

var rootUrl_vak = 'http://192.168.1.241:8080/geoserver/cecam/ows';

var defaultParameters_vak = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Vakinankaratra',
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

    var test = parseInt(layer.feature.properties.retard);

    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.epargne).toLocaleString("en-US") + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.credit).toLocaleString("en-US") + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + test.toLocaleString("en-US") + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonVak(data) {
  //    console.log(data);
  vak.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonVak(data) {
  console.log("callback function fired");
}

//FIN VAKINANKARATRA



// #CSO#

var rootUrl_cso = 'http://192.168.1.241:8080/geoserver/cecam/ows';

var defaultParameters_cso = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:cso',
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
var cso = L.geoJson(null, {
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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonCso(data) {
  //    console.log(data);
  cso.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonCso(data) {
  console.log("callback function fired");
}

//FIN CSO



// #CSE#

var rootUrl_cse = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
var cse = L.geoJson(null, {
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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
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

var rootUrl_sof = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
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

var rootUrl_ivm = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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

var rootUrl_men = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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

var rootUrl_alaotra = 'http://192.168.1.241:8080/geoserver/cecam/ows';

var defaultParameters_alaotra = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:Alaotra',
  maxFeatures: 500,
  outputFormat: 'text/javascript'
  , format_options: 'callback: getJsonAlaotra',
  srsName: 'EPSG:4326'

};

var parameters_alaotra = L.Util.extend(defaultParameters_alaotra);
//console.log(rootUrl + L.Util.getParamString(parameters));
$.ajax({
  jsonp: false,
  url: rootUrl_alaotra + L.Util.getParamString(parameters_alaotra),
  dataType: 'jsonp',
  jsonpCallback: 'getJsonAlaotra',
  success: handleJsonAlaotra
});

// Empty layer placeholder to add to layer control for listening when to add/remove pdv to markerClusters layer 
var alaotraLayer = L.geoJson(null);
var alaotra = L.geoJson(null, {
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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
    layer.bindPopup(popupContent);
    layer.bindLabel(feature.properties.caisse, { noHide: true });
    //layer.bindLabel('Default centered polygon label');
  }
});

function handleJsonAlaotra(data) {
  //    console.log(data);
  alaotra.addData(data);
  //map.addLayer(pdvLayer);
}


function getJsonAlaotra(data) {
  console.log("callback function fired");
}

// FIN Alaotra

// AMI

var rootUrl_ami = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.epargne).toLocaleString("en-US") + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.credit).toLocaleSttring("en-US") + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + parseInt(layer.feature.properties.retard).toLocaleString("en-US") + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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

var rootUrl_anl = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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

var rootUrl_amm = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/'+layer.feature.properties.image+'.jpg" target="_blank"><img src="img/'+layer.feature.properties.image+'.jpg" alt="image" width="250" height="175"/></a></center></td></tr>'; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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


var rootUrl_ita = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';

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

var rootUrl_boe = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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

var rootUrl_bon = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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

var rootUrl_anj = 'http://192.168.1.241:8080/geoserver/cecam/ows';

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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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


var rootUrl = 'http://192.168.1.241:8080/geoserver/cecam/ows';

var defaultParameters = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:caisse_cecam',
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
    //var popupContent = "  <img src='bootleaf/icone.png' width='250' height='175' align='center'>" + "</p>"+ " Botika : ";
    //var popupContent = "<div style='font-family:'Source Sans Pro',sans-serif;'> <strong><img src='img/"+feature.properties.image+".jpg' width='300' height='175' align='center'></p> Caisse : " + feature.properties.caisse + "</p>" + "URCECAM : " + feature.properties.urcecam + "</p>" + " Code Caisse : " + feature.properties.codecaisse+ "</p>"  + " DRP :  " + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ "</p>" + " COURANT : " + feature.properties.courant+ "</p> <strong></div>" ; 
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></p><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fa fa-bolt" style="font-size:12px;color:red"></i>  COURANT :  ' + layer.feature.properties.courant + '</p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></p><p  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Nombre Membre  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membre + '</strong> membres / Actif : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.membreactif + '</strong></p></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td</tr>' ; 
    var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><a href="img/' + layer.feature.properties.image + '.jpg" target="_blank"><img src="img/' + layer.feature.properties.image + '.jpg" alt="image" width="250" height="175"/></a></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district + " | " + feature.properties.region + " | " + feature.properties.province + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre * 45) / 100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-credit-card" style="font-size:12px;color:red"></i>  Encours Epargne (en ' + layer.feature.properties.unite + ') : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.epargne + ' </strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en ' + layer.feature.properties.unite + ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>';
    //var popupContent = '<tr class="feature-row" ><td style="vertical-align: middle;"><center><img width="250" height="175" src="img/'+layer.feature.properties.image+'.jpg"></center></td></br><td class="feature-name"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" > <i class="fas fa-store-alt" style="font-size:12px;color:red"></i>  CAISSE  ' + layer.feature.properties.caisse + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-key" style="font-size:12px;color:red"></i> Code Caisse ' + layer.feature.properties.codecaisse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-home" style="font-size:12x;color:red"></i> URCECAM  ' + layer.feature.properties.urcecam + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fa fa-map" style="font-size:12x;color:red"></i> DRP : ' + feature.properties.district+  " | " + feature.properties.region+  " | " + feature.properties.province+ '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"> <i class="fas fa-map-marker-alt" style="font-size:12x;color:red"></i>   ' + layer.feature.properties.adresse + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;">  <i class="fas fa-phone-alt" style="font-size:12px;color:red"></i>   ' + layer.feature.properties.contact + '</strong></p><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><center><strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:14px;align:center;" >  Situation  au  ' + layer.feature.properties.periode + '</strong></center></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-users" style="font-size:12px;color:red"></i>  Adherents  :<strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" > ' + layer.feature.properties.membre + '</strong> membres / Actif  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + Math.round((layer.feature.properties.membre*45)/100) + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user" style="font-size:12px;color:red"></i> Personnes Morale  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.morale + '</strong> membres</br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-user-circle" style="font-size:12px;color:red"></i> Nombre CAE  : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.conseillers + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Encours Credit (en '  + layer.feature.properties.unite +  ')   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.credit + '</strong></br><strong  style="color: #70757A;font-size: 12px;line-height: 16px;font-family: Roboto, Arial, sans-serif;"><i class="fa fa-file" style="font-size:12px;color:red"></i> Retard Credit (en AR)   : <strong style="font-family: Roboto, Arial, sans-serif;color:#237eb5;font-size:13px;" >' + layer.feature.properties.retard + ' </strong></br></td><td style="vertical-align: middle;"<i class="fa fa-chevron-right pull-right"></i></td></tr>'; 
    /*
    if (feature.properties && feature.properties.CAISSE) {
       var popupContent += feature.properties.CAISSE + "</p>" + "URCECAM : " + feature.properties.URCECAM + "</p>" + " Code Caisse : " + feature.properties.CODECAISSE+ "</p>"  + " Province : " + feature.properties.PROVINCE+ "</p>" + " Région : " + feature.properties.REGION+ "</p>" + " District : " + feature.properties.DISTRICT+ "</p>" + " COURANT : " + feature.properties.COURANT+ "</p>" ;

    }
    */
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

// URCECAM


var rootUrl_urcecam = 'http://192.168.1.241:8080/geoserver/cecam/ows';

var defaultParameters_urcecam = {
  service: 'WFS',
  version: '1.0.0',
  request: 'GetFeature',
  typeName: 'cecam:urcecam',
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
  map.addLayer(urcecamLayer);
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
  map.addLayer(unicecamLayer);
});

// FIN UNICECAM

var region = L.tileLayer.wms('http://192.168.1.241:8080/geoserver/cecam/wms', {
  attribution: '(C) OMA 2017',
  layers: '	cecam:region',
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
    layer.bindLabel(feature.properties.region, { noHide: true });
  }
});

map = L.map("map", {
  zoom: 6,
  center: [-18.90955, 47.52752],
  layers: [googleSat, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
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
  //"Street Map": cartoLight,
};

var groupedOverlays = {
  "Points d'interet": {
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;UNICECAM": unicecamLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;URCECAM": urcecamLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;CAISSE RURALE": pdvLayer,
  },
  "Caisse par URCECAM": {
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;ALAOTRA": alaotraLayer,
    //"<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;AMORON'I MANIA":amiLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;AMORON I MANIA": ammLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;ANALAMANGA": anlLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;ANALANJIROFO": anjLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;BOENY": boeLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;BONGOLAVA": bonLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;ITASY": itaLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;IVON IMERINA": ivmLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;MENABE": menLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;SOFIA": sofLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;SUD EST": cseLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;SUD OUEST": csoLayer,
    "<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;VAKINANKARATRA": vakLayer,
    //"<img src='bootleaf/icone.png' width='24' height='24'>&nbsp;REGION": region,

  }
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
  if (e.layer === alaotraLayer) {
    markerClusters.addLayer(alaotra);
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
  if (e.layer === alaotraLayer) {
    markerClusters.removeLayer(alaotra);
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
  div.innerHTML = "<span class='hidden-xs'><a href='#'>DMOI - 2021 </a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomHome = L.Control.zoomHome({ position: 'topright' }).addTo(map);

//var boxZoom = L.Control.boxzoom({ position:'topleft' }).addTo(map);

/* Globe */
var miniMap = new L.Control.GlobeMiniMap({
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

  var alaotraBH = new Bloodhound({
    name: "alaotra",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: alaotraSearch,
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
  alaotraBH.initialize();
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
    name: "alaotra",
    displayKey: "name",
    source: alaotraBH.ttAdapter(),
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
      if (!map.hasLayer(alaotraLayer)) {
        map.addLayer(alaotraLayer);
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
