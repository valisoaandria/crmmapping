  <?php
  //session_start();
    
  if (!isset($_SESSION["user"]["id"]))
        {
    session_start();
    }else{
        echo"";
    }
    require_once("connexionBase.php");
    if (isset($_SESSION["user"]["id"]))
        {
            $query = "SELECT id, pseudo, admin, active, region, mdp FROM public.user WHERE id=".$_SESSION["user"]["id"];
            //echo $query;
            $resultat = pg_query($query);
            $l = pg_fetch_array($resultat);
        }
    else{
        echo "";
    }
    
    $query = pg_query("SELECT count(*) as total FROM balises");
    $row = pg_fetch_array($query);

      $query_drapeaux = pg_query("SELECT count(*) as total_drapeaux FROM drapeaux");
      $row_drapeaux = pg_fetch_array($query_drapeaux);
  
   // Vérifier si le cookie d'acceptation des cookies est défini
      if (!isset($_COOKIE['cookies_accepted'])) {
          // Si non défini, afficher la bannière d'acceptation des cookies
          echo '<div id="cookie-banner" style="position: fixed; bottom: 0; left: 0; width: 100%; background-color: #f1f1f1; text-align: center; padding: 10px; z-index: 100;">
            <p>Ce site web utilise des cookies. En utilisant notre site, vous acceptez l\'utilisation de cookies.
               <button onclick="acceptCookies()">Tout accepter</button>
               <button onclick="rejectCookies()">Refuser</button>
            </p>
          </div>';
      }
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
    <title>Mapping | Croix Rouge Malagasy </title>
    <script src='font-awesome.js'></script>
    <script src="leaflet/leaflet-src.js"></script>
    <script src="leaflet/leaflet.js"></script>
    <link rel="stylesheet" href="leaflet/leaflet.css" />
    <link rel="stylesheet" href="bootleaf/bootstrap.min.css">

    <link rel="stylesheet" href="Leaflet.label-master/libs/leaflet/leaflet.css" />
    <!--[if lte IE 8]><link rel="stylesheet" href="../libs/leaflet/leaflet.ie.css" /><![endif]-->
    <link rel="stylesheet" href="Leaflet.label-master/dist/leaflet.label.css" />
    


    <link rel="stylesheet" href="bootleaf/app.css">
    <link rel="stylesheet" href="leaflet-routing-machine-3.2.5/dist/leaflet-routing-machine.css" />
    <!--link rel="stylesheet" href="bootleaf/lib/leaflet/leaflet.css" /-->
    <link rel="stylesheet" href="bootleaf/lib/opacity/Control.Opacity.css" />
    <link rel="stylesheet" href="bootleaf/lib/jquery/jquery-ui-1.10.3.custom.min.css" />
    <link rel="stylesheet" href="bootleaf/leaflet.zoomhome.css"/>
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
    <link rel="icon" type="image/x-icon"  sizes="120x120" href="bootleaf/icone.png">

        
    <link rel="stylesheet" type="text/css" href="libs/jquery/jquery.dataTables.min.css">
    <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
    <!-- Page level plugin JavaScript-->
        <script src="vendor/datatables/jquery.dataTables.js"></script>
        <script src="vendor/datatables/dataTables.bootstrap4.js"></script>
          <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
  <style>
        .hidden {
            display: none;
        }
    </style>  
    <style>
        /* ---------------------------- */
        /* Défilement de droite à gauche */
        .marquee-rtl {
          overflow: hidden; /* important */
          width:50%; max-width: 30em; /* A ADAPTER */
        }
        .marquee-rtl > div {
          display: inline-block; /* important */
          white-space: nowrap; /* important */
          animation: defilement-rtl 12s infinite linear; /* défilement */
          cursor: pointer;
          padding: 10px 2em 10px 100%;
          padding-top: 15px;
          padding-bottom: 15px;
        }
        .marquee-rtl:hover > div {
          animation-play-state: paused; /* met en pause le défilement */
        }
        .marquee-rtl > div:first-letter {
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
        .marquee-multi-lignes > div { 
          width:90%; 
          white-space: normal; /* important */
        }

        /* ---------------------------- */
        /* déco */
        h2, p { text-align:center; }

        .marquee-rtl {
          margin: 0em auto;
        }
        .marquee-rtl > div {
          font-size: 1.5em;
          color : #ffef6b;
          font-weight : bold;
        }
        </style>

        <style>
          #container {
              text-align: center;
              position: relative;
              overflow: hidden;
          }

          .image {
              max-width: 100%;
              height: auto;
              display: block;
              margin: auto;
          }
          
          /* Ajout de styles pour la transition avec le mot-clé 'smooth' */
          .image-container {
              display: flex;
              transition: opacity 5s ease-in-out;
              max-width: 100%;
              margin: auto;
          }

          .hidden {
              opacity: 0;
              pointer-events: none; /* Désactive les interactions sur les images cachées */
          }


          #left-arrow, #right-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
              font-size: 60px;
          }

          #left-arrow {
              left: 10px;
          }

          #right-arrow {
              right: 10px;
          }

          @media (max-width: 768px) {
              #left-arrow, #right-arrow {
                  font-size: 40px;
              }
          }
      </style>
      <style>
              .square-container {
                  display: flex;
                  justify-content: center;
              }

              .square {
                  width: 50px;
                  height: 50px;
                  background-color: #3498db;
                  margin: 0 10px;
                  cursor: pointer;
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
                if(isset($_SESSION["user"]["id"])){
            ?>                    
            <li class="dropdown">
              <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fas fa-cogs white"></i><b>&nbsp;&nbsp; MISE A JOUR</b> <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="balises" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-edit" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">BALISES</strong></a></li>
                <!--li class="divider hidden-xs"></li-->
                <li><a href="caisse" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-edit" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">DRAPEAUX</strong></a></li>
                <li><a href="user" data-toggle="collapse" data-target=".navbar-collapse.in" id="modification-btn"><i class="fa fa-users" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">UTILISATEUR</strong></a></li>
                <li><a href="#" data-toggle="modal" data-target="#userModal"><i class="fa fa-key" style="color:red;size: 10px"></i>&nbsp;&nbsp;<strong style="font-size: 10px">MOT DE PASSE</strong></a></li>

              </ul>
            </li>
            
            <?php
                
                }else{
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
            <li class="hidden-xs"><a href="carte"><i class="fa fa-map white"></i>&nbsp;&nbsp;CARTE VULNERABILITE</a></li>
            <li class="hidden-xs"><a href="projet"><i class="fa fa-map white"></i>&nbsp;&nbsp;CARTOGRAPHIE PROJET</a></li>
            <li class="hidden-xs">
              <a href="fichier">
                  <i class="fa fa-folder white"></i><b>&nbsp;&nbsp;GESTION DE FICHIER</b>
              </a>
          </li>
            <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="about-btn"><i class="fa fa-question-circle white"></i><b>&nbsp;&nbsp;A PROPOS</b></a></li> 
        <div class="marquee-rtl">
        <div><?php echo $row["total"];?> BALISES ET <?php echo $row_drapeaux["total_drapeaux"];?> DRAPEAUX MIS EN PLACE DANS LES FOKONTANY CIBLES</div>
        </div>
      </ul>
      <ul class="nav navbar-nav navbar-right">
            <?php 
                if(isset($_SESSION["user"]["id"])){
            ?>
            <li class="hidden-xs"><a href="logout" ><i class="fa fa-user white"></i>&nbsp;&nbsp;<b>SE DECONNECTER</b></a></li>
            <?php
                }else{
            ?>
                <li class="hidden-xs"><a href="login" ><i class="fa fa-user white"></i><b>&nbsp;&nbsp;SE CONNECTER</b></a></li>
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
            <h5 class="modal-title" id="exampleModalLabel">Modification "Mot de passe"</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
      <form name="formPassword" id="formPassword">
        <label>Login</label>  
        <input type="text" readOnly="true" value="<?php echo $_SESSION["user"]["pseudo"];?>" class="form-control" />  
        <br />
        <label>Password</label>  
        <input type="password" name="password" id="password" class="form-control" required/>  
        <br />
        <label>Confirmation</label>  
        <input type="password" name="password2" id="password2" class="form-control" required/> 
        <br/>
        <input type="hidden" name="cmd" value="Valider"/>
        <input type="button" value="Valider" class="btn btn-success" onclick="updatePassword();" />
        <button class="btn btn-secondary" type="button" data-dismiss="modal" align="right">Cancel</button>
    </form>
    </div>
        </div>
      </div>
    </div>
    <!-- End of Change Password -->


<div id="container">
    <div class="image-container" id="container1">
        <img src="img/1.png" class="image">
    </div>
    <div class="image-container hidden" id="container2">
        <img src="img/2.png" class="image">
    </div>
    <!--div class="image-container hidden" id="container2">
        <img src="img/formation_2.jpg" class="image">
    </div-->
    <div id="left-arrow" onclick="changeImage(-1)">&#8249;</div>
    <div id="right-arrow" onclick="changeImage(1)">&#8250;</div>

    
</div>

    <div class="square-container">
        <div class="square" onclick="navigateToPage('page1.html')"></div>
        <div class="square" onclick="navigateToPage('page2.html')"></div>
        <div class="square" onclick="navigateToPage('page3.html')"></div>
    </div>
    
  <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3 class="modal-title"> <img src=" bootleaf/icone.png"> &nbsp Welcome to the Webmapping of Malagasy Red Cross!</h3>
          </div>
          <div class="modal-body">
            <ul class="nav nav-tabs nav-justified" id="aboutTabs">
              <li class="active"><a href="#about" data-toggle="tab"><i class="fa fa-question-circle"></i>&nbsp;A propos du projet</a></li>
              <li><a href="#contact" data-toggle="tab"><i class="fa fa-envelope"></i>&nbsp;Contact</a></li>
              <li><a href="#disclaimer" data-toggle="tab"><i class="fa fa-user"></i>&nbsp;Auteur</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-globe"></i>&nbsp;Guide d'utilsation <b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="#guide-tab" data-toggle="tab">Guide</a></li>
                </ul>
              </li>
            </ul>
            <div class="tab-content" id="aboutTabsContent">
              <div class="tab-pane fade active in" id="about">
                <p>Carte Numérique Croix Rouge Malagasy.</p>
              </div>
              <div id="disclaimer" class="tab-pane fade text">
                <p>© CRM - CRA 2023</p>
                </div>
              <div class="tab-pane fade" id="contact">
                <form id="contact-form">
                  <div class="well well-sm">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="first-name">First Name:</label>
                          <input type="text" class="form-control" id="first-name">
                        </div>
                        <div class="form-group">
                          <label for="last-name">Last Name:</label>
                          <input type="text" class="form-control" id="last-email">
                        </div>
                        <div class="form-group">
                          <label for="email">Email:</label>
                          <input type="text" class="form-control" id="email">
                        </div>
                      </div>
                      <div class="col-md-8">
                        <label for="message">Message:</label>
                        <textarea class="form-control" rows="8" id="message"></textarea>
                      </div>
                      <div class="col-md-12">
                        <p>
                          <button type="submit" class="btn btn-primary pull-right" data-dismiss="modal">Submit</button>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="tab-pane fade" id="guide-tab">
                <p>Cliquez-ici <a href="Manuel_Mapping.pdf" target="_blank">Guide d'utilisation CECAM-Mapping.pdf</a></p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->




    <div class="modal fade" id="featureModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title text-primary" id="feature-title"></h4>
          </div>
          <div class="modal-body" id="feature-info"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal fade" id="attributionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">
              Developed by <a href='#'>Valisoa Andriamiadanarivo</a>
            </h4>
          </div>
          <div class="modal-body">
            <div id="attribution"></div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    
      <!-- Page level plugin JavaScript-->
    <script src="vendor/datatables/jquery.dataTables.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.js"></script>
    <script src="Leaflet.label-master/libs/leaflet/leaflet-src.js"></script>

    <script src="Leaflet.label-master/src/Label.js"></script>
    <script src="Leaflet.label-master/src/BaseMarkerMethods.js"></script>
    <script src="Leaflet.label-master/src/Marker.Label.js"></script>
    <script src="Leaflet.label-master/src/CircleMarker.Label.js"></script>
    <script src="Leaflet.label-master/src/Path.Label.js"></script>
    <script src="Leaflet.label-master/src/Map.Label.js"></script>
    <script src="Leaflet.label-master/src/FeatureGroup.Label.js"></script>
     
    <script src="bootleaf/lib/opacity/Control.Opacity.js"></script>   
    <script src="bootleaf/lib/jquery/jquery-1.9.1.js"></script>
    <script src="bootleaf/lib/jquery/jquery-ui-1.10.3.custom.min.js"></script>
    <!--script src="leaflet-routing-machine-3.2.5/dist/leaflet-routing-machine.js"></script>
    <script src="leaflet-routing-machine-3.2.5/dist/leaflet-routing-machine.min.js"></script-->
    <script src="bootleaf/typeahead.bundle.min.js"></script>
    <script src="bootleaf/handlebars.min.js"></script>
    <script src="bootleaf/list.min.js"></script>
    <!--script src="bootleaf/leaflet.js"></script>    
    <script src="bootleaf/leaflet-src.js"></script--> 
    <script src="bootleaf/Leaflet.PolylineMeasure.js"></script>
    <script src="bootleaf/leaflet.markercluster.js"></script>
    <script src="bootleaf/L.Control.Locate.min.js"></script>
    <script src="bootleaf/leaflet.groupedlayercontrol.js"></script>
    <script src="L.Control.BoxZoom-master/dist/leaflet-control-boxzoom-src.js"></script>
    <script src="L.Control.BoxZoom-master/dist/leaflet-control-boxzoom.js"></script>
    <script src="leaflet.zoomhome-master/dist/leaflet.zoomhome.js"></script>
    <script src="leaflet.zoomhome-master/dist/leaflet.zoomhome.min.js"></script>
    <script src="leaflet-globeminimap-master/dist/d3.min.js"></script>
    <script src="leaflet-globeminimap-master/dist/topojson.min.js"></script>
    <script src="leaflet-globeminimap-master/dist/Control.GlobeMiniMap.min.js"></script>

    <link rel="stylesheet" href="Leaflet.OpacityControls-master/lib/opacity/Control.Opacity.css" />
    <script src="Leaflet.OpacityControls-master/lib/opacity/Control.Opacity.js"></script>
    <script src="jquery-ui-1.10.3/jquery-1.9.1.js"></script>
    <script src="bootleaf/lib/jquery/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="bootleaf/bootstrap.min.js"></script>
  
    <script src="bootleaf/list.js"></script>


    <script>
        let currentIndex = 0;

        function changeImage(direction) {
            const containers = document.querySelectorAll('.image-container');
            const totalContainers = containers.length;

            currentIndex = (currentIndex + direction + totalContainers) % totalContainers;
            const translateValue = -currentIndex * 100 + '%';

            containers.forEach((container, index) => {
                if (index === currentIndex) {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
            });
        }

        function navigateToPage(page) {
            // Redirigez vers la page spécifiée
            window.location.href = page;
        }

         function autoChangeImage() {
            setInterval(() => {
                changeImage(1);
            }, 10000);
        }

        autoChangeImage();
    </script>

        <!--div id="container" style="text-align: center; margin-top: 40px;">
           <img src="img/wallpaper.png" style="max-width: 80%; height: 90%; display: block; margin: auto;">
        </div-->

    <script>
    // Fonction pour définir le cookie d'acceptation des cookies
    function acceptCookies() {
        // Définir le cookie avec une date d'expiration d'un an
        var date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        document.cookie = "cookies_accepted=true; expires=" + date.toUTCString() + "; path=/";

        // Cacher la bannière une fois que les cookies sont acceptés
        document.getElementById('cookie-banner').style.display = 'none';
    }

    // Vérification si le cookie est déjà défini
    function checkCookie() {
        if (document.cookie.split('; ').find(row => row.startsWith('cookies_accepted='))) {
            // Si le cookie est défini, cacher la bannière
            document.getElementById('cookie-banner').style.display = 'none';
        }
    }

    // Fonction pour refuser les cookies (vous pouvez ajuster cette fonction en fonction de vos besoins)
    function rejectCookies() {
        // Vous pouvez ajouter ici des actions spécifiques pour traiter le refus des cookies
        alert("We respect your choice. This website does not use cookies.");

        // Cacher la bannière de cookies
        document.getElementById('cookie-banner').style.display = 'none';
    }

    // Appeler la fonction checkCookie au chargement de la page
    window.onload = checkCookie;
</script>



  </body>
</html>
