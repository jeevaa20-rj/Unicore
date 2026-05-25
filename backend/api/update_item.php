<?php

include_once __DIR__ . '/../config/Database.php';
include_once __DIR__ . '/../models/Marketplaceitem.php';

$database = new Database();
$db = $database->connect();

$item = new Marketplaceitem($db);

$item->id = 1;
$item->item_name = "Gaming Laptop";
$item->brand = "ASUS";
$item->used_time = "2 Years";
$item->price = 150000;
$item->location = "Colombo";
$item->contact_number = "0779876543";
$item->description = "Updated Description";
$item->created_by = 1;

if ($item->updateItem()) {

    echo "Item Updated Successfully";
} else {

    echo "Update Failed";
}
