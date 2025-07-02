<?php
	$connect = "host=localhost port=5432 dbname=collecte_donnees user=postgres password=postgres";
	$dbconn = pg_connect($connect) or die ('Error connecting to pgsql');

?>