<?php
// API Router for OTP Verification - Handles CORS and routes to the actual OTP handler
session_start();
error_reporting(0);
ini_set('display_errors', 0);

// Set Content-Type FIRST before any other headers
header("Content-Type: application/json; charset=UTF-8");

// ✅ CORS Configuration - Allow Frontend to Access API
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:5173',    // Vite dev server
    'http://localhost:5175',    // Alternative Vite port
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5175'
];

// Always set CORS headers
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

// Pre-flight request handling (OPTIONS)
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400"); // 24 hours

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Handle OTP verification
require_once __DIR__ . '/../phpmailer/signup.class.php';

$data = json_decode(file_get_contents("php://input"), true);
$userOtp = $data['otp'] ?? '';

if (empty($userOtp)) {
    echo json_encode(["status" => "error", "message" => "OTP is required"]);
    exit;
}

if (isset($_SESSION['otp']) && $_SESSION['otp'] == $userOtp) {
    $tempUser = $_SESSION['temp_user'];

    try {
        $signup = new Signup();
        $result = $signup->setUser(
            $tempUser['firstname'],
            $tempUser['lastname'],
            $tempUser['phone'],
            $tempUser['role'],
            $tempUser['identity'],
            $tempUser['email'],
            $tempUser['password']
        );

        if ($result) {
            unset($_SESSION['otp']);
            unset($_SESSION['temp_user']);
            session_destroy();

            echo json_encode(["status" => "success", "message" => "Account verified and created successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database insertion failed."]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid OTP code. Please try again."]);
}
?>

