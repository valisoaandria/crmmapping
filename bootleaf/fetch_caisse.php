<?php
//session_start();
//$connect = _connect("localhost", "root", "clvohama", "mediavite");
require_once("connexionBase.php");
$output = '';
if(isset($_POST["query"]))
{
	$search = pg_escape_string( $_POST["query"]);
	$query = "
	SELECT * FROM caisse_cecam
	/*LEFT JOIN user ON user.id=communique.journaliste */
	WHERE urcecam LIKE '%".$search."%'
	OR caisse LIKE '%".$search."%' 
	";
}
else
{
	$query = "
	SELECT * FROM caisse_cecam
	/*LEFT JOIN user ON user.id=communique.journaliste*/
	 ORDER BY gid";
}
$result = pg_query($query);
if(pg_num_rows($result) > 0)
{
	echo '
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<div class="table-responsive">
					<table class="table table-striped table-bordered table-responsive table-hover">
						<tr>
							<th><center>Code Caisse</center></th>
							<th><center>Caisse</center></th>
							<th><center>URCECAM</center></th>
							<th><center>Membre</center></th>
							<th><center>Membre actif</center></th>
							<th><center>Morale</center></th>
							<th><center>Conseillers</center></th>
							<th><center>Encours Epargne (en 1000Ar)</center></th>
							<th><center>Encours crédit (en 1000Ar)</center></th>
							<th><center>Retard Crédit (en Ar)</center></th>
						</tr>';
	while($row = pg_fetch_array($result))
	{
	echo '
			<tr style="font-size:11px">
				<td><center>'.$row['codecaisse'].'</center></td>
				<td><center>'.$row['caisse'].'</center></td>
				<td><center>'.$row['urcecam'].'</center></td>
				<td><center>'.$row['membre'].'</center></td>
				<td><center>'.$row['membreactif'].'</center></td>
				<td><center>'.$row['morale'].'</center></td>
				<td><center>'.$row['conseillers'].'</center></td>
				<td><center>'.$row['epargne'].'</center></td>
				<td><center>'.$row['credit'].'</center></td>
				<td><center>'.$row['retard'].'</center></td>		
			<td width="10%">
			<button style="font-size:10px" class="btn btn-primary btn-sm"><a href="#edit'.$row['gid'].'" 
			data-toggle="modal" style="color:white"> Modifier <i class="ik ik-edit-2"></i></a></button>&nbsp;';

			/*
			echo '<a href="pdf_invitation.php?id='.$row['id'].'" 
			data-toggle="modal"><i class="ik ik-download"></i></a>';
			
			
			include('show_detail_invitation.php');

			*/
			include('show_edit_caisse.php');

			
			//include('show_delete_.php');

		   
		echo '	</td></tr>';

	
	
	}
		
		//include('show_edit_modal_.php');
		/*<!-- End -->
		<!-- include delete modal -->*/
		//include('show_delete_modal_.php');
		//<!-- End -->

}
else
{
	echo 'Pas de resultat';
}
?>
