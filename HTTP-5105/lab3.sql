-- 1.
SELECT * 
FROM bikeTheft
WHERE Neighbourhood 
    LIKE '%Humber%'

-- 2.
SELECT * 
FROM bikeTheft 
WHERE Neighbourhood 
    LIKE '%Humber%' AND (Occurrence_Year % 2) = 1

-- 3.
SELECT CONCAT('$',AVG(Cost_of_Bike)) AS 'Average Bike Cost' 
FROM bikeTheft

--4. 
SELECT COUNT(DISTINCT Bike_Colour, Bike_Speed)
FROM bikeTheft

--5.
SELECT Location_Type 
FROM bikeTheft
GROUP BY Location_Type 
HAVING COUNT(*) > 500

--6.
SELECT Min(Occurrence_Date) 
FROM bikeTheft

--7. 
SELECT Neighbourhood, COUNT(Neighbourhood) 
FROM bikeTheft 
GROUP BY Neighbourhood 
ORDER BY COUNT(Neighbourhood) DESC
LIMIT 10

--8.
SELECT SUM(Cost_of_Bike) / COUNT(*), AVG(Cost_of_Bike)
FROM bikeTheft 

--9.

/*
they are not the same because SUM() and AVG() automatically exclude NULL values while COUNT(*) includes NULL.
The way to make AVG() get the same value as the first column is to first COALESCE() 
the null values into 0's so that all rows are counted.
*/

SELECT SUM(Cost_of_Bike) / COUNT(*), AVG(COALESCE(NULL,Cost_of_Bike, 0))
FROM bikeTheft 