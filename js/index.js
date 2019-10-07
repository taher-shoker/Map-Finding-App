



$(window).on('load',function(){
    localStorage.setItem('password','khalifa');
    $('#loginModal').modal('show');
});


// script for login 
$('#loginModal #login-btn').click(login); 
    function login() {      
        var passValue = $('#pass-modal').val()
        if(localStorage.getItem("password") === passValue ) {
            
           $('#loginModal').modal('hide')
           $('.set-point').css('display','block')
        }else{
            alert('invalid password')
        }
   
    }
// script for login 
$('#loginModal #close-btn').click(function(){
    window.location.replace('main.html')
}); 



var radios ='english'
// script for get languageValue
$('input[type="radio"]').click(function() {
   
        radios = document.querySelector('input[name="radioLanguages"]:checked').value;
})

   
// script save setting
$('#save').click(function(){
    window.location.replace("welcome.html");
    localStorage.setItem('language',radios)
})

//



//script for set starting point 
    $('#one').click(function(e) {
        $('.map i').css({
            'left':' 0',
            'top': '0'
        });
       
        $('.map i').css({
            'display':'block',
            'left':'16.4%',
            'top': '37%'
        });
        localStorage.setItem("startPoint","start1")
       
      })

      $('#two').click(function(e) {
        $('.map i').css({
            'left':' 0',
            'top': '0'
        });
        $('.map i').css({
            'display':'block',
            'left':'29.4%',
            'top': '28%'
   
        });
        localStorage.setItem("startPoint","start2")
       
      })



      $('#three').click(function(e) {
        $('.map i').css({
          
            'left':' 0',
            'top': '0'
        });
        $('.map i').css({
            'display':'block',
            'left':'61%',
            'top': '82%'
        });
        localStorage.setItem("startPoint","start3")
      })


      $('#four').click(function(e) {
        $('.map i').css({
           
            'left':' 0',
            'top': '0'

        });
        $('.map i').css({
            'display':'block',
            'left':'67.3%',
            'top': '82%'
        });
        localStorage.setItem("startPoint","start4")
       
      })

      $('#five').click(function(e) {
        $('.map i').css({
          
            'top': '0',
            'left':'0'
        });
        $('.map i').css({
            
            'display':'block',
            'left': '72.4%',
            'top': '39%'
          

        });
        localStorage.setItem("startPoint","start5")
      })


      $('#six').click(function(e) {
        $('.map i').css({
            'left':' 0',
            'top': '0',
            
        });
        $('.map i').css({
            'display':'block',
            'left': '77.6%',
            'top': '23%'
          
        });
        localStorage.setItem("startPoint","start6")
      })
 

    
