<?php


class Dbh {

    private $serverName = "localhost";
    private $dbUserName = "root";
    private $dbPassword = "";
    private $dbName = "unicore_db";

    protected function connect(){

        $conn = new mysqli(
            $this->serverName,
            $this->dbUserName,
            $this->dbPassword,
            $this->dbName
        );

        if($conn->connect_error){
            die("Connection Failed : " . $conn->connect_error);
        }

        return $conn;
    }
}
?>