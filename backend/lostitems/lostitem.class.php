<?php

include_once '../config/dbh.class.php'; 


class LostItem extends Dbh {

    // ADD LOST ITEM
   public function addItem($user_id, $item_name, $datetime, $place, $contact, $image){

    $conn = $this->connect();

    $sql = "INSERT INTO lost_items 
            (user_id, item_name, last_seen_datetime, last_seen_place, contact_number, item_image)
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if(!$stmt){
        die("Prepare Failed: " . $conn->error);
    }

    $stmt->bind_param(
        "isssss",
        $user_id,
        $item_name,
        $datetime,
        $place,
        $contact,
        $image
    );

    return $stmt->execute();
}

    // VIEW ALL LOST ITEMS
    public function getItems(){

        $conn = $this->connect();

        $sql = "SELECT * FROM lost_items ORDER BY created_at DESC";

        $result = $conn->query($sql);

        return $result;
    }

    // DELETE ONLY OWN POST
    public function deleteItem($id, $user_id){

        $conn = $this->connect();

        $sql = "DELETE FROM lost_items WHERE id = ? AND user_id = ?";

        $stmt = $conn->prepare($sql);

        if(!$stmt){
            die("Prepare Failed: " . $conn->error);
        }

        $stmt->bind_param("ii", $id, $user_id);

        return $stmt->execute();
    }
}
?>