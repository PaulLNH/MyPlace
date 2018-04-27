var searchInput = "University+Of+New+Hampshire,Durham,NH";
var background =
  'https://maps.googleapis.com/maps/api/staticmap?center="' +
  searchInput +
  '"&zoom=15&size=1200x2000&scale=2&maptype=street&markers=size:mid%7Ccolor:0xb70000%7Clabel:%7C' +
  searchInput +
  "&key=AIzaSyDXmz75aIEpLy3M36t39IfSjbsZnbEYaZc";
var backgroundImg = $("#backgroundImg");

backgroundImg.attr("src", background);
// $("body").css("background-image", "url(" + background + ")");
