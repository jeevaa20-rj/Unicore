<?php
class Marketplaceitem
{
    private $conn;
    private $table = "marketplace_items";
    public $id;
    public $item_name;
    public $brand;
    public $used_time;
    public $price;
    public $location;
    public $contact_number;
    public $description;
    public $created_by;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function createItem()
    {
        $query = "INSERT INTO " . $this->table . "
    (item_name, brand, used_time, price, location, contact_number, description, created_by)
    VALUES
    (:item_name, :brand, :used_time, :price, :location, :contact_number, :description, :created_by)";


        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":item_name", $this->item_name);
        $stmt->bindParam(":brand", $this->brand);

        if ($this->used_time === null || $this->used_time === '') {
            $stmt->bindValue(":used_time", null, PDO::PARAM_NULL);
        } else {
            $stmt->bindValue(":used_time", $this->used_time, PDO::PARAM_STR);
        }

        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":contact_number", $this->contact_number);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":created_by", $this->created_by);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
    public function getAllItems()
    {

        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    // Update Item
    public function updateItem()
    {

        $query = "UPDATE " . $this->table . "

        SET
            item_name = :item_name,
            brand = :brand,
            used_time = :used_time,
            price = :price,
            location = :location,
            contact_number = :contact_number,
            description = :description

        WHERE id = :id
        AND created_by = :created_by";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":item_name", $this->item_name);
        $stmt->bindParam(":brand", $this->brand);
        $stmt->bindParam(":used_time", $this->used_time);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":contact_number", $this->contact_number);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":created_by", $this->created_by);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete Item
    public function deleteItem()
    {

        $query = "DELETE FROM " . $this->table . "

        WHERE id = :id
        AND created_by = :created_by";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":created_by", $this->created_by);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
