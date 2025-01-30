<!DOCTYPE html>
<html>
<head>
    <title>Upload File</title>
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
    </style>
</head>
<body>
    <div class="centered">
        <h2>Upload File</h2>
        <form action="upload.php" method="post" enctype="multipart/form-data">
            <input type="file" name="file" required>
            <input type="submit" value="Upload">
        </form>

        <?php
        // Set error reporting to include all types of errors
        error_reporting(E_ALL);
        ini_set('display_errors', 1);

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
            $target_dir = "uploads/";
            $target_path = $target_dir . basename($_FILES['file']['name']);

            if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
                echo "The file " . basename($_FILES['file']['name']) . " has been uploaded.<br><br>";
            } else {
                echo "Sorry, there was an error uploading your file.<br><br>";
            }
        }
        ?>

        <br>
        <a href="list.php">View File List</a>
    </div>
</body>
</html>