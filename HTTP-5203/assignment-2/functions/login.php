<?php
session_start();

$username = $password = "";

if (isset($_POST['submit'])) {
    //echo "posted";

    $username = $_POST['username'];
    $password = $_POST['password'];

    checkLogin($username, $password);
}

function checkLogin($input_username, $input_password)
{
    $doc = new DOMDocument();

    $hashpass = hash("sha256", $input_password);
    $doc->preserveWhiteSpace = false;
    $doc->formatOutput = true;
    $path = "../xml/users.xml";

    if (file_exists($path)) {
        $doc->load($path);
        $users = $doc->getElementsByTagName("user");

        foreach ($users as $user) {
            $username = $user->getElementsByTagName("userName")->item(0)->nodeValue;
            $password = $user->getElementsByTagName("password")->item(0)->nodeValue;
            $userGroup = $user->getElementsByTagName("userGroup")->item(0)->nodeValue;
            $userId = $user->getElementsByTagName("userId")->item(0)->nodeValue;

            if ($username == $input_username && $password == $hashpass) {

                $_SESSION["username"] = $username;
                $_SESSION["password"] = $password;
                $_SESSION["userId"] = $userId;
                $_SESSION["userGroup"] = $userGroup;
                $_SESSION["valid"] = true;
                // 60 minutes 
                $_SESSION['timeout'] = time() + (60 * 60);
                header('Location: ../views/tickets.php');
                exit;
            }
        }

        // can't find login
        header ('Location: ../views/login.html');
        exit;
    }
}
