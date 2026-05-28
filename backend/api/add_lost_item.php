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

if ($_SERVER["REQUEST_METHOD"] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Only POST method allowed"]);
    exit();
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["message" => "Please login first"]);
    exit();
}

$user_id = $_SESSION['user_id'];

$item_name = $_POST['item_name'] ?? '';
$datetime  = $_POST['datetime'] ?? '';
$place     = $_POST['place'] ?? '';
$contact   = $_POST['contact'] ?? '';

if (
    empty($item_name) ||
    empty($datetime) ||
    empty($place) ||
    empty($contact)
) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit();
}

$imageName = '';

if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {

    $imageName = time() . "_" . basename($_FILES['image']['name']);

    $tmpName = $_FILES['image']['tmp_name'];

    $uploadPath = "../uploads/" . $imageName;

    move_uploaded_file($tmpName, $uploadPath);
}

$lost = new LostItem();

$result = $lost->addItem(
    $user_id,
    $item_name,
    $datetime,
    $place,
    $contact,
    $imageName
);

if ($result) {
    http_response_code(201);
    echo json_encode(["message" => "Lost item added successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to add item"]);
}

exit();
?>