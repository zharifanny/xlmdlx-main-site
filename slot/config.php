<?php
// Example user configuration (could be stored in a database)
$users = [
    "user1" => ["balance" => 1000, "win_factor" => 0.2], // 20% win chance
    "user2" => ["balance" => 1500, "win_factor" => 0.5], // 50% win chance
];

function getUserBalance($username) {
    global $users;
    return isset($users[$username]) ? $users[$username]["balance"] : 0;
}

function updateUserBalance($username, $amount) {
    global $users;
    if (isset($users[$username])) {
        $users[$username]["balance"] += $amount;
    }
}
?>
