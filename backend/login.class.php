<?php
session_start();
require_once __DIR__ . '/config/dbh.class.php';

class Login extends Dbh
{

    public function getUser($email, $password)
    {

        // Database connection
        $conn = $this->connect();

        // SQL query
        $sql = "SELECT * FROM users WHERE email = ?";

        // Prepare statement
        $stmt = $conn->prepare($sql);

        // Check prepare
        if (!$stmt) {

            die("Prepare Failed : " . $conn->error);
        }

        // Bind parameter
        $stmt->bind_param("s", $email);

        // Execute query
        if (!$stmt->execute()) {

            die("Execute Failed : " . $stmt->error);
        }

        // Get result
        $result = $stmt->get_result();

        // Check user exists
        if ($result->num_rows > 0) {

            $user = $result->fetch_assoc();


            // Verify password
            if (password_verify($password, $user['password'])) {



                $_SESSION['user_id'] = $user['id'];
                $_SESSION['email'] = $user['email'];

                return true;
            } else {

                return false;
            }
        } else {

            return false;
        }
    }
}
