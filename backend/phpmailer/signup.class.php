<?php
require_once __DIR__ . '/../config/dbh.class.php';

class Signup extends Dbh
{
    private function ensurePendingTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS pending_registrations (
            email VARCHAR(100) NOT NULL PRIMARY KEY,
            otp_code VARCHAR(6) NOT NULL,
            user_data TEXT NOT NULL,
            expires_at DATETIME NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";

        return $conn->query($sql);
    }

    public function savePendingOtp($email, $otp, array $tempUser)
    {
        $conn = $this->connect();
        if (!$conn) {
            throw new Exception("Database connection failed");
        }

        $this->ensurePendingTable($conn);

        $email = strtolower(trim($email));
        $otp = trim((string) $otp);
        $userJson = json_encode($tempUser);
        $expiresAt = date('Y-m-d H:i:s', time() + 900);

        $sql = "REPLACE INTO pending_registrations (email, otp_code, user_data, expires_at)
                VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Prepare Failed: " . $conn->error);
        }

        $stmt->bind_param("ssss", $email, $otp, $userJson, $expiresAt);
        $ok = $stmt->execute();
        $stmt->close();
        $conn->close();

        return $ok;
    }

    public function getPendingUser($email, $otp)
    {
        $conn = $this->connect();
        if (!$conn) {
            throw new Exception("Database connection failed");
        }

        $this->ensurePendingTable($conn);

        $email = strtolower(trim($email));
        $otp = trim((string) $otp);

        $sql = "SELECT user_data FROM pending_registrations
                WHERE email = ? AND otp_code = ? AND expires_at > NOW()";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Prepare Failed: " . $conn->error);
        }

        $stmt->bind_param("ss", $email, $otp);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result ? $result->fetch_assoc() : null;
        $stmt->close();
        $conn->close();

        if (!$row) {
            return null;
        }

        $user = json_decode($row['user_data'], true);
        return is_array($user) ? $user : null;
    }

    public function deletePending($email)
    {
        $conn = $this->connect();
        if (!$conn) {
            return false;
        }

        $email = strtolower(trim($email));
        $stmt = $conn->prepare("DELETE FROM pending_registrations WHERE email = ?");
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->close();
        $conn->close();

        return true;
    }

    public function emailExists($email)
    {
        $conn = $this->connect();
        if (!$conn) {
            throw new Exception("Database connection failed");
        }

        $email = strtolower(trim($email));
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
        if (!$stmt) {
            throw new Exception("Prepare Failed: " . $conn->error);
        }

        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $exists = $result && $result->num_rows > 0;
        $stmt->close();
        $conn->close();

        return $exists;
    }

    public function setUser($firstname, $lastname, $phone, $role, $identity, $email, $password)
    {
        $conn = $this->connect();

        if (!$conn) {
            throw new Exception("Database connection failed");
        }

        $email = strtolower(trim($email));

        if ($this->emailExists($email)) {
            throw new Exception("This email is already registered. Please log in instead.");
        }

        // enrollment_number stores student enrollment no. or staff ID
        $sql = "INSERT INTO users(first_name, last_name, phone_number, enrollment_number, email, password)
                VALUES(?,?,?,?,?,?)";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception("Prepare Failed: " . $conn->error);
        }

        $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

        $stmt->bind_param(
            "ssssss",
            $firstname,
            $lastname,
            $phone,
            $identity,
            $email,
            $hashedPwd
        );

        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return true;
        } else {
            throw new Exception("Execute Failed: " . $stmt->error);
        }
    }
}
