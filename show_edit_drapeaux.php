<!-- Edit Model -->

<div class="modal fade" id="edit<?php echo $row['gid']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <center>
                    <h4 class="modal-title" id="myModalLabel">Modification Information Drapeaux</h4>
                </center>

                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <?php
                $query = "select * from drapeaux where gid=" . $row['gid'];
                //echo $query;
                $edit = pg_query($query);
                $erow = pg_fetch_array($edit);
                ?>
                <div class="container-fluid">
                    <form method="POST" action="update_drapeaux.php?gid=<?php echo $erow['gid']; ?>" enctype="multipart/form-data">
                        </br>
                        <div class="row">
                            <div class="col-lg-4" align="left">
                                <label style="position:relative; top:7px;">Name:</label>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" name="name" class="form-control" value="<?php echo $erow['name']; ?>" readonly="true">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4" align="left">
                                <label style="position:relative; top:7px;">Tags:</label>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" name="tags" class="form-control" value="<?php echo $erow['tags']; ?>">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4" align="left">
                                <label style="position:relative; top:7px;">Provider:</label>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" name="provider" class="form-control" value="<?php echo $erow['provider']; ?>">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="submit" class="btn btn-primary" value="Enregistrer">
                            <button type="button" class="btn btn-default" data-dismiss="modal"></span> Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /.modal -->