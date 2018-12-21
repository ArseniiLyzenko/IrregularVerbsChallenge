<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET, false);

$conn = new mysqli("sql202.epizy.com", "epiz_23178689", "7d8f6niEEK", "epiz_23178689_Irregular_verbs_challenge");
$stmt = $conn->prepare("SELECT name, score, date FROM Records ORDER BY score DESC");
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
?>