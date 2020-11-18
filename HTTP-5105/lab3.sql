-- 1.
Select w.*,
    first_name,
    last_name
FROM withdrawals w
    JOIN members m ON w.member_id = m.member_id -- 2.
SELECT title,
    first_name,
    last_name,
    w.*
FROM withdrawals
    JOIN members m ON w.member_id = m.member_id
    JOIN books b ON w.book = b.book_id -- 3.
SELECT title,
    first_name,
    last_name,
    w.*
FROM withdrawals
    JOIN members m ON w.member_id = m.member_id
    JOIN books b ON w.book = b.book_id
ORDER BY withdrawal_date DESC -- 4. 
SELECT title,
    COUNT(*)
FROM withdrawals w
    JOIN books b ON w.book_id = b.book_id
GROUP BY title
ORDER BY COUNT(*) DESC
LIMIT 5 -- 5.
SELECT title,
    first_name,
    last_name
FROM books b
    JOIN authorship a ON b.book_id = a.book_id
    JOIN authors a2 ON a.author_id = a2.author_id -- 6.
SELECT title,
    first_name,
    last_name
FROM books b
    JOIN authorship a ON b.book_id = a.book_id
    JOIN authors a2 ON a.author_id = a2.author_id
WHERE genre = 'Horror' -- 7. 
SELECT title,
    first_name,
    last_name
FROM books b
    JOIN authorship a ON b.book_id = a.book_id
    JOIN authors a2 ON a.author_id = a2.author_id
WHERE title LIKE 'Night of the Living Dummy%'