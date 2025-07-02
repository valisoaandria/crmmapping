<?php
	session_start();
	require_once("connexionBase.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>CRM - Mapping</title>
  <link rel="shortcut icon" href="img/ARANTA.jpg">
  <!-- Bootstrap core CSS-->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom fonts for this template-->
  <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Custom styles for this template-->
  <link href="sb-admin.css" rel="stylesheet">
  <style>
	body::before {
    content: "";
    background-image: url('img/rrc.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(3px); /* Ajustez la valeur (5px) pour contrôler le niveau de flou souhaité */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

      .mt-5, .my-5 {
          margin-top: 12rem !important;
      }
  </style>
</head>

    <?php
        //Parametre de la base
    if(isset($_POST['OK'])) {
        $identification = true;
        $pseudo = $_POST['pseudo'];
        $mdp = $_POST['mdp'];
        $query= "SELECT id, pseudo, admin, active, region, mdp
        FROM public.user WHERE pseudo='".$pseudo."' AND mdp='".md5($mdp)."' AND active=1";
				//echo $query;
          
        $resultat = pg_query ($query);
        if(pg_num_rows($resultat) > 0) {
			
			$_SESSION["user"] = pg_fetch_array($resultat);
    ?>
    <script language="javascript">
    document.location = "index";
    </script>

    <?php     
       }else{
     
		$identification = false;  
    
     }  
}
?>

<body class="bg-dark">
  <form  name="form1"  method="post" action="">
    <div id="login-header">
    <!--h1 class="text-center">
      <a href="index.php"><img id="logo" src="img/logo.png" width="123px" height="124px" alt="SIGSA" /></a>
    </h1-->
  <div class="container">
    <div class="card card-login mx-auto mt-5">
      <center><img src="img/ARANTA.jpg" style="width:125px"></center>
      <h5><div class="card-header" href="img/ARANTA.jpg"align="center"><strong>Croix Rouge Malagasy - Mapping</strong></div></h5>
      <div class="card-body">
          
          <div class="input-group" style="padding-bottom:1em;">
            <span style="background-color:#cccccc;padding:7px;"><i class="fa fa-user"></i></span><input class="form-control" name="pseudo" id="pseudo" type="text" placeholder="Username" >
          </div>
          <div class="input-group" style="padding-bottom:2em;">
            <span style="background-color:#cccccc;padding-bottom:7px;padding-top:7px;padding-left:8px;padding-right:7px;"><i class="fa fa-lock"></i></span><input class="form-control" name="mdp" id="mdp" type="password" placeholder="Password">
          </div>
          <div class="form-group">
          </div>
          <input class="btn btn-danger btn-block" name="OK" type="submit" id="OK" value="SE CONNECTER"/>
        
          <hr>
        <div class="text-center">
          <a href="index" style="font-size:11px;color:black;">Retour à la Page d'Accueil</a>
        </div>
      </div>
    </div>
  </div>


  </div>
    <p>
  </p>
  <p>
  </p> 
    <div id="login-footer">
    <p class="text-center text-muted">
      <a style="color:black" >
        &copy; Copyright CRM-MApping&#8482; | CRM - 2023
      </a>
    </p>
  </div>
  </form>
  <!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
  <script language="javascript">
	$('#username').focus();
  </script>
</body>

</html>
