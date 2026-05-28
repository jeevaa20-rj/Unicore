<?php
// Diagnostic script - helps identify where the OTP verification is failing
// Place this in backend/api/diagnose.php and visit http://localhost/UniCore/backend/api/diagnose.php

header("Content-Type: application/json; charset=UTF-8");

$diagnostics = [
    "timestamp" => date("Y-m-d H:i:s"),
    "php_version" => phpversion(),
    "server" => $_SERVER['SERVER_NAME'] ?? 'unknown',
    "session_id" => session_id(),
];


try {
    require_once __DIR__ . '/../phpmailer/signup.class.php';
    $diagnostics["signup_class"] = "✓ Loaded successfully";
} catch (Exception $e) {
    $diagnostics["signup_class"] = "✗ Error: " . $e->getMessage();
}

try {
    require_once __DIR__ . '/../config/dbh.class.php';
    $dbh = new Dbh();
    $conn = $dbh->connect();
    if ($conn) {
        $diagnostics["database_connection"] = "✓ Connected successfully";
        $conn->close();
    } else {
        $diagnostics["database_connection"] = "✗ Connection failed";
    }
} catch (Exception $e) {
    $diagnostics["database_connection"] = "✗ Error: " . $e->getMessage();
}

// Test 3: Check session data
session_start();
$diagnostics["session_otp_set"] = isset($_SESSION['otp']) ? "✓ Yes" : "✗ No";
$diagnostics["session_temp_user_set"] = isset($_SESSION['temp_user']) ? "✓ Yes" : "✗ No";


$requiredFiles = [
    'backend/api/signup.php',
    'backend/api/verify-otp.php',
    'backend/api/login.php',
    'backend/phpmailer/signup.php',
    'backend/phpmailer/signup.class.php',
    'backend/phpmailer/login.class.php',
    'backend/config/dbh.class.php',
];

$filesStatus = [];
foreach ($requiredFiles as $file) {
    $fullPath = __DIR__ . '/../../' . $file;
    $filesStatus[$file] = file_exists($fullPath) ? "✓ Exists" : "✗ Missing";
}
$diagnostics["files"] = $filesStatus;

// Test 5: Check if PHPMailer is available
try {
    require_once __DIR__ . '/../phpmailer/vendor/autoload.php';
    $diagnostics["phpmailer"] = "✓ Available";
} catch (Exception $e) {
    $diagnostics["phpmailer"] = "✗ Not found: " . $e->getMessage();
}

echo json_encode($diagnostics, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
