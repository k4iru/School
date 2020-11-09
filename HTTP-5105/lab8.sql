--1.
SELECT l.fname,
    l.sname,
    s.shift,
    a.location
FROM librarian l
    JOIN shifts s ON l.id = s.librarian
    JOIN assign a ON s.location = a.id
WHERE s.shift_day = '2020-11-16' 

--2.
SELECT l.fname,
    l.sname,
    s.shift,
    a.location
FROM librarian l
    JOIN shifts s ON l.id = s.librarian
    JOIN assign a ON s.location = a.id
WHERE s.shift_day = '2020-11-16'
    AND l.id = 3