<?php
require_once __DIR__ . '/../config/dbh_class.php';

class MarketplaceItem extends Dbh
{

    // Get all items
    public function getAllItems()
    {
        $sql = "SELECT * FROM marketplace_items ORDER BY id DESC";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Add item
    public function addItem($data)
    {
        $sql = "INSERT INTO marketplace_items 
        (user_id, item_name, brand, used_time, price, location, contact) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->connect()->prepare($sql);
        return $stmt->execute([
            $data['user_id'],
            $data['item_name'],
            $data['brand'],
            $data['used_time'],
            $data['price'],
            $data['location'],
            $data['contact']
        ]);
    }

    // Update item (only owner)
    public function updateItem($id, $user_id, $data)
    {
        $sql = "UPDATE marketplace_items 
                SET item_name=?, brand=?, used_time=?, price=?, location=?, contact=?
                WHERE id=? AND user_id=?";

        $stmt = $this->connect()->prepare($sql);
        return $stmt->execute([
            $data['item_name'],
            $data['brand'],
            $data['used_time'],
            $data['price'],
            $data['location'],
            $data['contact'],
            $id,
            $user_id
        ]);
    }

    // Delete item (only owner)
    public function deleteItem($id, $user_id)
    {
        $sql = "DELETE FROM marketplace_items WHERE id=? AND user_id=?";
        $stmt = $this->connect()->prepare($sql);
        return $stmt->execute([$id, $user_id]);
    }
}
