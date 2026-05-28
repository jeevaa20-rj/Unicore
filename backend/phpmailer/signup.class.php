<?php
require_once __DIR__ . '/config/dbh.class.php';

class Signup extends Dbh
{

    // $role மற்றும் $identity அளவுருக்கள் (Parameters) புதிதாகச் சேர்க்கப்பட்டுள்ளன
    public function setUser($firstname, $lastname, $phone, $role, $identity, $email, $password)
    {

        $conn = $this->connect();

        // enrollment_number என்பதற்குப் பதிலாக பொதுவான identity_no மற்றும் role_type சேர்க்கப்பட்டுள்ளது
        $sql = "INSERT INTO users(first_name, last_name, phone_number, role_type, identity_no, email, password)
                VALUES(?,?,?,?,?,?,?)";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Prepare Failed: " . $conn->error);
        }

        $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

        // 7 அளவுருக்கள் உள்ளதால் "sssssss" என மாற்றப்பட்டுள்ளது
        $stmt->bind_param(
            "sssssss",
            $firstname,
            $lastname,
            $phone,
            $role,       // 'student' அல்லது 'staff'
            $identity,   // Enrollment Number அல்லது Staff ID
            $email,
            $hashedPwd
        );

        if ($stmt->execute()) {
            return true;
        } else {
            die("Execute Failed: " . $stmt->error);
        }
    }
}
