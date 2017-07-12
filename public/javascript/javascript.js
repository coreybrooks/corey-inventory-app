console.log("hello");


$(document).on("click", ".instructionsButton", function() {
  console.log("instructionsButton clicked");  
  $("#myModal").modal("toggle");
});
