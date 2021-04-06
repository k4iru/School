<?php

function getTicket($ticketId)
{
    $doc = new DOMDocument();

    $doc->preserveWhiteSpace = false;
    $doc->formatOutput = true;
    $path = "../xml/tickets.xml";
    $res = "";

    if (file_exists($path)) {
        $doc->load($path);
        $tickets = $doc->getElementsByTagName("ticket");
        foreach ($tickets as $ticket) {
            $currentTicketId = $ticket->getElementsByTagName("ticketId")->item(0)->nodeValue;
            if ($currentTicketId == $ticketId) {
                $res = $ticket;
            }
        }
    } else {
        echo "file not found";
    }
    return $res;
}
