<?php
require_once("header.php");
?>
<!--link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" crossorigin=""/>
    <script type="text/javascript" src="https://ff.kis.v2.scr.kaspersky-labs.com/FD126C42-EBFA-4E12-B309-BB3FDD723AC1/main.js?attr=Dpcbv1CzH4wg7krHDitDgcc-XCBAsDcYH77WTT2F1MUPU6cLph6Dk42k82uJ_EloSiYYvxiguMKpiUx5YrfqHtyhyvoD5e3K25eWoLEz3JoQdtVEpn8vE1o-S0408NyfYHI2iQjCzOigfZuK63ua7Q" charset="UTF-8"></script><script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.js" crossorigin=""></script-->

<link rel="stylesheet" href="bootleaf/L.Control.Layers.Tree.css" crossorigin="" />
<script src="bootleaf/L.Control.Layers.Tree.js"></script>
<div id="container">
  <!--div id="sidebar">
    <div class="sidebar-wrapper">
      <div class="panel panel-default" id="features">
        <div class="panel-heading">
          <p class="panel-title"><strong> POINTS D'INTERETS</strong>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-xs-8 col-md-10">
              <input type="text" class="form-control search" placeholder="Recherche" />
            </div>
          </div>
        </div>
        <div class="sidebar-table">
          <table class="table table-hover" id="feature-list" style="padding: 1px;">
            <thead class="hidden">
              <tr>
                <th>Icon</th>
              <tr>
              <tr>
                <th>Name</th>
              <tr>
              <tr>
                <th>Chevron</th>
              <tr>
            </thead>
            <tbody class="list"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div-->
  <div id='alaInfo' style="position: absolute;bottom: 10px; right: 10px; background-color: white; padding: 10px; border: 1px solid #ccc; z-index: 1000; max-width: 500px"><i class="fas fa-info-circle"></i></div>
  <div id="map"></div>
  <!--script src="bootleaf/L.Control.Layers.Tree.js"></script-->
</div>

<?php
require_once("footerProjet.php")
?>