<?php
$action = $_GET['action'];
switch($action) {
case 'init_data_list':
	init_data_list();
	break;
case 'add_row':
	add_row();
	break;
case 'del_row':
	del_row();
	break;
case 'edit_row':
	edit_row();
	break;
}

function init_data_list() {
    $sql = "SELECT * FROM `et_data`";
    $query = query_sql($sql);
    while($row = $query->fetch_assoc()){
		$data[] = $row;
	}
    echo json_encode($data);
}

// 连接数据库
function query_sql(){
	$mysqli = new mysqli("127.0.0.1", "root", "", "etable");
	$sqls = func_get_args();
	foreach($sqls as $s){
		$query = $mysqli->query($s);
	}
	$mysqli->close();
	return $query;
}
