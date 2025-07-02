<?php
//session_start();

if (!isset($_SESSION["user"]["id"])) {
  session_start();
} else {
  echo "";
}
require_once("connexionBase.php");
if (isset($_SESSION["user"]["id"])) {
  $query = "SELECT id, pseudo, admin, active, region, mdp FROM public.user WHERE id=" . $_SESSION["user"]["id"];
  //echo $query;
  $resultat = pg_query($query);
  $l = pg_fetch_array($resultat);
} else {
  echo "";
}

$query = pg_query("SELECT count(*) as total FROM balises");
$row = pg_fetch_array($query);

$query_drapeaux = pg_query("SELECT count(*) as total_drapeaux FROM drapeaux");
$row_drapeaux = pg_fetch_array($query_drapeaux);

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Mapping | Croix Rouge Malagasy</title>
  <script src='font-awesome.js'></script>
  <script src="leaflet/leaflet-src.js"></script>
  <script src="leaflet/leaflet.js"></script>
  <link rel="stylesheet" href="leaflet/leaflet.css" />
  <link rel="stylesheet" href="bootleaf/bootstrap.min.css">


  <!--script src="Leaflet.draw/src/Leaflet.draw.js"></script>
    <script src="Leaflet.draw/src/Leaflet.Draw.Event.js"></script>
    <link rel="stylesheet" href="Leaflet.draw/src/leaflet.draw.css" />

    <script src="Leaflet.draw/src/Toolbar.js"></script>
    <script src="Leaflet.draw/src/Tooltip.js"></script>

    <script src="Leaflet.draw/src/ext/GeometryUtil.js"></script>
    <script src="Leaflet.draw/src/ext/LatLngUtil.js"></script>
    <script src="Leaflet.draw/src/ext/LineUtil.Intersect.js"></script>
    <script src="Leaflet.draw/src/ext/Polygon.Intersect.js"></script>
    <script src="Leaflet.draw/src/ext/Polyline.Intersect.js"></script>
    <script src="Leaflet.draw/src/ext/TouchEvents.js"></script>

    <script src="Leaflet.draw/src/draw/DrawToolbar.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.Feature.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.SimpleShape.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.Polyline.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.Marker.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.CircleMarker.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.Circle.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.Polygon.js"></script>
    <script src="Leaflet.draw/src/draw/handler/Draw.Rectangle.js"></script>


    <script src="Leaflet.draw/src/edit/EditToolbar.js"></script>
    <script src="Leaflet.draw/src/edit/handler/EditToolbar.Edit.js"></script>
    <script src="Leaflet.draw/src/edit/handler/EditToolbar.Delete.js"></script>

    <script src="Leaflet.draw/src/Control.Draw.js"></script>

    <script src="Leaflet.draw/src/edit/handler/Edit.Poly.js"></script>
    <script src="Leaflet.draw/src/edit/handler/Edit.SimpleShape.js"></script>
    <script src="Leaflet.draw/src/edit/handler/Edit.Marker.js"></script>
    <script src="Leaflet.draw/src/edit/handler/Edit.CircleMarker.js"></script>
    <script src="Leaflet.draw/src/edit/handler/Edit.Circle.js"></script>
    <script src="Leaflet.draw/src/edit/handler/Edit.Rectangle.js"></script-->
  <link rel="stylesheet" href="Leaflet.label-master/libs/leaflet/leaflet.css" />
  <!--[if lte IE 8]><link rel="stylesheet" href="../libs/leaflet/leaflet.ie.css" /><![endif]-->
  <link rel="stylesheet" href="Leaflet.label-master/dist/leaflet.label.css" />



  <link rel="stylesheet" href="bootleaf/app.css">
  <link rel="stylesheet" href="leaflet-routing-machine-3.2.5/dist/leaflet-routing-machine.css" />
  <!--link rel="stylesheet" href="bootleaf/lib/leaflet/leaflet.css" /-->
  <link rel="stylesheet" href="bootleaf/lib/opacity/Control.Opacity.css" />
  <link rel="stylesheet" href="bootleaf/lib/jquery/jquery-ui-1.10.3.custom.min.css" />
  <link rel="stylesheet" href="bootleaf/leaflet.zoomhome.css" />
  <link rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="L.Control.BoxZoom-master/dist/leaflet-control-boxzoom.css" />
  <!--link rel="stylesheet" href="bootleaf/leaflet.css"-->
  <link rel="stylesheet" href="bootleaf/MarkerCluster.css">
  <link rel="stylesheet" href="bootleaf/MarkerCluster.Default.css">
  <link rel="stylesheet" href="bootleaf/L.Control.Locate.css">
  <link rel="stylesheet" href="bootleaf/leaflet.groupedlayercontrol.css">
  <link rel="stylesheet" href="bootleaf/Leaflet.PolylineMeasure.css" />
  <link rel="stylesheet" href="bootleaf/leaflet-control-boxzoom.css" />
  <link rel="stylesheet" href="leaflet.zoomhome-master/dist/leaflet.zoomhome.css">
  <link rel="stylesheet" href="bootleaf/lib/opacity/Control.Opacity.css" />
  <link rel="stylesheet" href="bootleaf/lib/jquery/jquery-ui-1.10.3.custom.min.css" />
  <link rel="apple-touch-icon" sizes="76x76" href="bootleaf/icone.png">
  <link rel="apple-touch-icon" sizes="120x120" href="bootleaf/icone.png">
  <link rel="apple-touch-icon" sizes="152x152" href="bootleaf/icone.png">
  <link rel="icon" sizes="196x196" href="bootleaf/icone.png">
  <link rel="icon" type="image/x-icon" sizes="120x120" href="bootleaf/icone.png">


  <link rel="stylesheet" type="text/css" href="libs/jquery/jquery.dataTables.min.css">
  <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
  <!-- Page level plugin JavaScript-->
  <script src="vendor/datatables/jquery.dataTables.js"></script>
  <script src="vendor/datatables/dataTables.bootstrap4.js"></script>
  <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Roboto', Arial, sans-serif;
      /*background-color: #f5f5f5;*/
      margin: 0;
      padding: 20px;
    }
  </style>
  <style>
    .hidden {
      display: none;
    }
  </style>
  <style>
    
    /* ---------------------------- */
    /* Défilement de droite à gauche */
    .marquee-rtl {
      overflow: hidden;
      /* important */
      width: 50%;
      max-width: 30em;
      /* A ADAPTER */
    }

    .marquee-rtl>div {
      display: inline-block;
      /* important */
      white-space: nowrap;
      /* important */
      animation: defilement-rtl 12s infinite linear;
      /* défilement */
      cursor: pointer;
      padding: 10px 2em 10px 100%;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .marquee-rtl:hover>div {
      animation-play-state: paused;
      /* met en pause le défilement */
    }

    .marquee-rtl>div:first-letter {
      font-weight: 700;
      color: #ffef6b;
    }

    @keyframes defilement-rtl {
      0% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }

      100% {
        -webkit-transform: translate(-100%);
        transform: translate(-100%);
      }
    }

    /* ---------------------------- */
    /* texte sur plusieurs lignes automatiquement */
    .marquee-multi-lignes>div {
      width: 90%;
      white-space: normal;
      /* important */
    }

    /* ---------------------------- */
    /* déco */
    h2,
    p {
      text-align: center;
    }

    .marquee-rtl {
      margin: 0em auto;
    }

    .marquee-rtl>div {
      font-size: 1.5em;
      color: #ffef6b;
      font-weight: bold;
    }
  </style>

</head>

<body style="font-size: 10px;">
  <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <div class="navbar-icon-container">
          <a href="#" class="navbar-icon pull-right visible-xs" id="nav-btn"><i class="fa fa-bars fa-lg white"></i></a>
          <a href="#" class="navbar-icon pull-right visible-xs" id="sidebar-toggle-btn"><i class="fa fa-search fa-lg white"></i></a>
        </div>
        <img alt="" width="30" height="30" src="bootleaf/icone.png" style="float: left; margin-right: 10px">
        <a class="navbar-brand" href="index" style="font-size:15px;">CROIX ROUGE MALAGASY - MAPPING</a>
      </div>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav">

          <!--li><a href="#"><i class="fa fa-chart-line white"></i>&nbsp;&nbsp;Tableau de Bord</a></li-->
          <?php
          if (isset($_SESSION["user"]["id"])) {
          ?>
            <li class="dropdown">
              <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fas fa-cogs white"></i><b>&nbsp;&nbsp;MISE A JOUR </b><b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="balises" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-edit" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">BALISES</strong></a></li>
                <!--li class="divider hidden-xs"></li-->
                <li><a href="drapeaux" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-edit" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">DRAPEAUX</strong></a></li>
                <li><a href="user" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-users" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">UTILISATEUR</strong></a></li>
                <li><a href="#" data-toggle="modal" data-target="#userModal"><i class="fa fa-key" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">MOT DE PASSE</strong></a></li>

              </ul>
            </li>

          <?php

          } else {
            echo "";
          }

          ?>
          <li class="dropdown">
            <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fas fa-cogs white"></i><b>&nbsp;&nbsp; DASHBOARD POWERBI </b><b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="ressources" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-envelope" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">RESSOURCES CRM</strong></a></li>
              <!--li class="divider hidden-xs"></li-->
              <li><a href="evca" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-bookmark" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">DONNEES EVCA</strong></a></li>
              <li><a href="fokontany" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-home" aria-hidden="true" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">DONNEES FOKONTANY</strong></a></li>
            </ul>
          </li>
          <li class="hidden-xs"><a href="carte" id="cartographie-btn"><i class="fa fa-map white"></i><b>&nbsp;&nbsp;CARTE VULNERABILITE</b></a></li>
          <li class="hidden-xs"><a href="projet"><i class="fa fa-map white"></i><b>&nbsp;&nbsp;CARTOGRAPHIE PROJET</b></a></li>
          <li class="hidden-xs">
              <a href="fichier">
                  <i class="fa fa-folder white"></i><b>&nbsp;&nbsp;GESTION DE FICHIER</b>
              </a>
          </li>
          <li class="hidden-xs" ><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="list-btn"><i class="fa fa-list white"></i><b>&nbsp;&nbsp;LISTE BRANCHE</b></a></li>
          <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="about-btn"><i class="fa fa-question-circle white"></i><b>&nbsp;&nbsp;A PROPOS</b></a></li>
          <div class="marquee-rtl">
            <div><?php echo $row["total"]; ?> BALISES ET <?php echo $row_drapeaux["total_drapeaux"]; ?> DRAPEAUX MIS EN PLACE</div>
          </div>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <?php
          if (isset($_SESSION["user"]["id"])) {
          ?>
            <li class="hidden-xs"><a href="logout"><i class="fa fa-user white"></i>&nbsp;&nbsp;<b>SE DECONNECTER</b></a></li>
          <?php
          } else {
          ?>
            <li class="hidden-xs"><a href="login"><i class="fa fa-user white"></i><b>&nbsp;&nbsp;SE CONNECTER</b></a></li>
          <?php
          }
          ?>

        </ul>
      </div><!--/.navbar-collapse -->
    </div>
  </div>

  <!-- Change Password Modal-->
  <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" style="align-content: center;">MODIFICATION MOT DE PASSE</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form name="formPassword" id="formPassword">
            <label>Login</label>
            <input type="text" readOnly="true" value="<?php echo $_SESSION["user"]["pseudo"]; ?>" class="form-control" />
            <br />
            <label>Password</label>
            <input type="password" name="password" id="password" class="form-control" required />
            <br />
            <label>Confirmation</label>
            <input type="password" name="password2" id="password2" class="form-control" required />
            <br />
            <input type="hidden" name="cmd" value="Valider" />
            <input type="button" value="Valider" class="btn btn-success" onclick="updatePassword();" />
            <button class="btn btn-secondary" type="button" data-dismiss="modal" align="right">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Change Password -->

  <script language="javascript">
    function updatePassword() {
      var data = new FormData($('#formPassword')[0]);
      if ($("#password").val() != $("#password2").val()) {
        alert("Mots de passe différents");
        return;
      }

      $.ajax({
        url: "user.php",
        method: "POST",
        contentType: false,
        processData: false,
        data: data,
        dataType: "json",
        success: function(data) {
          alert("Modification réussie");
          document.location.reload();
          //$('#formPassword')[0].reset();  
          //$('#userModal').modal('hide');  


        },
        error: function(e) {
          //alert(e);
        }
      });

    }
  </script>
  <script>
      $(document).ready(function() {
          $('#cartographie-btn').on('click', function(e) {
              e.preventDefault(); // Empêche le comportement par défaut du lien
              $('#liste-branche').toggle(); // Affiche ou cache le menu "Liste Branche"
          });
      });
  </script>
