
<?php

$file = $_GET['file'];
$target_dir = "uploads/";
$target_path = $target_dir . basename($file);

if (unlink($target_path)) {
  echo "The file has been deleted.";
} else {
  echo "Sorry, there was an error deleting your file.";
}

header("Location: upload.php");
exit();
?>
