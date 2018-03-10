.data
  space:    .asciiz "\n"
  size:     .word 9
  elements:  .word 5, 18, 9, 1, 3, 14, 10, 4, 6, 7

.text

main:

j FUNC

FUNC:
  la $a0, elements
  lw $a1, size

  lw $s0, 0($a0) # max
  lw $s1, 0($a0) # min

LOOP:
  beq $a1, $zero, EXIT
  add $a0, $a0, 4 # increment array
  lw $t1, 0($a0)
  slt $t9, $t1, $s0 # if current number is larger than current max
  beq $t9, $zero, MAX
  slt $t9, $s1, $t1 # if current number is smaller than current min
  beq $t9, $zero, MIN
  addi $a1, $a1, -1
  j LOOP
  

MAX:
  add $s0, $t1, $zero
  addi $a1, $a1, -1
  j LOOP

MIN:
  add $s1, $t1, $zero
  addi, $a1, $a1, -1
  j LOOP

EXIT:
  add $a0, $s0, $zero
  li $v0, 1
  syscall

  addi $v0, $zero, 4
  la $a0, space
  syscall

  add $a0, $s1, $zero
  li $v0, 1
  syscall

  li $v0, 10
  syscall
