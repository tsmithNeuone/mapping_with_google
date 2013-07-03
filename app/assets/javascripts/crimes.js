var map;
var MY_MAPTYPE_ID = 'custom_style';
var geocoder;
var curLocation;

window.onload = function(){
	var myLatLng = new google.maps.LatLng(30.3, -97.7);
	function getLocation(curLocation){ 
	  	if (navigator.geolocation){
	    	navigator.geolocation.getCurrentPosition(showPosition, curLocation);
	    }
  		else{alert("Geolocation is not supported by this browser.");};
  	};
  	function showPosition(position, curLocation){
  		curLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  		return curLocation;
  	};
  	getLocation(curLocation);
  	alert(curLocation);
	geocoder = new google.maps.Geocoder();
	
	
	var featureOpts = [
	    {
	      stylers: [
	        { hue: '#123EAB' },
	        { gamma: 0.5 },
	        { weight: 0.5 }
	      ]
	    },
	    {
	      featureType: 'landscape',
	      stylers: [
	        { color: '#3e3e3e' }
	      ]
	    },
	    {
	      featureType: 'water',
	      stylers: [
	        { color: '#2f2f2f' }
	      ]
	    },
	    {
	      elementType: 'labels.text',
	      stylers: [
	        { color: '#FF7600' }
	      ]
	    }
	  ];
	var styledMapOptions = {
    	name: 'Custom Style'
  	};
  	var myOptions = {
	    zoom: 12,
	    center: curLocation,
	    mapTypeControlOptions: {
      		mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    	},
	    mapTypeId: MY_MAPTYPE_ID,
	    disableDefaultUI: false,
	    scrollwheel: true,
	    draggable: true,
	    navigationControl: true,
	    mapTypeControl: true,
	    scaleControl: true,
	    disableDoubleClickZoom: false,
	    backgroundColor: "#3f3f3f"
	};
  	map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);
	
	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
	
	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
	
	heatmap = new HeatmapOverlay(map, {
		"radius":20,
		"visible":true,
		"opacity":30,
		"gradient": { 0.35: "#008110", 0.45: "#00C618", 0.55: "#A2EF00",0.65: "#E2FA00", 0.75: "#FFCB00", 0.85: "CC0000", 0.95: "990000", 1.0: "#660000"}
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
	var myLatlng2 = new google.maps.LatLng(30.3,-97.7);
 
	var marker = new google.maps.Marker({
		position: myLatlng2,
		map: map,
		title:"Hello World!"
	});
	

	google.maps.event.addListenerOnce(map, "idle", function(){
    	heatmap.setDataSet(mapData);
	});
	
	
  	
  	
  	var cur_url = document.location;
  	if( cur_url =="http://localhost:3000/crimes" ){
  		$("#home_button_selected").show();
  		$("#home_button_div").css("color", "#FF7600");
  	};
  		
  	$("#home_button_div").click(function(){
    	alert(map.getCenter());
  	});
	
  	$("#logo_no_shadow").hover(function(){
    	$("#logo_with_shadow").toggle();
  	});
};

$("#search_form").submit(function(){
	var address = $("#search_field_form").val();
	var search_lat_lng = geocoder.geocode({'address': address}, function(results, status){
		 if (status == google.maps.GeocoderStatus.OK) {
      		map.panTo(results[0].geometry.location);
      		map.setZoom(14);
    	} else {
      		alert('Geocode was not successful for the following reason: ' + status);
    	};
	});
});
/*  	
$(document).ready(function(){
	var col_counter = 0;
	var row_counter = 0;
	$("#logo_with_shadow").hide();
	
  	$("#logo_no_shadow").hover(function(){
    	$("#logo_with_shadow").toggle();
  	});
  	$("#logo_div").click(function(){
  		if(col_counter % 9 === 0){
  			row_counter+=1;
  			var row_break = "<div id=\"break_line\">"
  			$(".box").append(row_break);
		};

		var small_box = "<div class=\"row\" id=\"row_" + row_counter + "\">"+ (col_counter%9 + 1) + "</div>";
		$(".box").append(small_box);
		
    	col_counter+=1;
  	});
});
$(window).resize(function() {
});

  */
  
   
