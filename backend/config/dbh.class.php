
<?php

class Dbh
{
    private $host = '127.0.0.1';
    private $username = 'root';
    private $password = '';
    private $db_name = 'unicore_db';
    private $conn;

    public function connect()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                'mysql:host=' . $this->host . ';dbname=' . $this->db_name . ';charset=utf8',
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo 'Connection error: ' . $exception->getMessage();
            exit;
        }

        return $this->conn;
    }
}
?>