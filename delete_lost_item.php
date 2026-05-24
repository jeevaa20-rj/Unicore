<?php
session_start();

include 'dbh.class.php';
include 'lostitem.class.php';

if(!isset($_SESSION['user_id'])){
    die("Login required");
}

if(isset($_GET['id'])){

    $id = $_GET['id'];
    $user_id = $_SESSION['user_id'];

    $lost = new LostItem();

    $lost->deleteItem($id, $user_id);

    header("Location: view_lost_items.php");
}
?>