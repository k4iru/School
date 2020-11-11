-- 1-3
CREATE TABLE IF NOT EXISTS athlete (
    athlete_id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL
) 

CREATE TABLE event (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(255) NOT NULL,
    event_time TIME
) 

CREATE TABLE results (
    athlete INT,
    place INT NOT NULL,
    event INT,
    FOREIGN KEY(athlete) REFERENCES athlete(athlete_id),
    FOREIGN KEY (event) REFERENCES event(event_id)
) 

-- 4. 
CREATE VIEW winners AS
SELECT a.fname,
    a.lname,
    e.event_name,
    e.event_time,
    r.place AS 'Placement'
FROM athlete a
    JOIN results r ON a.athlete_id = r.athlete
    JOIN event e ON r.event = e.event_id 

-- 5.
CREATE VIEW losers AS
SELECT *
FROM athlete a
    LEFT JOIN results r ON a.athlete_id = r.athlete
WHERE place IS NULL 

-- 6.
CREATE TABLE data_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(255),
    athlete_id_old INT,
    athlete_id_new INT,
    placement_old INT,
    placement_new INT,
    event_id_old INT,
    event_id_new INT,
    time_stamp TIMESTAMP
) 

-- 7.
CREATE TRIGGER log_insert
AFTER
INSERT ON results FOR EACH ROW BEGIN
INSERT INTO data_log (
        action,
        athlete_id_new,
        placement_new,
        event_id_new,
        timestamp
    )
VALUES ('insert', athlete, place, event, NOW());
END;

-- 8.
CREATE TRIGGER log_update
AFTER
UPDATE ON results FOR EACH ROW BEGIN
INSERT INTO data_log (
        action,
        athlete_id_old,
        athlete_id_new,
        placement_old,
        placement_new,
        event_id_old,
        event_id_new,
        timestamp
    )
VALUES (
        'update',
        OLD.athlete,
        NEW.athlete,
        OLD.place,
        NEW.place,
        OLD.event,
        NEW.event,
        NOW()
    );
END;

-- 9.
CREATE TRIGGER incorrect_place BEFORE
INSERT ON results FOR EACH ROW BEGIN if (NEW.place NOT IN (1, 2, 3)) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Incorrect place';
END IF;
END;