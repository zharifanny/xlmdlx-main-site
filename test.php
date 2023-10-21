<!DOCTYPE html>
<html>
<head>
    <title>Form Validation</title>
</head>
<body>
<?php
$errors = [];
$name = $email = $message = "";

if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $email = test_input($_POST["email"]);
    $message = test_input($_POST["message"]);

    if (empty($name)) {
        $errors[] = "Name is required";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }

    if (empty($message)) {
        $errors[] = "Message is required";
    }

    if (empty($errors)) {
        // Simpan data ke database atau lakukan tindakan lainnya
        // Misalnya, kirim email atau simpan ke file
        $success_message = "Data submitted successfully!";
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>


<h2>Form Validation Example</h2>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
    Name: <input type="text" name="name">
    <br><br>
    Email: <input type="text" name="email">
    <br><br>
    Message: <textarea name="message"></textarea>
    <br><br>
    <input type="submit" name="submit" value="Submit">
</form>

<?php
