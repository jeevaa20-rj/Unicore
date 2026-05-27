<?php
// signup.php

//
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "HTTP Method Not Allowed"
    ]);
    exit();
}

require_once __DIR__ . '/config/dbh.class.php';
require_once __DIR__ . '/signup.class.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $inputData = json_decode(file_get_contents("php://input"), true);


    $firstname       = isset($inputData['firstName']) ? trim($inputData['firstName']) : '';
    $lastname        = isset($inputData['lastName']) ? trim($inputData['lastName']) : '';
    $phone           = isset($inputData['phoneNumber']) ? trim($inputData['phoneNumber']) : '';
    $enrollment      = isset($inputData['enrollmentNumber']) ? trim($inputData['enrollmentNumber']) : '';
    $email           = isset($inputData['universityEmail']) ? trim($inputData['universityEmail']) : '';
    $password        = isset($inputData['password']) ? $inputData['password'] : '';
    $confirmPassword = isset($inputData['confirmPassword']) ? $inputData['confirmPassword'] : '';

    if (
        empty($firstname) || empty($lastname) || empty($phone) ||
        empty($enrollment) || empty($email) || empty($password) || empty($confirmPassword)
    ) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill all fields."]);
        exit();
    }


    if ($password != $confirmPassword) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Passwords do not match."]);
        exit();
    }

    $signup = new Signup();


    $result = $signup->setUser($firstname, $lastname, $phone, $enrollment, $email, $password);


    if ($result) {
        http_response_code(201); // Created
        echo json_encode(["status" => "success", "message" => "Registration Successful!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Registration Failed. Please try again."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "HTTP Method Not Allowed"]);
}
