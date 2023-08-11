document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  });


  $(document).ready(function() {
    $(".zoomable").on("click", function() {
        $(this).toggleClass("zoomed");
    });
});
