            <?php

require_once('db2.php');

//'select medicion_temperatura from temperatura 
//			order by id desc limit 0,1;';

$sql = "SELECT idLec_sala,tempe,humedad,CO2,fecha FROM lec_salas order by fecha desc  limit 0,1";

$result = $conn->query($sql);


if ($result->num_rows > 0){

    while($row = $result->fetch_assoc()){
        array_push($result_array, $row);
    }
}

echo json_encode($result_array);


$conn->close();