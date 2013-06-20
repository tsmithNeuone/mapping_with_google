var map;
window.onload = function(){
	var myLatlng = new google.maps.LatLng(30.3, -97.7);

	var myOptions = {
	    zoom: 12,
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
	heatmap = new HeatmapOverlay(map, {
		"radius":25,
		"visible":true,
		"opacity":60,
		"gradient": { 0.35: "rgb(0,0,255)", 0.45: "rgb(255,255,50)", 0.55: "rgb(255,150,50)", 0.75: "rgb(255,0,0)", 0.85: "rgb(175,0,0)", 1.0: "rgb(120,0,0)"}
	});

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
				for(var i = 0; i < data.length; i++){
					var tempLatLng =new google.maps.LatLng(data[i].latitude, data[i].longitude);
					var marker = new google.maps.Marker({
						position: tempLatLng,
						map: map,
						title:data[i].name
					});
				}
         		
     		}, 
        }); 
	})();
	city_json;
	var myLatlng2 = new google.maps.LatLng(30.3,-97.7);
 
	var marker = new google.maps.Marker({
		position: myLatlng2,
		map: map,
		title:"Hello World!"
	});


	google.maps.event.addListenerOnce(map, "idle", function(){
    	heatmap.setDataSet(mapData);
	});
}
  	
    
  
  
   
