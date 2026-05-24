<?php

session_start();

include 'dbh.class.php';
include 'lostitem.class.php';

$lost = new LostItem();

$result = $lost->getItems();

?>

<!DOCTYPE html>
<html>
<head>
    <title>Lost Items</title>
</head>
<body>

<h2>Lost Items List</h2>

<?php while($row = $result->fetch_assoc()){ ?>

<div style="border:1px solid #ccc; padding:15px; margin:10px;">

    <!-- ITEM NAME -->
    <h3><?php echo $row['item_name']; ?></h3>

    <!-- DETAILS -->
    <p><b>Last Seen:</b> <?php echo $row['last_seen_datetime']; ?></p>
    <p><b>Place:</b> <?php echo $row['last_seen_place']; ?></p>
    <p><b>Contact:</b> <?php echo $row['contact_number']; ?></p>

    <!-- IMAGE (SAFE CHECK) -->
    <?php if(!empty($row['item_image'])) { ?>
    <img src="<?php echo $row['item_image']; ?>" width="150">
<?php } else { ?>
    <p>No image</p>
<?php } ?>


    <!-- DELETE ONLY OWNER -->
    <?php if(isset($_SESSION['user_id']) && $_SESSION['user_id'] == $row['user_id']) { ?>

        <br><br>
        <a href="delete_lost_item.php?id=<?php echo $row['id']; ?>"
           onclick="return confirm('Are you sure you want to delete this item?')">

           Delete

        </a>

    <?php } ?>

</div>

<?php } ?>

</body>
</html>