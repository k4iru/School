-- 1.
INSERT INTO demo (
        id,
        `characters`,
        dates,
        decimalNumbers,
        whole_numbers,
        date_and_time
    )
VALUES (1, ' kyle', '2020-10-14', 1.1, 3, NOW()) 

-- 2.
INSERT INTO demo
VALUES (3, ' kyle', '2020-10-14', 1.1, 3, NOW()) 

-- 3.
INSERT INTO demo (
        `characters`,
        whole_numbers,
        date_and_time
    )
VALUES ('jacob', 22, NOW()) 

-- 4.
INSERT INTO demo
VALUES (
        3 + 1,
        ' kyle',
        '2020-10-14',
        1.1 * 1,
        3 / 3,
        NOW()
    ) 
    
-- 5.
INSERT INTO demo
VALUES (NULL, ' kyle', NOW(), 1.1 * 1, 3 / 3, NOW()) 

-- 6.
INSERT INTO demo
VALUES (
        NULL,
        ' kyle',
        NOW(),
        1.1 * 1,
        DATEDIFF('2020-02-14', NOW()),
        NOW()
    ) 

--7.
INSERT INTO demo
VALUES (
        NULL,
        ' kyle',
        DATE_SUB(NOW(), INTERVAL 20 MONTH),
        1.1 * 1,
        DATEDIFF('2020-02-14', NOW()),
        DATE_ADD(NOW(), INTERVAL 500 HOUR)
    ) 

-- 8.
SELECT MONTHNAME(dates),
    MONTHNAME(date_and_time)
FROM demo d 

-- 9.
SELECT CAST(decimalNumbers AS DECIMAL(5, 0))
FROM demo d 

-- 10.
SELECT *
FROM demo d
WHERE EXTRACT(
        MONTH
        FROM date_and_time
    ) = 10