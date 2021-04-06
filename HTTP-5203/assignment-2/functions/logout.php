<?php
session_start();

function logout()
{
    unset($_SESSION["username"]);
    unset($_SESSION["password"]);
    unset($_SESSION["userId"]);
    unset($_SESSION["userGroup"]);
    unset($_SESSION["valid"]);
    unset($_SESSION['timeout']);
    unset($_SESSION['ticket']);
    header('Location: ../views/login.html');
    exit;
}

if (isset($_POST['logout'])) {
    logout();
}
