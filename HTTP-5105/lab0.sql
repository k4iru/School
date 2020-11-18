-- 1. What are the media types in the MediaType table?
SELECT * FROM MediaType

-- 2. What are the employees' full names? Show this in a single column called "Employee Names"
SELECT FirstName || ' ' || LastName AS 'Employee Names' From Employee

-- 3. What's 987 plus 789, divided by 111? (Don't forget about BEDMAS!)
SELECT (987 + 789) / 111

-- 4. Who are all the customers in Brazil and Canada?
SELECT * FROM Customer WHERE Country='Brazil' OR Country='Canada'

-- 5. Who are all the customers with hotmail addresses?
SELECT * FROM Customer WHERE Email LIKE '%@hotmail.com'

-- 6. Who are all the customers who don't have a company listed?
SELECT * FROM Customer WHERE Company Is NULL

-- 7. What are the genres whose name is in the second half of the alphabet?
SELECT * FROM Genre WHERE Name >= 'N' ORDER BY NAME ASC

-- 8. List the cities with employees, reverse alphabetically.
SELECT City FROM Employee ORDER BY CITY DESC