console.log("hello");


$(document).on("click", ".instructionsButton", function() {
  console.log("instructionsButton clicked");  
  $("#myModal").modal("toggle");
});

/*$(document).on("click", ".deleteArea", function() {
  console.log(`deleteArea button clicked`);
  console.log(`this.id1: ${this.id1}`);
  $.ajax({
    url: `api/deleteArea/:${this.id1}`,
    method: "DELETE"
  })
  .done(function(response) {
    console.log(`area deleted: ${JSON.stringify(response)}`);
  });
});*/
