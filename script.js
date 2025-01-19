<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
$(document).ready(function () {
    let spans = $("#fun-container span");
    let index = 0;

    // Hide all spans initially
    spans.hide();

    function showNextSpan() {
        $(spans[index])
            .fadeIn(500) // Show the current span
            .delay(4500) // Wait for 4.5 seconds
            .fadeOut(500, function () {
                index = (index + 1) % spans.length; // Increment index, loop back if needed
                showNextSpan(); // Call the function for the next span
            });
    }

    // Start displaying spans
    showNextSpan();
});
</script>
