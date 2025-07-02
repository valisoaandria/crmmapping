<?php
require_once("header.php");
require_once("connexionBase.php");
?>



</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onglets sans Bootstrap</title>
    <style>
        /* Conteneur des onglets */
        .nav-tabs {
            display: flex;
            border-bottom: 2px solid #ddd;
            padding: 0;
            list-style: none;
            margin: 0;
        }

        /* Onglets individuels */
        .nav-tabs .nav-item {
            margin-right: 5px;
        }

        .nav-tabs .nav-link {
            display: inline-block;
            padding: 10px 15px;
            color: #555;
            text-decoration: none;
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            border-bottom: none;
            border-radius: 5px 5px 0 0;
            transition: background-color 0.3s, color 0.3s;
        }

        .nav-tabs .nav-link:hover {
            background-color: #e0e0e0;
            color: #333;
        }

        /* Onglet actif */
        .nav-tabs .nav-link.active {
            background-color: #ffffff;
            color: #000;
            font-weight: bold;
            border-bottom: 2px solid transparent;
        }

        /* Contenu des onglets */
        .tab-content {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 5px 5px 5px;
            background-color: #ffffff;
            margin-top: -2px;
        }

        /* Cacher les sections par défaut */
        .tab-pane {
            display: none;
        }

        /* Montrer la section active */
        .tab-pane.active {
            display: block;
        }
    </style>
</head>
<body>

<div class="container">   
    <script src="libs/jquery/jquery.min.js"></script>
    <script src="libs/jquery/bootstrap.min.js"></script>
    <script src="libs/jquery/jquery.dataTables.min.js"></script>
    <style type="text/css">
     .container {
        width: 100%;
      } 
    </style>
     
    <div class="container mt-12">
        <h3 class="text-center mb-4">GESTION FICHIERS</h3>

        <!-- Tabs -->
        <ul class="nav nav-tabs" id="dataTabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="drapeaux-tab" data-toggle="tab" href="#drapeaux" role="tab" aria-controls="drapeaux" aria-selected="true">
                    📊 Rapport EVCA
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="balises-tab" data-toggle="tab" href="#balises" role="tab" aria-controls="balises" aria-selected="false">
                    📄 Données PRRC
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="markers-tab" data-toggle="tab" href="#markers" role="tab" aria-controls="markers" aria-selected="false">
                    📈 Données Ressources CRM
                </a>
            </li>
        </ul>


        
    </div>

    <!-- Tab Content -->
    <div class="tab-content mt-12" id="dataTabsContent">
        <!-- Drapeaux Tab -->
        <div class="tab-pane fade show active" id="drapeaux" role="tabpanel" aria-labelledby="drapeaux-tab">
            <div class="table-responsive">
                <table id="drapeauxTable" class="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>TELECHARGER</th>
                        </tr>
                    </thead>
                    <tbody id="drapeauxBody">
                        <!-- Data loaded via AJAX -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Balises Tab -->
        <div class="tab-pane fade" id="balises" role="tabpanel" aria-labelledby="balises-tab">
            <div class="table-responsive">
                <table id="balisesTable" class="table table-striped table-bordered" style="width:100%; font-size:11px;">
                    <thead class="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>TELECHARGER</th>
                        </tr>
                    </thead>
                    <tbody id="balisesBody">
                        <!-- Data loaded via AJAX -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Markers Tab -->
        <div class="tab-pane fade" id="markers" role="tabpanel" aria-labelledby="markers-tab">
            <div class="table-responsive">
                <table id="markersTable" class="table table-striped table-bordered" style="width:100%; font-size:11px;">
                    <thead class="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>TELECHARGER</th>
                        </tr>
                    </thead>
                    <tbody id="markersBody">
                        <-- Data loaded via AJAX -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function() {
        // Load data for each tab
        function loadData(tab, target) {
            $.ajax({
                url: `fetch_${tab}.php`, // Each tab has its own fetch file
                type: 'GET',
                success: function(data) {
                    $(target).html(data); // Insert rows into the appropriate tbody
                    $(`#${tab}Table`).DataTable({
                        "scrollY": "350px",
                        "scrollCollapse": true,
                        "paging": true,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
                        }
                    });
                },
                error: function() {
                    alert("Erreur lors du chargement des données");
                }
            });
        }

        // Load data when each tab is clicked
        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            var targetTab = $(e.target).attr("href").replace("#", "");
            var targetBody = `#${targetTab}Body`;
            if ($(targetBody).is(':empty')) {
                loadData(targetTab, targetBody);
            }
        });

        // Initial load for the first tab
        loadData('drapeaux', '#drapeauxBody');
    });
</script>
<script>
    // JavaScript pour gérer le changement d'onglet
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Supprimer la classe active de tous les liens et sections
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

            // Ajouter la classe active à l'onglet et au contenu sélectionné
            this.classList.add('active');
            const target = document.querySelector(this.getAttribute('href'));
            target.classList.add('active');
        });
    });
</script>

</body>
</html>
