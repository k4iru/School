//LAB 9 - 2 INVENTORY PAGE
$(document).ready(function () {

    // hide descriptions initially
    $('td:nth-child(4)').hide();

    // on hover selected row turns red
    $('tr').hover(function() {
        $(this).toggleClass('selected');
    })

    // on click toggle display of description
    $('tr').click(function() {
        $(this).find(':nth-child(4)').toggle();
    })
});