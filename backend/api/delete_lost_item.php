<?php

header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
session_start();

include '../config/dbh.class.php';
include 'lostitem.class.php';

if(!isset($_SESSION['user_id'])){
    http_response_code(401);
    echo json_encode(["message" => "Login required"]);
    exit();
}

$id = $_GET['id'] ?? null;
$user_id = $_SESSION['user_id'];

if ($id) {
    $lost = new LostItem();
    $result = $lost->deleteItem($id, $user_id);

    if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "Item deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to delete item or database error occured"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing item ID"]);
}
exit();
?>