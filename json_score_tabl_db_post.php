<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["dbParams_json"], false);

$conn = new mysqli("sql202.epizy.com", "epiz_23178689", "7d8f6niEEK", "epiz_23178689_Irregular_verbs_challenge");
$stmt = $conn->prepare("INSERT INTO Records (name, score) VALUES ( ? , ? )");
$stmt->bind_param("ss", $obj->name, $obj->score);
$stmt->execute();
$stmt = $conn->prepare("SELECT name, score, date FROM Records ORDER BY score DESC, date DESC");
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
?>