<?php
  require_once("header.php");
?>
<style>
    body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }
    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>
<div class="container">
    <!--iframe title="Ressources_CRM_Region_Final" src="https://app.powerbi.com/view?r=eyJrIjoiMDUxOWIwMmYtNmM2OS00YTkyLTkzNTEtZmY2OTk2NDkzNmUzIiwidCI6IjRjZDY0YmRlLTYyMmEtNGI2Zi04MGYwLWEzZDlmOGNiNTFlYSIsImMiOjl9&pageName=ReportSection" allowFullScreen="true"></iframe-->
    <iframe title="TDB_FOKONTANY" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiNmU1YmY5MmYtN2Y3OS00Yjc1LWEwNjAtMzk2NGE2YTMwYzVmIiwidCI6IjRjZDY0YmRlLTYyMmEtNGI2Zi04MGYwLWEzZDlmOGNiNTFlYSIsImMiOjl9" frameborder="0" allowFullScreen="true"></iframe>

<?php
    require_once("footer.php")
?>