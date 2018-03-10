.text

main:
    addi $8, $0, 1
    addi $9, $0, 2
    addi $10,$0, 3
    beq $16, $8,  ONE
    beq $16, $9,  TWO
    beq $16, $10, THREE
    addi $2, $0, 0
    j EXIT
    ONE:    addi $2, $0, 10
    j EXIT
    TWO:    addi $2, $0, 50
    j EXIT
    THREE:  addi $2, $0, 100
    EXIT:
    jr $31
