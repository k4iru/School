<?php
session_start();
require_once "../functions/logout.php";

$tickets = "";

// if session is set check if timed out. else send to login
if (isset($_SESSION['valid'])) {
  // check if timed out
  if ($_SESSION['timeout'] < time()) {
    $_SESSION['valid'] = false;
  }
} else {
  header('Location: login.html');
  exit;
}

// if timed out unset session
if ($_SESSION['valid'] = false) {
  logout();
}

$doc = new DOMDocument();
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;
$path = "../xml/tickets.xml";
if (file_exists($path)) {
  $doc->load($path);
  $tickets = $doc->getElementsByTagName("ticket");
}
?>

<html lang="en">

<head>
  <meta chartset="utf-8" />
  <title>Tickets</title>
  <link rel="stylesheet" href="../css/style.css">
</head>

<body>
  <h1>Tickets</h1>
  <form action="../functions/logout.php" method="POST">
    <input type="submit" name="logout" value="Logout">
  </form>
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
      // print only client tickets
      else {
        foreach ($tickets as $ticket) {
          $userId = $ticket->getElementsByTagName("userId")->item(0)->nodeValue;
          $ticketId = $ticket->getElementsByTagName("ticketId")->item(0)->nodeValue;
          $dateOfIssue = $ticket->getElementsByTagName("dateOfIssue")->item(0)->nodeValue;
          $status = $ticket->getElementsByTagName("status")->item(0)->nodeValue;
          $subject = $ticket->getElementsByTagName("subject")->item(0)->nodeValue;

          if ($userId == $_SESSION["userId"]) {

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
      }
      ?>
    </tbody>
  </table>
</body>

</html>