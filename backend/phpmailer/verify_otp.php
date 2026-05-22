<?php
require_once 'Dbh.php';

// connect database
$db = new Dbh();
$conn = $db->connect();

// get data from form
$email = $_POST['email'];
$otp = $_POST['otp'];

// check OTP from database
$stmt = $conn->prepare("SELECT otp FROM users WHERE email = ?");
$stmt->execute([$email]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['otp'] == $otp) {

    // update user as verified
    $update = $conn->prepare("UPDATE users SET is_verified = 1 WHERE email = ?");
    $update->execute([$email]);

    echo "OTP Verified Successfully! 🎉";
} else {
    echo "Invalid OTP ❌";
}
