
$('#long-tap').on('taphold', function(e) { 
  window.location.replace('index.html')
});

$('.screen').on('tap', function(e) { 
  $(this).fadeOut(2000,function(){
    window.location.replace("main.html");
  });
});