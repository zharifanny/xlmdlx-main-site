<!DOCTYPE html>
<html>
<head>
    <title>File List</title>
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

        /* Style the links in gold with a designer vibe */
        a {
            color: #ffc107;
            font-weight: bold;
            text-shadow: 2px 2px #000;
            transition: all 0.3s ease-in-out;
            text-decoration: none;
        }

        /* Add hover effect to the links */
        a:hover {
            color: #fff;
            text-shadow: 3px 3px #000;
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
        <h2>File List</h2>
        <?php
        $target_dir = "uploads/";

        // Check if a file to delete was specified in the URL
        if (isset($_GET['file'])) {
            $filename = $_GET['file'];
            $filepath = $target_dir . $filename;

            if (file_exists($filepath)) {
                if (unlink($filepath)) {
                    echo "The file $filename has been deleted.<br><br>";
                } else {
                    echo "Sorry, there was an error deleting the file $filename.<br><br>";
                }
            } else {
                echo "Sorry, the file $filename does not exist.<br><br>";
            }
        }

        // List files in the "uploads" directory
        $files = scandir($target_dir);
        foreach ($files as $file) {
            if ($file != "." && $file != "..") {
                echo "- <a href=\"$target_dir$file\">$file</a> 
                      <a href=\"list.php?file=$file\" class=\"delete-btn\">Delete</a><br>";
            }
        }
        ?>

        <br>
        <a href="upload.php">Back to Upload Page</a>
    </div>
</body>
</html>