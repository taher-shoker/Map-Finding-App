// JavaScript Document

/****initialize main screen****/


 $(document).ready(function(e) {
   
	
$('.screen').on('tap', function(e) { 
  $(this).fadeOut(2000,function(){
    window.location.replace("main.html");
  });
});

}); 