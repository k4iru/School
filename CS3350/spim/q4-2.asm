.data
  N:  .word 5
  K:  .word 3

.text

main:

lw $a0, N
jal Fact
add $t1, $v0, $zero # n!

lw $a0, K
jal Fact
add $t2, $v0, $zero # k!

lw $t8, N
lw $t9, K
sub $a0, $t8, $t9
jal Fact
add $t3, $v0, $zero #(n-k)!

mul $t2, $t2, $t3
div $t1, $t1, $t2

mflo $a0 
li $v0, 1
syscall
j EXIT

Fact:
  addi $sp, $sp, -4
  sw $ra, 0($sp)
  addi $t6, $zero, 1
  li $v0, 1
  li $s0, 1

More_Fact: 
  beq $s0, $a0, END
  mul $v0, $v0, $a0
  sub $a0, $a0, $t6
  j More_Fact

END:
  lw $ra, 0($sp)
  addi $sp, $sp, 4
  jr $ra


EXIT:
  li $v0, 10
  syscall
