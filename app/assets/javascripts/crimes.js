var map;
var MY_MAPTYPE_ID = 'custom_style';
window.onload = function(){
	var myLatlng = new google.maps.LatLng(30.3, -97.7);
	var featureOpts = [
	    {
	      stylers: [
	        { hue: '#00FF00' },
	        { gamma: 0.5 },
	        { weight: 0.5 }
	      ]
	    },
	    {
	      featureType: 'landscape',
	      stylers: [
	        { color: '#3f3f3f' }
	      ]
	    },
	    {
	      featureType: 'water',
	      stylers: [
	        { color: '#000000' }
	      ]
	    }
	  ];
	var styledMapOptions = {
    	name: 'Custom Style'
  	};
  	var myOptions = {
	    zoom: 12,
	    center: myLatlng,
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
	var myLatlng2 = new google.maps.LatLng(30.3,-97.7);
 
	var marker = new google.maps.Marker({
		position: myLatlng2,
		map: map,
		title:"Hello World!"
	});
	

	google.maps.event.addListenerOnce(map, "idle", function(){
    	heatmap.setDataSet(mapData);
	});
	
	$("#logo_with_shadow").hide();
	$(".buttons_hidden").hide();
	$("#home_button_div").hover(function(){
    	$("#home_button_hover").toggle();
  	});
  	var cur_url = document.location;
  	if( cur_url =="http://localhost:3000/crimes" ){
  		$("#home_button_selected").show();
  		$("#home_button_div").css("color", "#FF7600");
  	};
  		
  	$("#home_button_div").click(function(){
    	alert(document.location);
  	});
	
  	$("#logo_no_shadow").hover(function(){
    	$("#logo_with_shadow").toggle();
  	});
}
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
  
   
