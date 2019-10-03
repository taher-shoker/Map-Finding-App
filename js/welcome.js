// JavaScript Document

/****initialize main screen****/


$(document).ready(function(e) {
   
	
	
	$(".screen").click(function(e) {
		$(".screen").fadeOut(2000,function(){
			window.location.replace("main.html");
		});
	});

});/*****end doc ready***/