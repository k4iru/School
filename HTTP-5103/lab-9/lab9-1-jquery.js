//LAB 9 - 1 FAQ PAGE

// wait for DOM to load
$(document).ready(function() {
    // hide all paragraphs initially
    $('p').hide();

    // toggle display: block/none with 3000ms transition time
    $('h2').click(function() {
        $(this).next('p').slideToggle(3000);
    });

    // invert colours when mouse over paragraphs
    $('p').hover(
        function(){
            $(this).toggleClass('textHovered');
        }
    );
});