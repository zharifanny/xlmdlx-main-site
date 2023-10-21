<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="download.css"> <!--Drag css-->

</head>
<body>
    <?php
    // Pastikan Anda telah mendefinisikan variabel $target_dir sebelumnya
    $target_dir = "uploads/";

    // List files in the "uploads" directory
    $files = scandir($target_dir);
    foreach ($files as $file) {
        if ($file != "." && $file != "..") 
        {
            echo "- <a href=\"$target_dir$file\">$file</a><br>";
        }
    }
    ?>
</body>
</html>
