<?php

require_once __DIR__ . '/../config/dbh.class.php';

// Login logic class
class Login extends Dbh
{
    public function getUser($email, $password)
    {
        $email = strtolower(trim($email));

        if ($email === '' || $password === '') {
            return [
                "status" => "error",
                "message" => "Email and password required",
            ];
        }

        $conn = $this->connect();

        if (!$conn) {
            return [
                "status" => "error",
                "message" => "Database connection failed",
            ];
        }

        // Newest row wins when the same email was registered more than once
        $sql = "SELECT * FROM users WHERE email = ? ORDER BY id DESC LIMIT 1";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            return [
                "status" => "error",
                "message" => "Query preparation failed",
            ];
        }

        $stmt->bind_param("s", $email);

        // Execute query
        if (!$stmt->execute()) {
            return [
                "status" => "error",
                "message" => "Query execution failed"
            ];
        }

        // Get result
        $result = $stmt->get_result();

        // If user not found
        if ($result->num_rows === 0) {
            return [
                "status" => "error",
                "message" => "User not found"
            ];
        }

        // Fetch user data
        $user = $result->fetch_assoc();

        $storedHash = $user['password'] ?? '';

        if ($storedHash === '' || !password_verify($password, $storedHash)) {
            return [
                "status" => "error",
                "message" => "Invalid password",
            ];
        }

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];

        // Success response
        return [
            "status" => "success",
            "message" => "Login successful",
            "user" => [
                "id" => $user['id'],
                "email" => $user['email']
            ]
        ];
    }
}
