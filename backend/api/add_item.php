<?php

include_once __DIR__ . '/../config/Database.php';
include_once __DIR__ . '/../models/Marketplaceitem.php';

$database = new Database();
$db = $database->connect();

$item = new Marketplaceitem($db);

$item->item_name = $_POST['item_name'] ?? "Laptop";
$item->brand = $_POST['brand'] ?? "Dell";
$item->used_time = isset($_POST['used_time']) && $_POST['used_time'] !== '' ? $_POST['used_time'] : null;
$item->price = $_POST['price'] ?? 120000;
$item->location = $_POST['location'] ?? "Badulla";
$item->contact_number = $_POST['contact_number'] ?? "0771234567";
$item->description = $_POST['description'] ?? "Good condition laptop";
$item->created_by = $_POST['created_by'] ?? 1;

if ($item->createItem()) {

    echo "Item Added Successfully";
} else {

    echo "Failed to Add Item";
}
