<?php
if (empty($_GET['name'])||empty($_GET['country']))
 echo 'NO';
 else {
	$arr = array($_GET['name'], $_GET['country']);
 	echo $arr[0].','.$arr[1];
 }
 ?>
