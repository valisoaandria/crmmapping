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
                <p>Cliquez-ici <a href="Manuel_Mapping.pdf" target="_blank">Guide d'utilisation CRM-Mapping.pdf</a></p>
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


    <script src="bootleaf/L.Control.Layers.Tree.js"></script>
    <script src="bootleaf/app20.js"></script>
    <script src="bootleaf/list.js"></script>

    <!--script src="bootstrap-select-1.12.4/dist/js/bootstrap-select.min.js"></script-->

    <script>
      //$('#dataTable').DataTable();
      //$('#dataTable').DataTable();
      var table = $('#dataTable').DataTable({
        "language": {
          "url": 'French.json'
        },
        "processing": true,
        "serverSide": true,
        "ajax": {
          "url": "user.php",
          "type": "POST",
          "error": function() {
            //alert("error");
            $("#dataTable_processing").css('display', 'none');
          },
          "data": function(d) {
            return $.extend({}, d, {
              "active": $('input[type=radio][name=filteractive]:checked').attr('value')
            });
          }
        },
        "columnDefs": [{
            "targets": 0
          },
          {
            "targets": 1
          },
          {
            "targets": 2
          },
          {
            "targets": 3
          },
          {
            "render": actionlinks,
            "data": null,
            "targets": 4,
            "width": "75px"
          }
        ]
      });



      function actionlinks(data, type, link) {

        var key = <?php echo ($module == "user" ? 4 : ($module == "enregistrement" ? 25 : 2)); ?>;
        <?php
        if ($module != "enregistrement" || ($module == "enregistrement" && $_SESSION["user"]["admin"] == 1)) { ?>
          return "<a href='javascript:updateRow(" + link[key] + ");'><i class='fa fa-edit'></i></a> &nbsp; " +
            <?php echo (($_SESSION["user"]["admin"] == 1) ? '"<a href=\'javascript:deleteRow("+link[key]+");\'><i class=\'fa fa-trash\' style=\'color:red\'></i></a>"' : "") ?>;
        <?php } else {
        ?>
          return "";
        <?php } ?>
      }




      <?php
      if ($module == "enregistrement" || $module == "user") {
      ?>

        function traiter() {
          //alert($( '#insert_form' )[0]);
          var data = new FormData($('#insert_form')[0]);
          <?php
          if ($module == "enregistrement") {
          ?>
            if ($('#DATE_PROBLEME').val() == "") {
              alert('Date problème obligatoire');
              return;
            }
            if ($('#CODE_CAISSE').val() == "") {
              alert('Code Caisse obligatoire');
              return;
            }
            if ($('#CODE_MEMBRE').val() == "") {
              alert('Code membre obligatoire');
              return;
            }
            var b = $('input:radio[name=RESOLUTION]')[0].checked;
            if (b) {
              if ($('#DATE_SOLUTION').val() == "") {
                alert('Date solution obligatoire');
                return;
              }
              if ($('#DESC_SOLUTION').val() == "") {
                alert('Solution obligatoire');
                return;
              }

            }
          <?php }
          ?>
          $.ajax({
            url: "<?php echo $module ?>.php",
            method: "POST",
            contentType: false,
            processData: false,
            data: data,
            dataType: "json",
            success: function(data) {
              alert(data.message);
              if (data.error == 0) {
                //$('#insert_form')[0].reset();  
                //$('#add_data_Modal').modal('hide');  

                //reload table
                //table.ajax.reload();

                document.location.reload();
              }
            },
            error: function(e) {
              //alert(e);
            }
          });

        };

      <?php
      } ?>

      function updateRow(id) {

        <?php
        if ($module == "user") { ?>
          $.ajax({
            url: "user.php",
            method: "GET",
            data: {
              cmd: "update",
              id: id
            },
            dataType: "json",
            success: function(data) {
              $('#username').val(data.username);
              $('#email').val(data.email);
              $('#code_region').val(data.code_region);
              $('#fonction').val(data.fonction);
              $('#ID_MODULES').val(data.ID_MODULES);
              $('#nom').val(data.nom);
              $('#prenom').val(data.prenom);
              $('#matricule').val(data.matricule);
              ///$('#image').src.val(data.image);
              $('#image').attr('src', 'img/' + data.image);
              /*$('#password').val("");
              $('#password2').val("");*/
              //$('#SCRIPT').val(data.SCRIPT);
              //$('#SCRIPT').val(data.SCRIPT);
              if (data.active == 1) {
                $('input:radio[name=active]')[0].checked = true;
              } else {
                $('input:radio[name=active]')[1].checked = true;
              }
              if (data.admin == 1) {
                $('input:radio[name=admin]')[0].checked = true;
              } else {
                $('input:radio[name=admin]')[1].checked = true;
              }
              //$('#fichier').val(data.fichier);
              $('#id').val(data.id);
              $('#insert').val("Modifier");
              $('#add_data_Modal').modal('show');
            },
            error(e) {

            }
          });
        <?php
        } else { ?>
          //confirm
          location.href = "<?php echo $module; ?>.php?cmd=update&id=" + id;
        <?php
        } ?>
      }

      function deleteRow(id) {
        if (confirm("Etes-vous sûr de supprimer cet élément?")) {
          location.href = "<?php echo $module; ?>.php?cmd=delete&id=" + id;
        }
      }
    </script>
    </body>

    </html>