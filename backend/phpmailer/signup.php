<?php
// signup.php
session_start();
error_reporting(0);
ini_set('display_errors', 0);
header("Content-Type: application/json; charset=UTF-8");

// CORS அமைப்புகள் (Vite Ports 5173, 5175)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
require_once __DIR__ . '/../config/mail_config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// React JSON தரவை எடுத்தல்
$data = json_decode(file_get_contents("php://input"), true);

$firstname  = $data['firstName'] ?? '';
$lastname   = $data['lastName'] ?? '';
$phone      = $data['phoneNumber'] ?? '';
$role       = $data['roleType'] ?? 'student'; // 'student' அல்லது 'staff'
$email      = strtolower(trim($data['universityEmail'] ?? '')); // சிறிய எழுத்துக்களாக மாற்றுதல்
$password   = $data['password'] ?? '';

// பயனர் நிலையைப் பொறுத்து அடையாள எண்ணைத் தேர்ந்தெடுத்தல் (Identity Logic)
$identity = "";
if ($role === 'student') {
    $identity = $data['enrollmentNumber'] ?? '';
} else if ($role === 'staff') {
    $identity = $data['staffId'] ?? '';
}

// 1. அத்தியாவசியப் புலங்கள் காலியாக உள்ளதா எனச் சரிபார்த்தல்
if (empty($firstname) || empty($email) || empty($password) || empty($identity)) {
    echo json_encode(["status" => "error", "message" => "Required fields are empty"]);
    exit;
}

// 2. 🎓 பல்கலைக்கழக மின்னஞ்சல் டொமைன் சரிபார்ப்பு (Strict Domain Validation)
if ($role === 'student') {
    // மாணவர்கள் கட்டாயம் @std.uwu.ac.lk கொண்டு மட்டுமே பதிய முடியும்
    if (!str_ends_with($email, '@std.uwu.ac.lk')) {
        echo json_encode([
            "status" => "error",
            "message" => "The email is wrong. Students must use an email ending strictly with @std.uwu.ac.lk"
        ]);
        exit;
    }
} else if ($role === 'staff') {
    // பணியாளர்கள் கட்டாயம் @stf.uwu.ac.lk கொண்டு மட்டுமே பதிய முடியும்
    if (!str_ends_with($email, '@stf.uwu.ac.lk')) {
        echo json_encode([
            "status" => "error",
            "message" => "The email is wrong. Staff must use an email ending strictly with @stf.uwu.ac.lk"
        ]);
        exit;
    }
}

// 3. பாஸ்வேர்ட் வடிவமைப்பு சரிபார்ப்பு (Regex Validation)
$lengthCheck = strlen($password) >= 8;
$letterCheck = preg_match('/[a-zA-Z]/', $password);
$numberCheck = preg_match('/[0-9]/', $password);
$symbolCheck = preg_match('/[^a-zA-Z0-9]/', $password);

if (!$lengthCheck || !$letterCheck || !$numberCheck || !$symbolCheck) {
    echo json_encode([
        "status" => "error",
        "message" => "Password must be at least 8 characters long and contain letters, numbers, and symbols."
    ]);
    exit;
}

// 4. தொடர்ச்சியான எண்கள்/எழுத்துக்கள் உள்ளதா எனச் சரிபார்த்தல் (No Sequential Check: e.g., 123, abc)
$len = strlen($password);
for ($i = 0; $i < $len - 2; $i++) {
    $char1 = ord($password[$i]);
    $char2 = ord($password[$i + 1]);
    $char3 = ord($password[$i + 2]);

    if (($char2 === $char1 + 1 && $char3 === $char2 + 1) ||
        ($char2 === $char1 - 1 && $char3 === $char2 - 1)
    ) {
        echo json_encode([
            "status" => "error",
            "message" => "Password cannot contain sequential numbers or letters (like '123' or 'abc')."
        ]);
        exit;
    }
}

// 5. 6 இலக்க OTP உருவாக்குதல் மற்றும் செஷனில் விவரங்களைச் சேமித்தல்
$otp = random_int(100000, 999999);
$_SESSION['temp_user'] = [
    "firstname"  => $firstname,
    "lastname"   => $lastname,
    "phone"      => $phone,
    "role"       => $role,
    "identity"   => $identity,
    "email"      => $email,
    "password"   => $password
];
$_SESSION['otp'] = $otp;

// 6. PHPMailer மூலம் மின்னஞ்சல் அனுப்புதல்
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS; // App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom(SMTP_USER, 'UniCore System');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'UniCore Registration - OTP Verification';
    $mail->Body    = "
        <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;'>
            <h2 style='color: #714267;'>Welcome to UniCore</h2>
            <p>Dear $firstname,</p>
            <p>Thank you for initiating your registration at Uva Wellassa University Portal. Please use the following One-Time Password (OTP) to complete your identity verification:</p>
            <div style='background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #714267; border-radius: 4px; margin: 20px 0;'>
                $otp
            </div>
            <p style='color: #777; font-size: 12px;'>This code is valid for a limited time. If you did not request this, please ignore this email.</p>
        </div>
    ";

    $mail->send();
    echo json_encode(["status" => "success", "message" => "OTP sent successfully to your university email."]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Mail could not be sent. Error: {$mail->ErrorInfo}"]);
}
