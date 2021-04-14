<?php

define('TRAKT_URL', 'https://api.trakt.tv');

$TRAKT = array(
  'client_id' => '67dba1a9114a86155cbcab18601fc6749698da487d37d3531b7e22849449b8c1',
  'client_secret' => '506a4a51413f80bf83405f12da0d6cf485b167f5c576dd285d6b1035dea313ef',
  'redirect_uri' => 'https://localhost/http-5203/lab-8/trakt.php',
  'state' => 'awd7896gaysfhfh2454a'
);

$url = TRAKT_URL . '/movies/trending?page=1&limit=15';

/*
I need these headers

Content-Type:application/json
trakt-api-version:2
trakt-api-key:[client_id]
*/
//Note the client ID was taken from the $TRAKT array.
$headers = array(
  "Content-Type:application/json",
  "trakt-api-version:2",
  "trakt-api-key:$TRAKT[client_id]"
);
$opts = array(
  'http' => array(
    'header' => $headers,
    'method' => 'GET'
  )
);
$context = stream_context_create($opts);
$result = json_decode(file_get_contents($url, false, $context));

print "
<table>
  <thead>
    <tr>
    <th>Movie Title</th>
    <th>Year</th>
    </tr>
  </thead>
  <tbody>";


foreach ($result as $r) {
  print "<tr>";
  $movie = $r->movie;
  $id = $movie->ids->imdb;
  print "<td><a href='https://www.imdb.com/title/$id'>$movie->title</a></td>";
  print "<td>$movie->year</td>";
  print "</tr>";
}
print "</tbody></table>";
