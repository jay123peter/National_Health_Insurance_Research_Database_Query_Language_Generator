<?php
	//set time limit to 600s = 10min
	set_time_limit(1200);

	$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

	$connection = socket_connect($socket,'140.117.171.158', 52001);

	
	$sendarray = array('ActionMode' => $_POST['ActionMode'] ,'sql' => $_POST['sql'], 'selectServer' => $_POST['selectServer'],'selectYear' => $_POST['selectYear'], 'execpasswd' => $_POST['execpasswd']);

	$senddata = json_encode($sendarray);

	socket_write($socket, $senddata."\n");

	$str = socket_read ( $socket, 8192, PHP_NORMAL_READ );
	echo($str);
	

	socket_close($socket);
?>