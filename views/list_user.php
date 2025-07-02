<?php
	//require_once("../connexionBase.php");
	$params = $_REQUEST;
	
	$columns = array(
		0=>"pseudo",
		1=>"email",
		2=>"region",
		3=>"fonction"
	);
	$res["data"] = array();
	//parametre defaut datatable
	
	
	$sql = "select pseudo, email, region, fonction, id from public.user ";
	if($_POST["active"]!=0){
		$sql .= " AND active=".($_POST["active"]==2?0:1);
	}	
	if(!empty($params["search"]["value"])){
		$sql .= " AND ( email like '%".addslashes($params["search"]["value"])."%' OR ".		
		"region like '%".addslashes($params["search"]["value"])."%' OR ".
		"fonction like '%".addslashes($params["search"]["value"])."%' OR 
		pseudo like '%".addslashes($params["search"]["value"])."%')";
	}
	$totalRecords= pg_num_rows(pg_query($sql));
	
	
	$sql .= " ORDER BY ".$columns[$params['order'][0]['column']]." ".$params['order'][0]["dir"]." LIMIT ".
	$params["start"]." ,".$params["length"];
	fputs(fopen("C:/wamp/www/test.txt", "a+"),$sql);

	if($qr = pg_query($sql)){
		
		while($l = pg_fetch_array($qr)){
			
			$res["data"][] = $l;
			
		}
	}
	$res["draw"] = intval($params["draw"]);
	$res["recordsTotal"] = intval($totalRecords);
	$res["recordsFiltered"] = intval($totalRecords);
	echo json_encode($res);
	