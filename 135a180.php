 <?php
require_once('db2.php');

//'select medicion_temperatura from temperatura 
//			order by id desc limit 0,1;';

$sql = "SELECT COUNT(grados) from lec_cuna WHERE grados > 134 and grados < 181" ;

$result = $conn->query($sql);


if ($result->num_rows > 0){

    while($row = $result->fetch_assoc()){
        array_push($result_array, $row);
    }
}

echo json_encode($result_array);


$conn->close();