<?php
session_start();

include '../config/dbh.class.php';
include 'lostitem.class.php';

if(!isset($_SESSION['user_id'])){
    die("Please login first");
}

if(isset($_POST['submit'])){

    $item_name = $_POST['item_name'];
    $datetime = $_POST['datetime'];
    $place = $_POST['place'];
    $contact = $_POST['contact'];

    $user_id = $_SESSION['user_id'];

    // IMAGE UPLOAD
    $imageName = $_FILES['image']['name'];
    $tmpName = $_FILES['image']['tmp_name'];

    $uploadPath = "../uploads/" . $imageName;

    move_uploaded_file($tmpName, $uploadPath);

    // CREATE OBJECT (MUST BE FIRST)
    $lost = new LostItem();

    // INSERT DATA (ONLY ONCE)
    $result = $lost->addItem(
        $user_id,
        $item_name,
        $datetime,
        $place,
        $contact,
        $imageName
    );

    if($result){
        echo "<script>alert('Lost item added successfully');</script>";
    } else {
        echo "<script>alert('Failed to add item');</script>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Add Lost Item</title>
</head>
<body>

<h2>Add Lost Item</h2>

<form method="POST" enctype="multipart/form-data">

    <input type="text" name="item_name" placeholder="Item Name" required><br><br>

    <input type="datetime-local" name="datetime" required><br><br>

    <input type="text" name="place" placeholder="Last Seen Place" required><br><br>

    <input type="text" name="contact" placeholder="Contact Number" required><br><br>

    <input type="file" name="image" accept="image/*" required><br><br>

    <button type="submit" name="submit">Add Item</button>

</form>

</body>
</html>