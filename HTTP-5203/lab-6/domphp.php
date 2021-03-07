<?php
$doc = new DOMDocument();

$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;
$path = "xml/books.xml";

// 
if (file_exists($path)) {
    $doc->load($path);
    $books = $doc->getElementsByTagName("author");
    $lastbook = $books->item(1);

    // only add middlename once
    if ($lastbook->getElementsByTagName("middlename")->length == 0) {
        $element = $doc->createElement("middlename", "Gordon" );
        $lastbook->appendChild($element);
    }
    $doc->save("xml/books.xml");

    $books = $doc->getElementsByTagName("book");
    
    echo "
    <html>
        <head>
            <meta charset='utf-8'>
            <title>Lab 6</title>
        </head>
        <body>
        <h1>Book Catalogue</h1>
        <table>
            <thead>
                <tr>   
                    <th>Cover</th>
                    <th>Book Details</th>
                </tr>
            </thead>
            <tbody>
";
    foreach($books as $book) {
        $cover = $book->getElementsByTagName("cover")->item(0)->nodeValue;
        $author = $book->getElementsByTagName("lastname")->item(0)->nodeValue;
        $author .= ", ";
        $author .= $book->getElementsByTagName("firstname")->item(0)->nodeValue . " ";
        $author .= $book->getElementsByTagName("middlename")->item(0)->nodeValue;
        echo "
        <tr>
            <td><img src='$cover' height='150'></td>
            <td>$author</td>
        </tr>";
    }
    echo "</body>";

} else {
    echo "cant find file";
}
