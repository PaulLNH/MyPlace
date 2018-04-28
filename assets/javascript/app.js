
//show modal
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

//
$(".heart.fa").click(function() {
  $(this).toggleClass("fa-heart fa-heart-o");
});

