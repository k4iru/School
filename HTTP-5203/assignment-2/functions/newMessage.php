<?php
session_start();
$ticketId = $userId = $content = "";

if (isset($_POST["newMessage"])) {
    $ticketId = $_POST["ticketId"];
    $userId = $_POST["userId"];
    $content = $_POST["content"];

    $doc = new DOMDocument();

    $doc->preserveWhiteSpace = false;
    $doc->formatOutput = true;
    $path = "../xml/tickets.xml";
    if (file_exists($path)) {
        $doc->load($path);
        $tickets = $doc->getElementsByTagName("ticket");
        foreach ($tickets as $ticket) {
            $currentTicketId = $ticket->getElementsByTagName("ticketId")->item(0)->nodeValue;
            if ($currentTicketId == $ticketId) {
                $supportMessages = $ticket->getElementsByTagName("supportMessages")->item(0);
                $messageElement = $doc->createElement("message");
                $dateAttributeElement = $doc->createAttribute("time");
                $dateAttributeElement->value = date("Y-m-d\TH:i:s");
                $messageElement->appendChild($dateAttributeElement);
                $userIdElement = $doc->createElement("userIdComment", $userId);
                $contentElement = $doc->createElement("content", $content);
                $messageElement->appendChild($userIdElement);
                $messageElement->appendChild($contentElement);
                $supportMessages->appendChild($messageElement);

                $doc->save("../xml/tickets.xml");

                header ("Location: ../views/ticket_details.php");
                exit();
            }
        }
    } else {
        echo "file not found";
    }
}
