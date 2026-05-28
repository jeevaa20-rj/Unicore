<?php
// verify_otp.php
session_start();
error_reporting(0);
ini_set('display_errors', 0);
header("Content-Type: application/json; charset=UTF-8");

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'Signup.class.php';

$data = json_decode(file_get_contents("php://input"), true);
$userOtp = $data['otp'] ?? '';

if (empty($userOtp)) {
    echo json_encode(["status" => "error", "message" => "OTP is required"]);
    exit;
}

// செஷனில் உள்ள OTP மற்றும் பயனர் விபரங்களைச் சரிபார்த்தல்
if (isset($_SESSION['otp']) && $_SESSION['otp'] == $userOtp) {
    $tempUser = $_SESSION['temp_user'];

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
        // வெற்றிகரமாகச் சேமிக்கப்பட்ட பின் செஷனைத் தூய்மைப்படுத்துதல்
        unset($_SESSION['otp']);
        unset($_SESSION['temp_user']);
        session_destroy();

        echo json_encode(["status" => "success", "message" => "Account verified and created successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database insertion failed."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid OTP code. Please try again."]);
}
