<?php
session_start();

require_once __DIR__ . '/config/dbh.class.php';

// Login logic class
class Login extends Dbh
{
    public function getUser($email, $password)
    {
        // Connect DB
        $conn = $this->connect();

        // If DB connection failed
        if (!$conn) {
            return [
                "status" => "error",
                "message" => "Database connection failed"
            ];
        }

        // SQL query (prepared statement for security)
        $sql = "SELECT * FROM users WHERE email = ? LIMIT 1";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            return [
                "status" => "error",
                "message" => "Query preparation failed"
            ];
        }

        // Bind email parameter
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

        // Verify password (hashed password)
        if (!password_verify($password, $user['password'])) {
            return [
                "status" => "error",
                "message" => "Invalid password"
            ];
        }

        // Save session
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
