-- 1.
SELECT withdrawal_id, first_name, last_name
FROM withdrawals
    JOIN members
    ON withdrawals.member_id = members.member_id 
    
-- 2.
