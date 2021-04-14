<?php
session_start();
//$_SESSION['trakt']['token'] => access token stored in this
//$_SESSION['trakt']['progress'] => stores the current progress in the authorization protocol

//$_SESSION['trakt']['progress'] = false;
//unset ($_SESSION['trakt']['token']);


define('TRAKT_URL', 'https://api.trakt.tv');

$TRAKT = array(
  'client_id' => '67dba1a9114a86155cbcab18601fc6749698da487d37d3531b7e22849449b8c1',
  'client_secret' => '506a4a51413f80bf83405f12da0d6cf485b167f5c576dd285d6b1035dea313ef',
  'redirect_uri' => 'https://localhost/http-5203/lab-8/trakt.php',
  'state' => 'awd7896gaysfhfh2454a' 
);

//OAuth flow
$auth = authorize($TRAKT);
if ($auth) {
  get_token($TRAKT);
}



//API functions
/**
 * Function to request an authorization code. Redirects to the Trakt login page for authorization.
 *
 * @param array $config An associative array containing important Trakt app settings for OAuth.
 * @return true Returns true if authorization code received.
 */
function authorize($config) {
  if (empty($_SESSION['trakt']['progress']) && !isset($_SESSION['trakt']['token'])) {
    $url = TRAKT_URL . '/oauth/authorize';
    $params = array(
      'response_type' => 'code',
      'client_id' => $config['client_id'],
      'redirect_uri' => $config['redirect_uri'],
      'state' => $config['state']
    );
    $request = $url . '?' . http_build_query($params);
    $_SESSION['trakt']['progress'] = 'authorizing';
    header("Location: $request");
  } else {
    return true;
  }
}
/**
 * Function to request access token.
 *
 * @param array $config An associative array containing important Trakt app settings for OAuth.
 * @return void
 */
function get_token($config) {
  if (isset($_GET['code']) && $_SESSION['trakt']['progress'] == 'authorizing') {
    if ($_GET['state'] == $config['state']) {
      $url = TRAKT_URL . '/oauth/token';
      $code = $_GET['code'];
      $data = array(
        'code' => $code,
        'client_id' => $config['client_id'],
        'client_secret' => $config['client_secret'],
        'redirect_uri' => $config['redirect_uri'],
        'grant_type' => 'authorization_code'
      );
      $opts = array(
        'http' => array(
          'header' => "Content-Type:application/json",
          'method' => 'POST',
          'content' => json_encode($data)
        )
      );
      $context = stream_context_create($opts);
      $result = json_decode(file_get_contents($url, false, $context));

      $_SESSION['trakt']['token'] = $result->access_token;
      $_SESSION['trakt']['progress'] = 'token';
    }
  }
}





