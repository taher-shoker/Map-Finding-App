/*********** script fetch data from file json ************ */
var rooms = []
var allevents=[];
var paths = [];
var url ='http://khalifacomputer.com/kcgprojects/mapbackend/mapservice.php?order=1';
fetch(url).then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data.rooms);
   rooms = data.rooms
  rooms.map(i=>{
    console.log(i.type)
    if(i.type =='hall') {
      $('.info').css('display','block')
    }
    $('#sidebarMenuInner').append( 
  '<li id='+i.id+'><div class="name '+i.type+'" >'+i.name+'</div><div class="info-btns" ><div class="location"  data-index="' + i.id + '" ><i class="fas fa-map-marker-alt fa-2x"></i></div><div class="info"  data-toggle="modal" data-target="#modalInfo" data-index="' + i.id + '" ><i class="fas info fa-info-circle fa-2x"></i></div></div></li>'
  );
  paths.push(i.paths)
  allevents.push(i.events)
})
}).catch(err => {
  // Do something for an error here
  console.log(err.message)
});



/**********  script for popup modal on rooms**************** */
 $("svg").on('click','.cls-8',function(e) {
var x;
 x = $(this).data('location')
 y = x-1
console.log(y)
var d = document.getElementById('direction')
d.setAttribute('location',y)
$('#modalMap').modal('show')
$('#modalMap').on('shown.bs.modal', function(e) {
 




  $(".events").empty()


     
  $('.room-name').html(rooms[y].name);
  $('.info-text').html(rooms[y].info);


  rooms[y].events.map(event=>{
    var speakers = event.speaker;
    var speakershtml="";
     speakers.map(s=>{
     speakershtml=speakershtml+'<li class="speaker"><img src="'+s.img+'" class="img-speaker" alt=""><div class="speaker-info">\<span class="job-title">'+s.jobTitle+'</span>.<span class="name">'+s.name+'</span></div></li>'
})
 

/**** script to get day name *****/
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
var d = new Date(event.day);
var dayName = days[d.getDay()];

/**********  script to get month name**************** */
var monthNames = ["Jan", "Feb", "March", "Apr", "May", "June",
"July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

var d = new Date(event.day);
var  monthName =monthNames[d.getMonth()];

/***** get full year*****/
var d = new Date(event.day);
var n = d.getFullYear()
/*** script to append Html ****/
if (new Date(event.day) >= new Date()){
  if(new Date(event.day) === new Date()){
    $('.events').append(' <div class="event card"><h5 class="card-header text-center">'+event.title+'</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>Today</td></tr><tr><th scope="col">Time </th><td>'+event.startTime+' - '+event.endTime+'</td></tr><tr><th scope="row" class="align-middle">Description</th><td>'+event.info+'</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers"></ul></td></tr></tbody></table></div></div>') 
  }else {
    $('.events').append(' <div class="event card"><h5 class="card-header text-center">'+event.title+'</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>'+dayName+','+monthName+','+ n +'</td></tr><tr><th scope="col">Time </th><td>'+event.startTime+' - '+event.endTime+'</td></tr><tr><th scope="row" class="align-middle">Description</th><td>'+event.info+'</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers">'+speakershtml+'</ul></td></tr></tbody></table></div></div>')
  }
}
  })
});  

}); 

/************** script for button direction*****************/
$('.modal').on('click','#direction', function(){
  $('.modal').modal('hide');
  var path = document.getElementById('one');
 
  var i = $(this).data('location');
  i = i-1
  
  paths[i].map(p=>{
    if (p.startPoint === localStorage.getItem('startPoint')){
      path.setAttribute('points',p.pathPoint);
    }
  })
 
})
/********* script for info button************ */
    $('#modalInfo').on('shown.bs.modal', function(e) {
      direction = document.getElementById('direction')
    $(".events").empty()
    var i = $(e.relatedTarget).data('index');
        i = i - 1;
       
  
    $('.room-name').html(rooms[i].name);
    $('.info-text').html(rooms[i].info);

    rooms[i].events.map(event=>{
      var speakers = event.speaker;
      var speakershtml="";
       speakers.map(s=>{
       speakershtml=speakershtml+'<li class="speaker"><img src="'+s.img+'" class="img-speaker" alt=""><div class="speaker-info">\<span class="job-title">'+s.jobTitle+'</span>.<span class="name">'+s.name+'</span></div></li>'
  })
   
  
      /**** script to get day name *****/
      var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  var d = new Date(event.day);
  var dayName = days[d.getDay()];
  
  /**********  script to get month name**************** */
  var monthNames = ["Jan", "Feb", "March", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  
  var d = new Date(event.day);
  var  monthName =monthNames[d.getMonth()];
  
  /***** get full year*****/
  var d = new Date(event.day);
  var n = d.getFullYear()
  /*** script to append Html ****/
  if (new Date(event.day) <= new Date()){
    if(new Date(event.day) === new Date()){
      $('.events').append(' <div class="event card"><h5 class="card-header text-center">'+event.title+'</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>Today</td></tr><tr><th scope="col">Time </th><td>'+event.startTime+' - '+event.endTime+'</td></tr><tr><th scope="row" class="align-middle">Description</th><td>'+event.info+'</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers"></ul></td></tr></tbody></table></div></div>') 
    }else {
      $('.events').append(' <div class="event card"><h5 class="card-header text-center">'+event.title+'</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>'+dayName+','+monthName+','+ n +'</td></tr><tr><th scope="col">Time </th><td>'+event.startTime+' - '+event.endTime+'</td></tr><tr><th scope="row" class="align-middle">Description</th><td>'+event.info+'</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers">'+speakershtml+'</ul></td></tr></tbody></table></div></div>')
    }
  }
    })
});  

 
/*************script for location button  to set path animation***************** */
$('#sidebarMenuInner').on('click','.location',function(e){
  var path = document.getElementById('one');
  var i = $(this).data('index');
  i = i-1
  paths[i].map(p=>{
    if (p.startPoint === localStorage.getItem('startPoint')){
      path.setAttribute('points',p.pathPoint);
    }
  })
var data = path.getAttribute('points');
console.log(data)
})

/*************** script when click on li to set path**************************** */
 $('#sidebarMenuInner').on('click','li',function(){
 var path = document.getElementById('one');
  var i = this.getAttribute('id'),
      i = i-1;
 

  paths[i].map(p=>{
    console.log(p.pathPoint)
    if (p.startPoint === localStorage.getItem('startPoint')){
      path.setAttribute('points',p.pathPoint);

    }
  }) 
  
}) 
/******* script for get date and time **** */
var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

$('.current-date').html(date)

/***********script to stop any animation ************* */
$('svg').click(function(){
  $(" #rest2,#rest1").attr("class","cls-17");
  $("#bathrooms polygon, rect.cls-7").attr("class", "cls-7 "); 
  $(".cls-6").attr("class", "cls-6 ");
})

	/***script for left icons ***/
$(function() {
    $('nav #setting').on('click', function() {
        window.location.replace('index.html')
    });		
});

$(function() {
  $('nav #toilet').on('click', function() {
    $(" #rest2,#rest1").attr("class","cls-17");
    $(".cls-6").attr("class", "cls-6 ");
   $("#bathrooms polygon, rect.cls-7").attr("class", "cls-7  flash animated infinite"); 

  });		
});
$(function() {
  $('nav #restaurant').on('click', function() { 
    $("#bathrooms polygon, rect.cls-7").attr("class", "cls-7 "); 
    $(".cls-6").attr("class", "cls-6 ");
    $(" #rest2,#rest1").attr("class", "cls-17 flash animated infinite");

  });		
});
$(function() {
  $('nav #clinic').on('click', function() { 
    $("#bathrooms polygon,.cls-7").attr("class", "cls-7 ");
    $(" #rest2,#rest1").attr("class","cls-17"); 
    $(".cls-6").attr("class", "cls-6 flash animated infinite");
    
  });
});

/**************** script for toggle sidebar *************** */
$('#sidebarMenu').on('click',function(){
  $('#sidebarMenu').toggleClass('show') 
 console.log('hjhg')
})

/*==================== script for custom nice scroll=========================== */
$("body").niceScroll({
    cursorcolor: "#0394c9", // change cursor color in hex
    cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
    cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
    cursorwidth: "8px", // cursor width in pixel (you can also write "5px")
    cursorborder: "none",
    enablemousewheel: false,
    dblclickzoom: true
    
    
  });
  $("#sidebarMenu").niceScroll({
    cursorcolor: "#0394c9", // change cursor color in hex
    emulatetouch: true,
    cursorborder: "none",
  
  });


