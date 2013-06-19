var map;
window.onload = function(){
  var myLatlng = new google.maps.LatLng(30.3, -97.7);

  var myOptions = {
    zoom: 5,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    navigationControl: true,
    mapTypeControl: false,
    scaleControl: true,
    disableDoubleClickZoom: false
  };
   map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);
   heatmap = new HeatmapOverlay(map, {"radius":10, "visible":true, "opacity":60});

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/test",

    success: function(data){ 
      mapData={
        max: 46,
        data: data
      };
    }
  });

  google.maps.event.addListenerOnce(map, "idle", function(){
    heatmap.setDataSet(mapData);
  });
   
};