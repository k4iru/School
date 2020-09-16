-- 1.
SELECT * 
FROM invoice 
    WHERE billingstate NOT NULL AND InvoiceId >= 400 
    ORDER BY InvoiceId DESC

-- 2.
SELECT * 
FROM employee 
    ORDER BY Birthdate DESC 
    LIMIT 10 OFFSET 2

-- 3.
SELECT DISTINCT LOWER(city) AS 'cities' 
FROM customer

-- 4.
SELECT firstname, 
    lastname, 
    SUBSTR(lastname,3,1) AS '3rd letter of last name' 
FROM customer 
    WHERE firstname LIKE LOWER('%t%') OR LOWER(lastname) LIKE '%t%'

-- 5.
SELECT REPLACE(name, 'ö',':)') 
FROM artist 
    WHERE name LIKE '%ö%'

-- 6.
SELECT customerid, 
    COALESCE(state, '') AS 'State', 
    COALESCE(fax, '') AS 'Fax' 
FROM customer

-- 7.
SELECT LOWER(SUBSTR(title,1,20)) AS 'Title' 
FROM album 
    WHERE LENGTH(title) > 20

-- 8. 
SELECT * 
FROM invoice 
    WHERE billingcity IN ('Berlin', 'Toronto') AND total > 5 
    ORDER BY invoicedate DESC