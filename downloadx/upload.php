<!DOCTYPE html>
<html>
  <head>
    <title>Upload Example</title>
    <style>
      /* Set the background color to black and font color to antique white */
      body {
        background-color: black;
        color: antiquewhite;
      }

      /* Center the output horizontally and vertically */
      .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      /* Remove the blue link underline */
      a {
        text-decoration: none;
      }

      /* Style the links in gold with a designer vibe */
      a {
        color: #ffc107;
        font-weight: bold;
        text-shadow: 2px 2px #000;
        transition: all 0.3s ease-in-out;
      }

      /* Add hover effect to the links */
      a:hover {
        color: #fff;
        text-shadow: 3px 3px #000;
      }

      a.back-btn {
        color: #9ACD32;
      }

      /* Style the delete button */
      .delete-btn {
        color: #dc143c;
        font-weight: bold;
        text-shadow: 2px 2px #000;
        transition: all 0.3s ease-in-out;
      }

      .delete-btn:hover {
        color: #fff;
        text-shadow: 3px 3px #000;
      }

    </style>
  </head>
  <body>
    <div class="centered">
      <?php
      if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $temp_name = $_FILES['file']['tmp_name'];
        $original_name = $_FILES['file']['name'];
        $target_dir = "uploads/";
        $target_path = $target_dir . basename($original_name);
        if (move_uploaded_file($temp_name, $target_path)) {
          echo "The file ". basename($original_name). " has been uploaded.<br><br>";
        } else {
          echo "Sorry, there was an error uploading your file.<br><br>";
        }
      } else {
        echo "Sorry, there was an error uploading your file.<br><br>";
      }

      // Check if a file to delete was specified in the URL
      if (isset($_GET['file'])) {
        $filename = $_GET['file'];
        $filepath = $target_dir . $filename;
        // Check if the file exists
        if (file_exists($filepath)) {
          // Attempt to delete the file
          if (unlink($filepath)) {
            echo "The file $filename has been deleted.<br><br>";
          } else {
            echo "Sorry, there was an error deleting the file $filename.<br><br>";
          }
        } else {
          echo "Sorry, the file $filename does not exist.<br><br>";
        }
      }
      ?>
      <a href="index.html" class="back-btn">upload page</a>

      <br><br>
      <?php
      // List files in the "uploads" directory
      $files = scandir($target_dir);
      foreach ($files as $file) {
        if ($file != "." && $file != "..") {
          echo "- <a href=\"$target_dir$file\">$file</a> 
                <a href=\"delete.php?file=$file\" class=\"delete-btn\">Delete</a><br>";
        }
      }
      ?>
    </div>
  </body>
</html>
