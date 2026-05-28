<?php

header("Content-Type: application/json; charset=UTF-8");

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5175',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5175',
];

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400");

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