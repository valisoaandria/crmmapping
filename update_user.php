<?php
include('connexionBase.php');

$id=$_POST['id'];
$pseudo=$_POST['pseudo'];
$id_region=$_POST['id_region'];
$email=$_POST['email'];
$fonction=$_POST['fonction'];
$contact=$_POST['contact'];

 $req = "update public.user set pseudo='$pseudo',email='$email',fonction='$fonction',region='$id_region' where id=$id";

$edit=pg_query($req);
//fputs(fopen("travail.txt", "a+"), $req);

header('location:user.php');
?>