-- 1.
SELECT
	title,
	first_name,
	last_name
FROM
	authors a2
JOIN authorship a ON
	a2.author_id = a.author_id
JOIN books b ON
	a.book_id = b.book_id

-- 2.
SELECT
	first_name,
	last_name,
	CONCAT(SUBSTRING(first_name, 1, 1), ".", SUBSTRING(last_name, 1, 1)) AS 'Initials',
	title
FROM
	books b
JOIN withdrawals w ON
	b.book_id = w.book_id
JOIN members m ON
	w.member_id = m.member_id
WHERE
	first_name LIKE 'B%'
	AND last_name LIKE 'W%'

--3. 
SELECT
	first_name,
	last_name,
	COUNT(*) AS 'Books Authored'
FROM
	authors a
JOIN authorship a2 ON
	a.author_id = a2.author_id
JOIN books b ON
	a2.book_id = b.book_id
WHERE
	country IN ('USA',
	'U.S.')
GROUP BY
	a.author_id

--4.
SELECT
	first_name,
	last_name,
	w.withdrawal_date,
	b.title
FROM
	members m
JOIN withdrawals w ON
	m.member_id = w.member_id
JOIN books b ON
	w.book_id = b.book_id
WHERE
	MONTH(w.withdrawal_date) = 10

-- 5.
SELECT
	first_name,
	last_name,
	w.withdrawal_id,
	w.withdrawal_date,
	w.return_date
FROM
	members m
JOIN withdrawals w ON
	m.member_id = w.member_id
WHERE
	w.return_date > w.withdrawal_date

-- 6.
SELECT
	first_name,
	last_name,
	a2.book_id 
FROM
	authors a
LEFT JOIN authorship a2 ON
	a.author_id = a2.author_id

-- 7. 
SELECT
	first_name,
	last_name
FROM
	members m
LEFT JOIN withdrawals w ON
	m.member_id = w.member_id
WHERE
	w.member_id IS NULL

-- 8.
SELECT
	m.first_name,
	m.last_name
FROM
	withdrawals w
RIGHT JOIN members m ON
	w.member_id = m.member_id
WHERE
	w.member_id IS NULL

-- 9.
SELECT
	*
FROM
	books,
	authors

-- 10.
SELECT
	DISTINCT m.first_name,
	m.last_name
FROM
	members m
JOIN members m2 ON
	m.first_name = m2.first_name
	AND m.member_id <> m2.member_id
ORDER BY
	m.first_name