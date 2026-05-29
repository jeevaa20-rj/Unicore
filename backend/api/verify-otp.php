<?php
// API Router for OTP Verification - Handles CORS and routes to the actual OTP handler
session_start();
error_reporting(0);
ini_set('display_errors', 0);

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

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

require_once __DIR__ . '/../phpmailer/signup.class.php';

$data = json_decode(file_get_contents("php://input"), true);
$userOtp = trim((string) ($data['otp'] ?? ''));
$email = strtolower(trim((string) ($data['email'] ?? '')));

if ($userOtp === '') {
    echo json_encode(["status" => "error", "message" => "OTP is required"]);
    exit;
}

if ($email === '') {
    echo json_encode(["status" => "error", "message" => "Email is required for verification"]);
    exit;
}
<<<<<<< HEAD
=======

$tempUser = null;

try {
    $signup = new Signup();
    $tempUser = $signup->getPendingUser($email, $userOtp);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    exit;
}

// Fallback: PHP session (same browser cookie path only)
if (!$tempUser && isset($_SESSION['otp'], $_SESSION['temp_user'])) {
    $sessionEmail = strtolower(trim((string) ($_SESSION['temp_user']['email'] ?? '')));
    $sessionOtp = trim((string) $_SESSION['otp']);

    if ($sessionEmail === $email && $sessionOtp === $userOtp) {
        $tempUser = $_SESSION['temp_user'];
    }
}

if (!$tempUser) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid or expired OTP. Sign up again to receive a new code.",
    ]);
    exit;
}

try {
    $signup = new Signup();
    $result = $signup->setUser(
        $tempUser['firstname'],
        $tempUser['lastname'],
        $tempUser['phone'],
        $tempUser['role'] ?? 'student',
        $tempUser['identity'],
        $tempUser['email'],
        $tempUser['password']
    );

    if ($result) {
        $signup->deletePending($email);
        unset($_SESSION['otp'], $_SESSION['temp_user']);

        echo json_encode([
            "status" => "success",
            "message" => "Account verified and created successfully!",
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database insertion failed."]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
>>>>>>> d6c39b3d108dd889e859c0238ecb00fce5243737
