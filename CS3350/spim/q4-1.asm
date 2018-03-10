.data 
  n:  .word 6
  k:  .word 3

.text

main:
  jal A   # Test 1st function
  j EXIT

A:
  lw $t0, n
  lw $t1, k
  addi $t3, $zero, 1 # ALOOPEXIT condition = 1
  sub $t2, $t0, $t1
  addi $t2, $t2, 1
  add $s0, $t0, $zero
  add $s1, $t1, $zero
  j ALOOP

ALOOP: 
  sub $t0, $t0, $t3
  mul $s0, $s0, $t0
  beq $t0, $t2, ALOOPEXIT
  j ALOOP

ALOOPEXIT:
  sub $t1, $t1, $t3
  mul $s1, $s1, $t1
  beq $t1, $t3, AEND
  j ALOOPEXIT

AEND: 
  div $s0, $s1
  mflo $a0 
  li $v0, 1
  syscall
  jr $ra

EXIT:
  li $v0, 10
  syscall
