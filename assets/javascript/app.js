
//show modal
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

//
$(".heart.fa").click(function() {
  $(this).toggleClass("fa-heart fa-heart-o");
});

$(document).ready(function () {
  $('.carousel').carousel({
    interval: false
  });

  // manual carousel controls
  $('.next').click(function () {
      $('.carousel').carousel('next');
      return false;
  });
  $('.prev').click(function () {
      $('.carousel').carousel('prev');
      return false;
  });

})(jQuery);
