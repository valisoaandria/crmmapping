<div class="modal fade" id="edit<?php echo $row['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<center><h4 class="modal-title" id="myModalLabel">Modification User</h4></center>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<?php
				$query = "select * from public.user where id=".$row['id'];
				//echo $query;
				$edit=pg_query($query);
				$erow=pg_fetch_array($edit);
				?>
				<div class="container-fluid">
					<form method="POST" action="update_user.php" enctype="multipart/form-data">
						<input type="hidden" name="id" value="<?php echo $erow["id"];?>">
						</br>
						<div class="row">
							<div class="col-lg-4" align="left">
								<label style="position:relative; top:7px;">Login:</label>
							</div>
							<div class="col-lg-8">
								<input type="text" name="pseudo" class="form-control" value="<?php echo $erow["pseudo"];?>">
							</div>
						</div>
						</br>
						<div class="row">
							<div class="col-lg-4" align="left">
								<label style="position:relative; top:7px;">email:</label>
							</div>
							<div class="col-lg-8">
								<input type="text" name="email" class="form-control" value="<?php echo $erow["email"];?>">
							</div>
						</div>
						</br>
						<div class="row">
							<div class="col-lg-4" align="left">
								<label style="position:relative; top:7px;">Fonction:</label>
							</div>
							<div class="col-lg-8">
								<input type="text" name="fonction" class="form-control" value="<?php echo $erow["fonction"];?>">
							</div>
						</div>
						</br>
						<div class="row">
							<div class="col-lg-4" align="left">
	                      		<label for="id_region">Region</label>
	                      	</div>
	                      	<div class="col-lg-8" align="left">
			                      <select name="id_region" id="id_region" style="width:100%;margin-bottom:15px;padding:8px;border:1px solid #ccc;border-radius: 2px;">                       
			                                <option value="">-- REGION --</option>
			                                <?php 
			                                    $requete="select id_region,nom_region from regions"; 
			                                    $resultat=pg_query($requete);
			                                    $i = 0; while ($i < pg_num_rows($resultat)) {   
			                                    $id_r = pg_fetch_array($resultat);
			                                ?>
			                                ?>
			                                <option value="<?php echo $id_r["id_region"];?>"><?php echo $id_r['nom_region'];?></option>
			                                <?php $i++;  }?>
			                                </select>
			                </div>
			            </div>    
						<div class="modal-footer">
							<input type="submit" class="btn btn-primary" value="Enregistrer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /.modal -->