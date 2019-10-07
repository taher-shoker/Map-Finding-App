


/**********  script for control map  *************** */
  

var eventsHandler;

eventsHandler = {
  haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
, init: function(options) {
    var instance = options.instance
      , initialScale = 1
      , pannedX = 0
      , pannedY = 0

    // Init Hammer
    // Listen only for pointer and touch events
    this.hammer = Hammer(options.svgElement, {
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
    })

    // Enable pinch
    this.hammer.get('pinch').set({enable: true})

    // Handle double tap
    this.hammer.on('doubletap', function(ev){
      instance.zoomIn()
    })

    // Handle pan
    this.hammer.on('panstart panmove', function(ev){
      // On pan start reset panned variables
      if (ev.type === 'panstart') {
        pannedX = 0
        pannedY = 0
      }

      // Pan only the difference
      instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
      pannedX = ev.deltaX
      pannedY = ev.deltaY
    })

    // Handle pinch
    this.hammer.on('pinchstart pinchmove', function(ev){
      // On pinch start remember initial zoom
      if (ev.type === 'pinchstart') {
        initialScale = instance.getZoom()
        instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
      }

      instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
    })

    // Prevent moving the page on some devices when panning over SVG
    options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
  }

, destroy: function(){
    this.hammer.destroy()
  }
}


/******************** */
var selected = false;
var svg = document.getElementById('map');

var zoomOnElement = function(e) {
    if (e.target === selected) {
	// Deselect element
	svg.setAttribute("viewBox", "0 0 600 400");
	selected = false;
    } else {
	// Select element
	selected = e.target;
	var viewBox = selected.getAttribute('x');
	viewBox += " " + selected.getAttribute('y')
	viewBox += " " + selected.getAttribute('width')
	viewBox += " " + selected.getAttribute('height')
	svg.setAttribute("viewBox", viewBox);
    }
}









 var panZoom =  svgPanZoom('#map', {
    viewportSelector: '.svg-pan-zoom_viewport'
 ,panEnabled: true
, controlIconsEnabled: false
, zoomEnabled: true
, dblClickZoomEnabled: true
, mouseWheelZoomEnabled: true
, preventMouseEventsDefault: true
, zoomScaleSensitivity: 0.2
, minZoom: 0.5
, maxZoom: 10
, fit: true
, customEventsHandler: eventsHandler
, contain: true
, center: true
,rotate:true
, refreshRate: 'auto'
  });




document.getElementById('zoom-in').addEventListener('click', function(ev){
  ev.preventDefault()

  panZoom.zoomIn()
});

document.getElementById('zoom-out').addEventListener('click', function(ev){
  ev.preventDefault()

  panZoom.zoomOut()
});

document.getElementById('reset').addEventListener('click', function(ev){
  ev.preventDefault()

  panZoom.resetZoom()
});



 
