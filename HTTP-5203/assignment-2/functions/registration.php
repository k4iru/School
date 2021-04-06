<?php
session_start();
$username = $first = $last = $password = $passwordConfirm = "";
$doc = new DOMDocument();

$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;
$path = "../xml/users.xml";
if (file_exists($path)) {
    $doc->load($path);
    $userCount = $doc->getElementsByTagName("user")->length - 1;
    $users = $doc->getElementsByTagName("user");
    $lastUser = $users->item($userCount);
    $lastUserId = $lastUser->getElementsByTagName("userId")->item(0)->nodeValue;
    $root = $doc->getElementsByTagName("users")->item(0);

    if (isset($_POST["registration"])) {

        // TODO VALIDATION
        $username = $_POST["username"];
        $first = $_POST["first"];
        $last = $_POST["last"];
        $password = hash("sha256", $_POST["password"]);
        $passwordConfirm = $_POST["passwordConfirm"];
        $newUserId = str_pad(intval($lastUserId) + 1, 4, "0", STR_PAD_LEFT);

        // create all the DOM elements
        $userElement = $doc->createElement("user");
        $userIdElement = $doc->createElement("userId", $newUserId);
        $userNameElement = $doc->createElement("userName", $username);
        $passwordElement = $doc->createElement("password", $password);
        $accountCreationElement = $doc->createElement("accountCreation", date("Y-m-d\TH:i:s"));
        $userGroupElement = $doc->createElement("userGroup", "client");
        $nameElement = $doc->createElement("name");
        $firstElement = $doc->createElement("first", $first);
        $lastElement = $doc->createElement("last", $last);

        // append
        $userElement->appendChild($userIdElement);
        $userElement->appendChild($userNameElement);
        $userElement->appendChild($passwordElement);
        $userElement->appendChild($accountCreationElement);
        $userElement->appendChild($userGroupElement);
        $nameElement->appendChild($firstElement);
        $nameElement->appendChild($lastElement);
        $userElement->appendChild($nameElement);
        $root->appendChild($userElement);

        $doc->save("../xml/users.xml");

        // create new session
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
} else {
    echo "can't find file";
}
