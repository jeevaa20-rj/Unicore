<?php

include_once __DIR__ . '/../config/Database.php';
include_once __DIR__ . '/../models/Marketplaceitem.php';

$database = new Database();
$db = $database->connect();

$item = new Marketplaceitem($db);

$result = $item->getAllItems();

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

    echo "Item Name: " . $row['item_name'] . "<br>";
    echo "Brand: " . $row['brand'] . "<br>";
    echo "Price: Rs." . $row['price'] . "<br>";
    echo "Location: " . $row['location'] . "<br>";
    echo "<hr>";
}
