<?php

error_reporting(0);
ini_set('display_errors', 0);
header("Content-Type: application/json; charset=UTF-8");

// Allow JSON response only
header("Content-Type: application/json; charset=UTF-8");

// CORS Configuration (React ports)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5175'
];

// Allow only trusted origins
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include classes (safe path)
require_once __DIR__ . '/login.class.php';

// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed"
    ]);
    exit;
}

// Read JSON input from React
$data = json_decode(file_get_contents("php://input"), true);

// Get values safely
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Email and password required"
    ]);
    exit;
}

// // Create login object
// $login = new Login();

// // Call login function
// $result = $login->getUser($email, $password);

// // Return JSON response to React
// echo json_encode($result);
// exit;
try {

    $login = new Login();
    $result = $login->getUser($email, $password);

    echo json_encode($result);
    exit;
} catch (Throwable $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
