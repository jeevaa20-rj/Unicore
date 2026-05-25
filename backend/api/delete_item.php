<?php

include_once __DIR__ . '/../config/Database.php';
include_once __DIR__ . '/../models/Marketplaceitem.php';

$database = new Database();
$db = $database->connect();

$item = new Marketplaceitem($db);

$item->id = 1;
$item->created_by = 1;

if ($item->deleteItem()) {

    echo "Item Deleted Successfully";
} else {

    echo "Delete Failed";
}
