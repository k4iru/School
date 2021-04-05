<?php
session_start();

$tickets = "";
if (isset($_SESSION['valid'])) {
  // check if timed out
  if ($_SESSION['timeout'] < time()) {
    $_SESSION['valid'] = false;
  }
}

if ($_SESSION['valid'] = false) {
  header('Location: login.html');
  exit;
}

$doc = new DOMDocument();
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;
$path = "../xml/tickets.xml";
if (file_exists($path)) {
  $doc->load($path);
  $tickets = $doc->getElementsByTagName("ticket");
}
echo date("Y-m-d\TH:i:s");
?>

<html lang="en">

<head>
  <meta chartset="utf-8" />
  <title>Login</title>
</head>

<body>
  <h1>Tickets</h1>
  <table>
    <thead>
      <tr>
        <th>Ticket Id</th>
        <th>Date of Issue</th>
        <th>Status</th>
        <th>Subject</th>
        <th>View Details</th>
      </tr>
    </thead>
    <tbody>
      <?php
      if ($_SESSION['userGroup'] == 'admin') {
        foreach ($tickets as $ticket) {
          $ticketId = $ticket->getElementsByTagName("ticketId")->item(0)->nodeValue;
          $dateOfIssue = $ticket->getElementsByTagName("dateOfIssue")->item(0)->nodeValue;
          $status = $ticket->getElementsByTagName("status")->item(0)->nodeValue;
          $subject = $ticket->getElementsByTagName("subject")->item(0)->nodeValue;

          echo "<tr>
      <td>$ticketId</td>
      <td>$dateOfIssue</td>
      <td>$status</td>
      <td>$subject</td>
      <td>
        <form action='./ticket_details.php' method='POST'>
          <input type='hidden' name='ticketId' value=$ticketId />
          <input type='submit' name='ticket_details' value='Ticket Details' />
        </form
      </td>
      </tr>";
        }
      }
      ?>
    </tbody>
  </table>
</body>

</html>