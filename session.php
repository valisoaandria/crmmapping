<?php
	//initialisation de la session
	session_start();
	if(!isset($_SESSION["user"])){
		header("location:logout.php");
		exit();
	}