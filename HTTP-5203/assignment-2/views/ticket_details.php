<?php
session_start();
require_once "../functions/ticket.php";
if (isset($_POST["ticket_details"])) {
    $_SESSION["ticketId"] = $_POST["ticketId"];
    $ticketId = $_POST["ticketId"];
    $ticket = getTicket($ticketId);
    $dateOfIssue = $ticket->getElementsByTagName("dateOfIssue")->item(0)->nodeValue;
    $status = $ticket->getElementsByTagName("status")->item(0)->nodeValue;
    $subject = $ticket->getElementsByTagName("subject")->item(0)->nodeValue;
    $description = $ticket->getElementsByTagName("description")->item(0)->nodeValue;
    $messages = $ticket->getElementsByTagName("message");
} 
else if (isset($_SESSION["ticketId"])){
    $ticketId = $_SESSION["ticketId"];
    $ticket = getTicket($ticketId);
    $dateOfIssue = $ticket->getElementsByTagName("dateOfIssue")->item(0)->nodeValue;
    $status = $ticket->getElementsByTagName("status")->item(0)->nodeValue;
    $subject = $ticket->getElementsByTagName("subject")->item(0)->nodeValue;
    $description = $ticket->getElementsByTagName("description")->item(0)->nodeValue;
    $messages = $ticket->getElementsByTagName("message");
}

?>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Ticket Details</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <h1>Ticket: <?= $ticketId ?></h1>
    <h2>Status: <?= $status ?></h2>
    <h2>Date of Issue <?= $dateOfIssue ?></h2>
    <h2>Subject: <?= $subject ?></h2>
    <p>Description: <?= $description ?></p>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>User</th>
                <th>Message</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($messages as $message) {
                $date = $message->getAttribute("time");
                $userId = $message->getElementsByTagName("userIdComment")->item(0)->nodeValue;
                $content = $message->getElementsByTagName("content")->item(0)->nodeValue;
                echo "
                <tr>
                    <td>$date</td>
                    <td>$userId</td>
                    <td>$content</td>
                </tr>";
            }
            ?>
        </tbody>
    </table>

    <form action="../functions/newMessage.php" method="POST">
        <input type="hidden" name="ticketId" value=<?=$ticketId?> />
        <input type="hidden" name="userId" value=<?=$_SESSION["userId"]?> />
        <label for="content">new Message</label>
        <div><textarea name="content"></textarea></div>
        <input type="submit" name="newMessage" value="Submit Message" />
    </form>
</body>

</html>