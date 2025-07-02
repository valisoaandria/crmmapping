  <?php
      require_once("header.php");
  ?>
  <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"-->
  <script src="libs/jquery/jquery.min.js"></script>

  <script src="libs/jquery/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css" href="libs/jquery/jquery.dataTables.min.css">


  <script src='https://kit.fontawesome.com/a076d05399.js'></script>

	<div class="container" style="width: 50%;">
		<br>
		<a href="#editPeriode" data-toggle="modal" class="btn btn-info" style=";font-size:11px;">Periode/unite</a><br><br>
		<div class="row">
             <table id="example" class="display" style="width:100%;font-size:11px;">
        <thead>
            <tr>
            	<!--th><center>id</center></th-->
                <th><center>Login</center></th>
				<th><center>Region</center></th>
				<th><center>Email</center></th>
				<th><center>Fonction</center></th>
				<th><center>Fonction</center></th>
                
            </tr>
        </thead>
        <tbody>
        	<?php
                /*
        	      include("connexionBase.php");
                  $query ="SELECT *,nom_region FROM public.user INNER JOIN regions ON region = id_region";
                  $sql = pg_query($query);
                  while($row = pg_fetch_array($sql))
                  {
                */
        	?>
            <!--tr>
            	<td><center><?php echo $row['gid'];?></center></td>
                <td><center><?php echo $row['pseudo'];?></center></td>
				<td><center><?php echo $row['nom_region'];?></center></td>
				<td><center><?php echo $row['email'];?></center></td>
				<td><center><?php echo $row['fonction'];?></center></td>	
                <td><a href="#edit<?php echo $row['id'];?>" data-toggle="modal" class="btn btn-info" style=";font-size:11px;">Modifier</a></td>
              <td>  <a href="delete.php?gid=<?php echo $row['gid'];?>" class="btn btn-danger" onClick="return confirm('Are you sure you want to delete?')">Supprimer</a></td>
                 
            </tr-->
            <?php 
            //include('show_edit_user.php');
        	//include('show_edit_user.php');		
        	//} 
        	?>
            
        </tbody>
        
    </table>

		</div>
	</div>
</body>
</html>
<script type="text/javascript" src="libs/jquery/jquery-3.3.1.js"></script>
<script type="text/javascript" src="libs/jquery/jquery.dataTables.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    $('#example').DataTable( {
        "scrollY":        "350px",
        "scrollCollapse": true,
        "paging":         true
    } );
} );
</script>
