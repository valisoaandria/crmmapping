<?php
include('connexionBase.php');

$gid = $_GET['gid'];
$name = $_POST['name'];
$tags = $_POST['tags'];
$provider = $_POST['provider'];
$req = "update drapeaux set name='$name',tags='$tags', provider='$provider' where gid=$gid";

$edit = pg_query($req);
//fputs(fopen("travail.txt", "a+"), $req);

header('location:drapeaux.php');
