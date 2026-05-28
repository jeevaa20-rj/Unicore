<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

include '../config/dbh.class.php';
include 'lostitem.class.php';

try {

    $lost = new LostItem();

    $result = $lost->getItems();

    if (!$result) {
        throw new Exception("Database query failed");
    }

    $items = [];

    while ($row = $result->fetch_assoc()) {

        $row['showDelete'] =
            isset($_SESSION['user_id']) &&
            ($_SESSION['user_id'] == $row['user_id']);

        if (!empty($row['item_image'])) {
            $row['item_image'] =
                "http://localhost/UniCore/backend/uploads/" .
                basename($row['item_image']);
        } else {
            $row['item_image'] =
                "https://via.placeholder.com/300x160";
        }

        $items[] = $row;
    }

    echo json_encode($items);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
?>