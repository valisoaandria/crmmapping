<div class="modal fade" id="updatePeriode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<center><h4 class="modal-title" id="myModalLabel">Modification Période</h4></center>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<?php
				$query = "select periode from caisse_cecam where gid=".$row['gid'];
				$edit=pg_query($query);
				$erow=pg_fetch_array($edit);
				?>
				<div class="container-fluid">
					<form method="POST" action="edit_periode.php" enctype="multipart/form-data">
						</br>
						<div class="row">
							<div class="col-lg-4" align="left">
								<label style="position:relative; top:7px;">Periode:</label>
							</div>
							<div class="col-lg-8">
								<input type="text" name="periode" class="form-control" value="<?php echo $erow["periode"];?>">
							</div>
						</div>
						</br>
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