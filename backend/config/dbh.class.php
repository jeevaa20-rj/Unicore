<?php
// Database connection class

class Dbh
{
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $db_name = 'unicore_db';

    // Connect to MySQL database
    public function connect()
    {
        $conn = new mysqli(
            $this->host,
            $this->username,
            $this->password,
            $this->db_name
        );

        // HARD STOP if connection fails
        if ($conn->connect_error) {
            return null;
        }

        return $conn;
    }
}
