<?php
// Define the directory where uploaded files will be stored
$target_dir = "uploads/";

// Get all files in the uploads directory
$files = scandir($target_dir);
$uploaded_files = array();

foreach ($files as $file) {
    if (in_array($file, ['.', '..'])) continue; // Skip '.' and '..'
    $uploaded_files[] = [
        'name' => $file,
        'path' => $target_dir . $file
    ];
}

// Output the list of files in JSON format
header('Content-Type: application/json');
echo json_encode($uploaded_files);
?>