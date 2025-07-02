<?php
	require_once("session.php");
	require_once("ConnexionBase.php");
	//require_once("function.php");
	
	$module = "user";
	
	if(isset($_GET["cmd"])){
		
		if($_GET["cmd"]=="update"){
			$qr = pg_query("select * from user where id=".intval($_GET["id"]));			
			$l = pg_fetch_array($qr);
			header('content-type:application/json');
			echo json_encode($l); 
			exit();
		}else if($_GET["cmd"]=="delete"){
			
			if(pg_query("update user SET deleted=1 where id=".intval($_GET["id"]))){
				
				header("location:".$module.".php?message=Suppression réussie");			
			}else{
				header("location:".$module.".php?message_error=Suppression échouée");	
			}
			exit();
		}		
	}else if(isset($_POST["length"])){
		//list ajax
		require_once("views/list_user.php");
		exit();
	}else if(isset($_POST["cmd"])){
		
		if($_POST["cmd"]=="Valider"){
			$password = $_POST["password"];
			$password2 = $_POST["password2"];
			$req = "update public.user SET mdp='".$password."' where id=".$_SESSION["user"]["id"];
			pg_query($req);
			header('content-type:application/json');	
			echo json_encode(array(
				"error"=>0,
				"message"=>$req
			));
		}else{
			  //update et insertion
			 //Récupération des valeurs sasies dans le form_etudiant.html
				$code_region=(isset($_POST['code_region'])&&$_POST['code_region']!=""?"'".$_POST['code_region']."'":"NULL");
				if(isset($_SESSION["user"]["code_region"])&&$_SESSION["user"]["code_region"]!=""){
					$code_region = $_SESSION["user"]["code_region"];
				}
				$id_modules=(isset($_POST['ID_MODULES'])&&$_POST['ID_MODULES']!="")?"'".$_POST['ID_MODULES']."'":"NULL";
				if(isset($_SESSION["user"]["ID_MODULES"])&&$_SESSION["user"]["ID_MODULES"]!=""){
					$id_modules = $_SESSION["user"]["ID_MODULES"];
				}
				$fonction=$_POST['fonction'];
				$username=$_POST['username'];
				//$password=$_POST['password'];
				$password=chaine_aleatoire();
				$email=$_POST['email'];
				$admin=(isset($_POST['admin'])?$_POST["admin"]:0);
				$active=(isset($_POST['active'])?$_POST['active']:0);
				
					   
			  //requete sql d'insertion  région
			  $up = ($_POST["id"]!="");
			  
			  if($up){
				  $id = intval($_POST["id"]);
				  
				  $req="update user SET 
				  ID_MODULES=".$id_modules.
				  ",code_region=".$code_region.",fonction='".addslashes($fonction)."',username='".$username."',email='".$email."',
				  password='".md5($password)."',active='".$active."',admin='".$admin."'  
				  WHERE id=".$id;
			  }else{
					//requete sql d'insertion  du client
					$req="insert into user(ID_MODULES, code_region, fonction, username, email, password, active, admin) 
					values(".$id_modules.",
					".$code_region.",'".addslashes($fonction)."',
					'".$username."','".$email."','".md5($password)."','".$active."','".$admin."') 
					";
					
			  }
				
			  //execution de la requete
			  if (pg_query($req)){	  
					
					if($active==1){
						$mode = "user_enabled";
						require_once("mail.php");
					}
					header('content-type:application/json');	
					echo json_encode(array(
						"error"=>0,
						"message"=>($up?"Modification réussie":"Insertion réussie")
					));
			  }else{
				  //$message_error=($up?"Modification échouée":"Insertion échouée");
				  //require_once("views/".$module.".php");	
				  //retour json
				  header('content-type:application/json');
				  echo json_encode(array(
						"error"=>1,
						"message"=>($up?"Modification échouée":"Insertion échouée")
					));
			  }
		}  
		 exit();
	}else{
		
		if(isset($_GET["message"])){
			$message = $_GET["message"];
		}else if(isset($_GET["message_error"])){
			$message_error = $_GET["message_error"];
		}
		require_once("views/".$module.".php");
	}
?>