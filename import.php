<?php
include 'connexionBase.php';
if(isset($_POST["Import"])){
		

		//echo $filename=$_FILES["file"]["tmp_name"];

		$filename=$_FILES["file"]["tmp_name"];
		

		 if($_FILES["file"]["size"] > 0)
		 {

		  	$file = fopen($filename, "r");
		  	 fgetcsv($file, 10000, ";");
	         while (($emapData = fgetcsv($file, 10000, ";")) !== FALSE)
	         {
	    
	          //It wiil insert a row to our subject table from our csv file`
	           /*
	           $sql = "INSERT into subject (`SUBJ_CODE`, `SUBJ_DESCRIPTION`, `UNIT`, `PRE_REQUISITE`,COURSE_ID, `AY`, `SEMESTER`) 
	            	values('$emapData[1]','$emapData[2]','$emapData[3]','$emapData[4]','$emapData[5]','$emapData[6]','$emapData[7]')";
	         	*/
	            //echo $emapData[0];
	            echo "<strong>".$emapData[4]."</strong>";	
	            echo"</p>";
	            echo $emapData[0]." -- ".$emapData[1]." -- ".$emapData[2]." -- ".$emapData[3]." -- ".$emapData[4]." -- ".$emapData[5]." -- ".$emapData[6]." -- ".$emapData[7];
	            echo " -- ".$emapData[8]." -- ".$emapData[9]." -- ".$emapData[10]." -- ".$emapData[11]." -- ".$emapData[12]." -- ".$emapData[13]." -- ".$emapData[14]." -- ".$emapData[15];
	            echo " -- ".$emapData[16]." -- ".$emapData[17]." -- ".$emapData[18]." -- ".$emapData[19]." -- ".$emapData[20]." -- ".$emapData[21]." -- ".$emapData[22];
	            echo " -- ".$emapData[24]." -- ".$emapData[25]." -- ".$emapData[26]." -- ".$emapData[27]." -- ".$emapData[28]." -- ".$emapData[29]." -- ".$emapData[30];
	            echo " -- ".$emapData[31]." -- ".$emapData[32]." -- ".$emapData[33]."";
	            echo"</p>";
	            echo "-----------"; echo"</p>";
	            echo"Requete SQL"; echo"</p>";
	            
	            $sql = "UPDATE urcecam SET codecaisse='".$emapData[3]."' WHERE gid=".$emapData[0]."";
	            
	            echo $sql; echo"</p>";
	            echo "-----------"; echo"</p>";
					         
	         //we are using mysql_query function. it returns a resource on true else False on error
	          $result = pg_query($sql);
				if(! $result )
				{
					/*
					echo "<script type=\"text/javascript\">
							alert(\"Invalid File:Please Upload CSV File.\");
							window.location = \"index.php\"
						</script>";
					*/
				}

	         }
	         fclose($file);
	         //throws a message if data successfully imported to mysql database from excel file
	         /*
	         echo "<script type=\"text/javascript\">
						alert(\"CSV File has been successfully Imported.\");
						window.location = \"index.php\"
					</script>";
	         
			 
			*/
			 //close of connection
			pg_close($connect); 
				
		 	
			
		 }
	}	 
?>		 