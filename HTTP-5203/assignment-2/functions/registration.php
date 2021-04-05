<?php

$doc = new DOMDocument();

$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;
$path = "../xml/users.xml";
if (file_exists($path)) {
    $doc->load($path);
}
