<?php
require_once("connexionBase.php");

$query = "SELECT * FROM fichier_evca";
$sql = pg_query($query);

if ($sql) {
    while ($row = pg_fetch_array($sql)) {
        echo "<tr>
            <td>" . date('d-m-Y', strtotime($row['date'])) . "</td>
            <td>{$row['nom']}</td>
            <td><a href='file/evca/{$row['filename']}' data-toggle='modal' class='btn btn-info btn-sm'><i class='fas fa-download'></i> Télécharger</a></td>
        </tr>";
    }
} else {
    echo "<tr><td colspan='10'>Erreur de chargement des données</td></tr>";
}
?>
