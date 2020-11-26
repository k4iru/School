-- 1. 
DELIMITER $$
CREATE FUNCTION areaOfCircle ( radius INT )
RETURNS DECIMAL
DETERMINISTIC
BEGIN
	RETURN POWER(radius, 2) * PI();
END; $$
DELIMITER ;

--2.
DELIMITER $$
CREATE FUNCTION concatenate ( 
	string1 VARCHAR(255),
	string2 VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
	IF (LENGTH(string2) > LENGTH(string1))
		THEN
			RETURN CONCAT(string2, string1);
	END IF;
	RETURN CONCAT(string1, string2);
END; $$
DELIMITER ;

-- 3.
DELIMITER $$
CREATE FUNCTION setDueDate ( 
	bookingDate DATE
	)
RETURNS DATE
DETERMINISTIC
BEGIN
	IF (DAYOFWEEK(bookingDate) = 3)
		THEN
			RETURN ADDDATE(bookingDate, INTERVAL 22 DAY);
	END IF;
	RETURN ADDDATE(BookingDate, INTERVAL 21 DAY);
END; $$
DELIMITER ;

-- 4.
DELIMITER $$
CREATE FUNCTION cleanCa ( 
	string VARCHAR(255)
	)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
	IF (LOWER(SUBSTRING(string, 1,2)) = 'ca' AND LOWER(string) NOT IN ('cabo verde', 'cambodia', 'cameroon'))
		THEN
			RETURN 'CAN';
	END IF;
	RETURN string;
END; $$
DELIMITER ;

-- 5.
CREATE FUNCTION sumThree(
	x INT,
	y INT,
	z INT
)
RETURNS INT
DETERMINISTIC
BEGIN
	SET x = IFNULL(x, 0);
	SET y = IFNULL(y, 0);
	IF (z IS NULL)
		THEN
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'z is null';
	END IF;
	RETURN x + y + z;
END; 

-- 6.
DELIMITER $$
CREATE FUNCTION convertDistance(
	distance DECIMAL,
	unit VARCHAR(30)
)
RETURNS DECIMAL(10,6)
DETERMINISTIC
BEGIN
	DECLARE constant DECIMAL(10,6);
	SET constant = 0.621371;
	if (LOWER(unit) in ('km', 'kilometres')) THEN
		RETURN distance * constant;
	ELSEIF (LOWER(unit) in ('mile', 'miles')) THEN
		RETURN distance / constant;
	END IF;
	SIGNAL SQLSTATE '45000'
	SET MESSAGE_TEXT = 'invalid unit';
END; $$
DELIMITER ;

-- 7.
DELIMITER //

CREATE FUNCTION coffeeRatio(
	coffeeVolume INT,
	waterVolume INT,
	brewMethod VARCHAR(255)
)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
	DECLARE ratio INT;
	IF (LOWER(brewMethod) = 'percolation') THEN
		SET ratio = 60;
	ELSEIF (LOWER(brewMethod) = 'immersion') THEN
		SET ratio = 75;
	ELSE
		RETURN 'incorrect brew method';
	END IF;
	IF (coffeeVolume IS NULL AND waterVolume IS NULL) THEN
		RETURN 'please input some values';
	ELSEIF (coffeeVolume IS NULL) THEN
		RETURN CONCAT('you need ', waterVolume/ratio,'g of ground coffee');
	ELSEIF (waterVolume IS NULL) THEN
		RETURN CONCAT('you need ', coffeeVolume/ratio,'L of water');
	END IF;
	IF ((coffeeVolume / waterVolume) = ratio) THEN
		RETURN 'ratio good';
	END IF;
	RETURN 'adjust water';
END; //

DELIMITER ;

-- 8.
DELIMITER $$
CREATE FUNCTION countToZero()
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
	DECLARE x INT DEFAULT 20;
	DECLARE myString VARCHAR(255) DEFAULT '';
	WHILE x > 0 DO
		SET myString = CONCAT(myString, ' ', x);
		SET x = x - 2;
	END WHILE;
	RETURN myString;
END; $$
DELIMITER ;

-- 9. 
DELIMITER $$
CREATE FUNCTION isTodayFriday13(
	today DATE	
)
RETURNS VARCHAR(255)
BEGIN
	SET today = IFNULL(today, NOW());
	IF (DAYOFWEEK(today) = 6 AND DAYOFMONTH(today) = 13) THEN 
		RETURN 'Friday the 13th';
	END IF;
	RETURN 'Not Friday the 13th';
END; $$
DELIMITER ;

-- 10.
DELIMITER $$
CREATE FUNCTION dateFormat(
	d DATE
)
RETURNS VARCHAR(255)
BEGIN
	DECLARE day_name VARCHAR(30);
	DECLARE day_number VARCHAR(30);
	DECLARE month_name VARCHAR(30);
	DECLARE ordinance VARCHAR(30);
	SET d = IFNULL(d, NOW());
	SET day_name = DAYNAME(d);
	SET day_number = DAYOFMONTH(d);
	SET month_name = MONTHNAME(d);
	SET ordinance = CASE
		WHEN day_number%100 BETWEEN 11 AND 13 THEN 'th'
		WHEN day_number%10 = 1 THEN 'st'
		WHEN day_number%10 = 2 THEN 'nd'
		WHEN day_number%10 = 3 THEN 'rd'
		ELSE 'th'
	END;

	RETURN CONCAT(day_name, ' the ', day_number,ordinance, ' of ',month_name);
END; $$
DELIMITER ;