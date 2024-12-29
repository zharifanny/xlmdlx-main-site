<?php
include 'config.php';

$username = $_GET['username'];  // Assume username is passed via GET
$spinCost = 50;  // Cost to spin the slot machine

$balance = getUserBalance($username);

if ($balance < $spinCost) {
    echo "Insufficient balance to play.";
    exit;
}

$win = (rand(0, 100) < $users[$username]["win_factor"] * 100);  // Random win check

if ($win) {
    // Player wins, adding prize (example: 100 credits)
    updateUserBalance($username, 100);
    echo "You win! New balance: " . getUserBalance($username);
} else {
    // Player loses, deducting the cost to play
    updateUserBalance($username, -$spinCost);
    echo "You lose! New balance: " . getUserBalance($username);
}
?>
