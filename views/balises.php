<?php
require_once("header.php");
require_once("connexionBase.php");
?>

<script src="libs/jquery/jquery.min.js"></script>
<script src="libs/jquery/bootstrap.min.js"></script>
<script type="text/javascript" src="libs/jquery/jquery-3.3.1.js"></script>
<script type="text/javascript" src="libs/jquery/jquery.dataTables.min.js"></script>
<div class="container mt-5">
    <h3 class="text-center mb-4">Modification Données Balises</h3>
    <div class="table-responsive">
        <table id="example" class="table table-striped table-bordered hidden" style="width:100%; font-size:11px;">
            <thead class="thead-dark">
                <tr>
                    <th>
                        <center>Nom</center>
                    </th>
                    <th>
                        <center>Description</center>
                    </th>
                    <th>
                        <center>Date</center>
                    </th>
                    <th>
                        <center>Tessellate</center>
                    </th>
                    <th>
                        <center>Extrude</center>
                    </th>
                    <th>
                        <center>Visibility</center>
                    </th>
                    <th>
                        <center>Accuracy</center>
                    </th>
                    <th>
                        <center>Provider</center>
                    </th>
                    <th>
                        <center>MODIFIER</center>
                    </th>
                    <th>
                        <center>SUPPRIMER</center>
                    </th>
                </tr>
            </thead>
            <tbody>
                <?php
                $query = "SELECT * FROM balises";
                $sql = pg_query($query);
                while ($row = pg_fetch_array($sql)) {
                ?>
                    <tr>
                        <td>
                            <center><?php echo $row['name']; ?></center>
                        </td>
                        <td>
                            <center><?php echo $row['descriptio']; ?></center>
                        </td>
                        <td>
                            <center><?php echo $row['timestamp']; ?></center>
                        </td>
                        <td>
                            <center><?php echo $row['tessellate']; ?></center>
                        </td>
                        <td>
                            <center><?php echo $row['extrude']; ?></center>
                        </td>
                        <td>
                            <center><?php echo $row['visibility']; ?></center>
                        </td>
                        <td>
                            <center><?php echo $row['accuracy']; ?></center>
                        </td>
                        <td>
                            <center><?php echo $row['provider']; ?></center>
                        </td>
                        <td>
                            <center><a href="#edit<?php echo $row['gid']; ?>" data-toggle="modal" class="btn btn-info btn-sm"><i class="fas fa-edit"></i> Modifier</a></center>
                        </td>
                        <td>
                            <center><a href="delete.php?gid=<?php echo $row['gid']; ?>" class="btn btn-danger btn-sm" onClick="return confirm('Are you sure you want to delete?')"><i class="fas fa-trash-alt"></i> Supprimer</a></center>
                        </td>
                    </tr>
                <?php
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        $('#example').DataTable({
            "scrollY": "350px",
            "scrollCollapse": true,
            "paging": true,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
            }
        });

        // Rendre le tableau visible une fois qu'il est initialisé
        $('#example').removeClass('hidden');
    });
</script>
</body>

</html>