<?php

class Signup extends Dbh {

    public function setUser($firstname, $lastname, $phone, $enrollment, $email, $password){

        $conn = $this->connect();

        $sql = "INSERT INTO users(first_name, last_name, phone_number, enrollment_number, email, password)
                VALUES(?,?,?,?,?,?)";

        $stmt = $conn->prepare($sql);

        if(!$stmt){
            die("Prepare Failed: " . $conn->error);
        }

        $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

        $stmt->bind_param(
            "ssssss",
            $firstname,
            $lastname,
            $phone,
            $enrollment,
            $email,
            $hashedPwd
        );

        if($stmt->execute()){
            return true;
        }
        else{
            die("Execute Failed: " . $stmt->error);
        }
    }
}
?>