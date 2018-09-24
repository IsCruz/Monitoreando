<?php
	//allow external access
	header('Access-Control-Allow-Origin:*');
	//connection info
	$server = 'localhost';
	$user = 'root';
	$password = '';
	$database = 'Monitoreando';
	//connection
	$connection = mysqli_connect($server, $user, $password, $database);
	//error in connection
	if ($connection === false) { 
		echo 'Could not connect to server';
		die; //end application
	}
	//query
	$query = 'select * from DatosSala';
	//command
	$command = $connection->prepare($query);
	//execute
	$command->execute();
	//bind result
	$command->bind_result($id,$temp,$hum,$CO2,$date);
	
	
	
	//json start
	echo '{ "status" : 0, "Data Room" : [';
	//fetch data
	$first = true;
	while($command->fetch()) {
		if (!$first) echo ','; $first = false;  
		echo '{ 
				"No. Room" : "'.$id.'",
				"Temperature" : "'.$temp.' C",
				"Humidity" : "'.$hum.' %",
				"CO2" : "'.$CO2.' PPM",
				"Date & Time" : "'.$date.'"
				}';
	}
	//end json
	echo '] }';
	
	
	//close connection
	mysqli_stmt_close($command);
	$connection->close();
	
	
	
	
	
	
	
	