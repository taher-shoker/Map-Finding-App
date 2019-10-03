/*======================== Informations About Application  ========================

Project Name : Map Finding
Created By : Khalifa Computer Group

<========== Table Script Content ==========>

1-> Fetch Data From API 
2-> Popup Model For Rooms
3-> Script For Button Direction
4-> Script For Button Info
5-> Script For Location Button  To Set Path Animation
6-> Script when Click On Map Elements [(rest)-(wc)-(other)]
7-> Script When Click On Li To Set Path
8-> Script To Stop Right Icons Animation
9-> Script For Toggle Sidebar
10-> Script For Custom Nice Scroll

*/

/*********** script fetch data from API ************ */
var rooms = []
var allevents = [];
var paths = [];
var url = 'http://khalifacomputer.com/kcgprojects/mapbackend/mapservice.php?order=1';
fetch(url).then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data.rooms);
  rooms = data.rooms
  rooms.map(i => {

    if (i.type == 'hall') {
      $('.info').css('display', 'block')
    }
    $('#sidebarMenuInner').append(
      '<li id=' + i.id + '><div class="name ' + i.type + '" >' + i.name + '</div><div class="info-btns" ><div class="location"  data-index="' + i.id + '" ><i class="fas fa-map-marker-alt fa-2x"></i></div><div class="info"  data-toggle="modal" data-target="#modalInfo" data-index="' + i.id + '" ><i class="fas info fa-info-circle fa-2x"></i></div></div></li>'
    );
    paths.push(i.paths)
    allevents.push(i.events)
  })
}).catch(err => {
  // Do something for an error here
  console.log(err.message)
});



/**********  script for popup modal for rooms**************** */
$("svg").on('click', '.cls-8', function (e) {
  var x;
  x = $(this).data('location')
  y = x - 1
  console.log(y)
  var d = document.getElementById('direction')
  d.setAttribute('location', y)
  $('#modalMap').modal('show')
  $('#modalMap').on('shown.bs.modal', function (e) {

    $(".events").empty()
    $('.room-name').html(rooms[y].name);
    $('.info-text').html(rooms[y].info);


    rooms[y].events.map(event => {
      var speakers = event.speaker;
      var speakershtml = "";
      speakers.map(s => {
        speakershtml = speakershtml + '<li class="speaker"><img src="' + s.img + '" class="img-speaker" alt=""><div class="speaker-info">\<span class="job-title">' + s.jobTitle + '</span>.<span class="name">' + s.name + '</span></div></li>'
      })


      /**** script to get day name *****/
      var d = new Date(event.day);
      var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    
      var dayName = days[d.getDay()];

      /**********  script to get month name**************** */
      var monthNames = ["Jan", "Feb", "March", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
      ];
      var monthName = monthNames[d.getMonth()];
      var dayNum = d.getDay()
     

      /***** get full year*****/
      var n = d.getFullYear()
      /*** script to append Html ****/
      if (new Date(event.day) >= new Date()) {
        if (new Date(event.day) === new Date()) {
          $('.events').append(' <div class="event card"><h5 class="card-header text-center">' + event.title + '</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>Today</td></tr><tr><th scope="col">Time </th><td>' + event.startTime + ' - ' + event.endTime + '</td></tr><tr><th scope="row" class="align-middle">Description</th><td>' + event.info + '</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers"></ul></td></tr></tbody></table></div></div>')
        } else {
          $('.events').append(' <div class="event card"><h5 class="card-header text-center">' + event.title + '</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>' + dayName + ',' +dayNum+ monthName + ',' + n + '</td></tr><tr><th scope="col">Time </th><td>' + event.startTime + ' - ' + event.endTime + '</td></tr><tr><th scope="row" class="align-middle">Description</th><td>' + event.info + '</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers">' + speakershtml + '</ul></td></tr></tbody></table></div></div>')
        }
      }
    })
  });

});

/************** script for button direction*****************/
$('.modal').on('click', '#direction', function () {
  $('.modal').modal('hide');
  var path = document.getElementById('one');

  var i = $(this).data('location');
  i = i - 1

  paths[i].map(p => {
    if (p.startPoint === localStorage.getItem('startPoint')) {
      path.setAttribute('points', p.pathPoint);
    }
  })

})
/********* script for info button************ */
$('#modalInfo').on('shown.bs.modal', function (e) {
  direction = document.getElementById('direction')
  $(".events").empty()
  var i = $(e.relatedTarget).data('index');
  i = i - 1;


  $('.room-name').html(rooms[i].name);
  $('.info-text').html(rooms[i].info);

  rooms[i].events.map(event => {
    var speakers = event.speaker;
    var speakershtml = "";
    speakers.map(s => {
      speakershtml = speakershtml + '<li class="speaker"><img src="' + s.img + '" class="img-speaker" alt=""><div class="speaker-info">\<span class="job-title">' + s.jobTitle + '</span>.<span class="name">' + s.name + '</span></div></li>'
    })


    /**** script to get day name *****/
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    var d = new Date(event.day);
    var dayName = days[d.getDay()];

    /**********  script to get month name**************** */
    var monthNames = ["Jan", "Feb", "March", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    
    var dayNum = d.getDay()+1
    var monthName = monthNames[d.getMonth()];
 console.log(d)
    /***** get full year*****/
    var n = d.getFullYear()
    /*** script to append Html ****/
    if (new Date(event.day) >= new Date()) {
      if (new Date(event.day) === new Date()) {
        $('.events').append(' <div class="event card"><h5 class="card-header text-center">' + event.title + '</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>Today</td></tr><tr><th scope="col">Time </th><td>' + event.startTime + ' - ' + event.endTime + '</td></tr><tr><th scope="row" class="align-middle">Description</th><td>' + event.info + '</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers"></ul></td></tr></tbody></table></div></div>')
      } else {
        $('.events').append(' <div class="event card"><h5 class="card-header text-center">' + event.title + '</h5><div class="card-body"><table class="table"><tbody><tr><th scope="col">Day</th><td>' + dayName + ',' + dayNum+''+ monthName + ',' + n + '</td></tr><tr><th scope="col">Time </th><td>' + event.startTime + ' - ' + event.endTime + '</td></tr><tr><th scope="row" class="align-middle">Description</th><td>' + event.info + '</td></tr><tr><th scope="row" class="align-middle">Speakers</th><td><ul class="speakers">' + speakershtml + '</ul></td></tr></tbody></table></div></div>')
      }
    }
  })
});


/*************script for location button  to set path animation***************** */
$('#sidebarMenuInner').on('click', '.location', function (e) {
  var path = document.getElementById('one');
  var i = $(this).data('index');
  i = i - 1
  paths[i].map(p => {
    if (p.startPoint === localStorage.getItem('startPoint')) {
      path.setAttribute('points', p.pathPoint);
    }
  })
  var data = path.getAttribute('points');

})
/***************** Script when Click On Map Elements **********/
/******* Resturant location  ****** */
$("svg").on('click', '.cls-17', function (e) {
  var x;
  x = $(this).data('location')
  y = x - 1
  console.log(y)
 
  paths[y].map(p => {

    if (p.startPoint === localStorage.getItem('startPoint')) {
      path.setAttribute('points', p.pathPoint);

    }
  }) 
});
/******* WC location  ****** */
$("svg").on('click', '.cls-7,.cls-12', function (e) {
  var x;
  x = $(this).data('location')
  y = x - 1
  console.log(y)
 
  paths[y].map(p => {

    if (p.startPoint === localStorage.getItem('startPoint')) {
      path.setAttribute('points', p.pathPoint);

    }
  }) 
});

/******* Studio location  ****** */
$("svg").on('click', '.cls-14', function (e) {
  var x;
  x = $(this).data('location')
  y = x - 1
  console.log(y)
 
  paths[y].map(p => {

    if (p.startPoint === localStorage.getItem('startPoint')) {
      path.setAttribute('points', p.pathPoint);

    }
  }) 
});

/******* others location  ****** */
$("svg").on('click', '.cls-12', function (e) {
  var x;
  x = $(this).data('location')
  y = x - 1
  console.log(y)
 
  paths[y].map(p => {

    if (p.startPoint === localStorage.getItem('startPoint')) {
      path.setAttribute('points', p.pathPoint);

    }
  }) 
});


/*************** script when click on li to set path**************************** */
$('#sidebarMenuInner').on('click', 'li', function () {
  var path = document.getElementById('one');
  var i = this.getAttribute('id'),
    i = i - 1;


  paths[i].map(p => {

    if (p.startPoint === localStorage.getItem('startPoint')) {
      path.setAttribute('points', p.pathPoint);

    }
  })

})



/***script for right icons ***/
$(function () {
  $('nav #setting').on('click', function () {
    window.location.replace('index.html')
  });
});

$(function () {
  $('nav #toilet').on('click', function () {

    $(" #rest2,#rest1").attr("class", "cls-17");
    $(".cls-6").attr("class", "cls-6 ");
    $("#bathrooms polygon, rect.cls-7").attr("class", "cls-7  flash animated infinite");

  });
});
$(function () {
  $('nav #restaurant').on('click', function () {
    $("#bathrooms polygon, rect.cls-7").attr("class", "cls-7 ");
    $(".cls-6").attr("class", "cls-6 ");
    $(" #rest2,#rest1").attr("class", "cls-17 flash animated infinite");

  });
});
$(function () {
  $('nav #clinic').on('click', function () {
    $("#bathrooms polygon,.cls-7").attr("class", "cls-7 ");
    $(" #rest2,#rest1").attr("class", "cls-17");
    $(".cls-6").attr("class", "cls-6 flash animated infinite");

  });
});

/***********script to stop right icons animation ************* */
$('svg').click(function () {
  $(" #rest2,#rest1").attr("class", "cls-17");
  $("#bathrooms polygon, rect.cls-7").attr("class", "cls-7 ");
  $(".cls-6").attr("class", "cls-6 ");
})

/**************** script for toggle sidebar *************** */
$('#sidebarMenu').on('click', function () {
  $('#sidebarMenu').toggleClass('show')

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


