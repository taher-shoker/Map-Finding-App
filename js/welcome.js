// JavaScript Document

/****initialize main screen****/



   
	
$('.screen').on('tap', function(e) { 
  $(this).fadeOut(2000,function(){
    window.location.replace("main.html");
  });
});
