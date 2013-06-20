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
	    mapTypeControl: true,
	    scaleControl: true,
	    disableDoubleClickZoom: false
	};
	map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);
	heatmap = new HeatmapOverlay(map, {"radius":10, "visible":true, "opacity":60});

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/crimes.json",
		success: function(data){ 
			mapData={
				max: 46,
				data: data
			};
		}
	});
	var city_json = (function () { 
		$.ajax({ 
			type: "GET",
			url: "/cities.json",
			dataType: "json", 
			success: function(data){
         		alert(data[0])
         		
     		}, 
        }); 
	})();
	alert(city_json)


	google.maps.event.addListenerOnce(map, "idle", function(){
    	heatmap.setDataSet(mapData);
	});
}
  	
    
  
  
   
