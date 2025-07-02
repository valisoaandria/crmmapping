<?php
include('connexionBase.php');

$periode=$_POST['periode'];

 $req = "update caisse_cecam set periode='$periode' where gid>=1";

$edit=pg_query($req);
//fputs(fopen("travail.txt", "a+"), $req);

header('location:caisse.php');
?>