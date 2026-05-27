<?php
header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// login.php
include 'config/dbh.class.php';
include 'login.class.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $inputData = json_decode(file_get_contents("php://input"), true);

    $email = isset($inputData['email']) ? trim($inputData['email']) : '';
    $password = isset($inputData['password']) ? trim($inputData['password']) : '';
    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill all fields"]);
        exit();
    }


    $login = new Login();


    $result = $login->getUser($email, $password);


    if ($result) {
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Login Successful"
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid Email or Password"
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "HTTP Method Not Allowed"]);
}
