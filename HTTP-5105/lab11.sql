-- 1.
DROP PROCEDURE IF EXISTS sesameStreet;
DELIMITER $$

CREATE PROCEDURE sesameStreet(
	IN str1 VARCHAR(255),
	IN str2 VARCHAR(255),
	IN num INT,
	IN d DATE
)
BEGIN
	SELECT CONCAT(
		DATE_FORMAT(d, "%M %d %Y"),
		'''s episode of Sesame Street has been brought to you by the letters ',
		UPPER(SUBSTRING(str1,1,1)),
		' and ',
		UPPER(SUBSTRING(str2,1,1)),
		', and the number ',
		num
	);
END;

$$
DELIMITER ;

-- 2.
DROP PROCEDURE IF EXISTS AddNewEventAndAthlete;
DELIMITER $$

CREATE PROCEDURE AddNewEventAndAthlete(
	param_first_name VARCHAR(255),
	param_last_name VARCHAR(255),
	param_event VARCHAR(255),
	param_event_time TIME,
	param_placement INT
)
BEGIN
	DECLARE var_athlete_id INT;
	DECLARE var_event_id INT;

	SELECT MAX(athlete_id) + 1 INTO var_athlete_id
		FROM athlete;
	SELECT MAX(event_id) + 1 INTO var_event_id
		FROM event;
	IF (SELECT EXISTS(SELECT * FROM event WHERE event_name = param_event) IS FALSE )
		THEN 
			INSERT INTO event (
			event_id, 
			event_name, 
			event_time
			) VALUES (
			var_event_id,
			param_event,
			param_event_time
			);	
	END IF;
	
	INSERT INTO athlete(
	athlete_id,
	fname,
	lname
	) VALUES (
	var_athlete_id,
	param_first_name,
	param_last_name
	);

	INSERT INTO results (athlete, place, event)
	VALUES (var_athlete_id, param_placement, var_event_id);
END;

$$
DELIMITER ;

CALL AddNewEventAndAthlete('John', 'Stone', 'Relay Race', '6:00:00', 2) 

-- 3.
DROP PROCEDURE IF EXISTS getDate;
DELIMITER $$

CREATE PROCEDURE getDate(
	OUT theDate DATE
)
BEGIN
	SELECT NOW() INTO theDate;	
END;

$$
DELIMITER ;

CALL getDate(@today);
SELECT TIMESTAMPDIFF(SECOND, @today, NOW());

-- 4.
DROP PROCEDURE IF EXISTS librarianOfTheMonth
DELIMITER $$

CREATE PROCEDURE librarianOfTheMonth(
	IN param_month DATE
)
BEGIN
	DECLARE var_done INT DEFAULT FALSE;
	DECLARE var_librarian_id INT;
	DECLARE var_fname VARCHAR(255);
	DECLARE var_lname VARCHAR(255);
	DECLARE var_location INT;
	DECLARE var_shift DECIMAL(6,2);


	DECLARE getMonthTotals CURSOR
	FOR SELECT l.id,
		fname,
		sname,
		location
	FROM librarian l
		JOIN shifts s
			ON l.id = s.librarian 
		WHERE MONTH(shift_day) = MONTH(param_month)
			AND YEAR(shift_day) = YEAR(param_month);
	DECLARE CONTINUE HANDLER FOR NOT FOUND
		SET var_done = TRUE;
		
	CREATE TABLE IF NOT EXISTS monthEntries (
		librarian_id INT PRIMARY KEY,
		fname VARCHAR(255),
		lname VARCHAR(255),
		shifts DECIMAL(6,2)
		);
	
	OPEN getMonthTotals;
	REPEAT
		FETCH getMonthTotals INTO
			var_librarian_id,
			var_fname,
			var_lname,
			var_location;
		IF (var_done = FALSE) THEN
			-- if location is childs library shift worth 1.5 instead of 1
			IF (var_location = 3) THEN
				SET var_shift = 1.5;
			ELSE 
				SET var_shift = 1.0;
 			END IF;
 		
			INSERT INTO monthEntries (
				librarian_id,
				fname,
				lname,
				shifts
				) VALUES (
				var_librarian_id,
				var_fname,
				var_lname,
				var_shift
				)
				-- accumulate shifts 
				ON DUPLICATE KEY UPDATE 
				shifts=shifts+var_shift;
			
		END IF;				
	UNTIL var_done END REPEAT;
	CLOSE getMonthTotals;
END$$
DELIMITER ;

CALL librarianOfTheMonth(NOW());
SELECT * FROM monthEntries me WHERE shifts = (SELECT MAX(shifts) FROM monthEntries me2);