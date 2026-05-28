<?php
// API Router for Signup - Handles CORS and routes to the actual signup handler
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

// Include the actual signup handler
require_once __DIR__ . '/../phpmailer/signup.php';
