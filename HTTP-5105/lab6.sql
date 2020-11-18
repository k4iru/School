-- 1.
CREATE TABLE IF NOT EXISTS myTable (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    cur_time TIME,
    cur_date DATE,
    dec_num DECIMAL
);
-- 2.
INSERT INTO myTable
VALUES (NULL, NOW(), NOW(), 4),
    (NULL, NOW(), NOW(), 1),
    (NULL, NOW(), NOW(), 7);
-- 3.
REPLACE INTO myTable
VALUES (3, NOW(), NOW(), 22);
-- 4.
UPDATE myTable
SET id = 6
WHERE id = 1;
-- 5.
DELETE FROM myTable
WHERE id = 3;
-- 6.
ALTER TABLE myTable
ADD whole_num INT NOT NULL;
-- 7.
ALTER TABLE myTable CHANGE whole_num new_num INT NOT NULL;
-- 8.
ALTER TABLE myTable CHANGE new_num new_num_with_default INT NOT NULL DEFAULT 3;
-- 9.
ALTER TABLE myTable DROP new_num_with_default;
-- 10.
DROP TABLE myTable;