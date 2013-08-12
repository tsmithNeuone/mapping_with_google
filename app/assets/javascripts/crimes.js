var map, heatmap,crime_array_mvc;
var MY_MAPTYPE_ID = 'custom_style';
var geocoder;
var crime_array =[];
var crime_markers = {};

$(document).ready(function(){
	
	$(".crime_partial").click(function(){
		goToPosition($(this).find('.hidden_info #lat').text(),$(this).find('.hidden_info #lng').text());
	});
	
	$(".pagination_controller").jPages({
		containerID  : "all_crime_partials",
		animation	 : "fadeInRight",
		minHeight	 : false,
		delay		 : 100,
        perPage      : 8,
        startPage    : 1,
        startRange   : 1,
        midRange     : 5,
        endRange     : 1
	});
});



function initialize(){
	
	var myLatLng = new google.maps.LatLng(30.3, -97.7);
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
	      featureType: 'poi.park',
	      stylers: [
	        { color: '#466FD5' },
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
	    center: myLatLng,
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
  	getLocation();
	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
	
	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
	
	var crimes_json = (function () { 
		//var str_url = "107.21.114.223/nearby/?long=" + map.getCenter().lng() + "&lat=" + map.getCenter().lat() + "&limit=100"
		var str_url = "http://107.21.114.223/nearby/?long=-97.69999999999999&lat=30.3&limit=100"
		prompt("test", str_url);
		$.ajax({
			type: "GET",
			url: str_url,
			crossDomain: true,
			dataType: "jsonp",
			success: function(data){ 
				console.log("worked");
				var crimes = data.crimes;
				for(var i = 0; i < crimes.length; i++){
					alert(data);
					var tempLatLng =new google.maps.LatLng(crimes[i].latitude, crimes[i].longitude);
					crime_array.push(tempLatLng);
					var temp_name = crimes[i].name;
					var marker = new google.maps.Marker({
						icon: '/assets/pirate_skulls_and_bones.png',
						position: tempLatLng,
						map: map,
						id: 'marker_' + getMarkerUniqueId(crimes[i].latitude, crimes[i].longitude),
						name: temp_name
					});
					crime_markers[getMarkerUniqueId(crimes[i].latitude, crimes[i].longitude)] = marker;
				}
			},
			error: function( req, status, err ) {
    			console.log( 'something went wrong', status, err );
	 		}
			
		});
	})();
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
 	var restaurant_json = (function () { 
		$.ajax({ 
			type: "GET",
			url: "http://data.austintexas.gov/resource/ecmv-9xxi.json",
			dataType: "json", 
			success: function(data){
				for(var i = 0; i < data.length; i++){
					var tempLatLng =new google.maps.LatLng(data[i].address.latitude, data[i].address.longitude);
					var marker = new google.maps.Marker({
						position: tempLatLng,
						map: map,
						title:data[i].restaurant_name
					});
				}
         		
     		}, 
        }); 
	})();
	
 	var crime_array_mvc = new google.maps.MVCArray(crime_array);
	console.log(crime_array_mvc);
  	heatmap = new google.maps.visualization.HeatmapLayer({
    	data: crime_array_mvc,
    	radius: 20,
    	gradient: [
				    'rgba(0, 255, 255, 0)',
				    'rgba(0, 255, 255, 1)',
				    'rgba(0, 191, 255, 1)',
				    'rgba(0, 127, 255, 1)',
				    'rgba(0, 63, 255, 1)',
				    'rgba(0, 0, 255, 1)',
				    'rgba(0, 0, 223, 1)',
				    'rgba(0, 0, 191, 1)',
				    'rgba(0, 0, 159, 1)',
				    'rgba(0, 0, 127, 1)',
				    'rgba(63, 0, 91, 1)',
				    'rgba(127, 0, 63, 1)',
				    'rgba(191, 0, 31, 1)',
				    'rgba(255, 0, 0, 1)'
				  ]
  	});
	heatmap.setMap(map);
};

var getMarkerUniqueId = function(lat, lng) {
		return lat + '_' + lng;
};


$("#home_button_div").click(function(){
	getLocation();
	//TODO: add code here to hide other buttons and make this button orange
	$(this).parent().find(".button_selected").show();
	$(this).css("color", "#FF7600");
	$("#search_bar").show()
	$("#crimes_button_div").css("color", "#FFFFFF");
	$("#about_button_div").css("color", "#FFFFFF");
	$("#about_buttons").find(".button_selected").hide();
	$("#crimes_buttons").find(".button_selected").hide();
	$("#crime_detail_box").fadeOut('fast',function(){
		$("#filter_options").fadeIn('slow');
	});
	$("#about_us").fadeOut('fast', function(){
		$("#filter_options").fadeIn('slow');
	});
});

$("#crimes_button_div").click(function(){
	$(this).parent().find(".button_selected").show();
	$(this).css("color", "#FF7600");
	$("#about_button_div").css("color", "#FFFFFF");
	$("#home_button_div").css("color", "#FFFFFF");
	$("#about_buttons").find(".button_selected").hide();
	$("#home_buttons").find(".button_selected").hide();
	$("#filter_options").fadeOut('fast',function(){
		$("#crime_detail_box").fadeIn('slow');
	});
	$("#about_us").fadeOut('fast',function(){
		$("#crime_detail_box").fadeIn('slow');
	});
	
});

$("#about_button_div").click(function(){
	$(this).parent().find(".button_selected").show();
	$(this).css("color", "#FF7600");
	$("#crimes_button_div").css("color", "#FFFFFF");
	$("#home_button_div").css("color", "#FFFFFF");
	$("#crimes_buttons").find(".button_selected").hide();
	$("#home_buttons").find(".button_selected").hide();
	$("#filter_options").fadeOut('fast',function(){
		$("#about_us").fadeIn('slow');
	});
	$("#crime_detail_box").fadeOut('fast',function(){
		$("#about_us").fadeIn('slow');
	});
});

$("#search_form").submit(function(){
	alert("test");
	var address = $("#search_field_form").val();
	var search_lat_lng = geocoder.geocode({'address': address}, function(results, status){
		 if (status == google.maps.GeocoderStatus.OK) {
      		map.panTo(results[0].geometry.location);
      		map.setZoom(14);
      		var search_marker = new google.maps.Marker({
				position: results[0].geometry.location,
				map: map,
				title:'Searched Position'
			});
    	} else {
      		alert('Geocode was not successful for the following reason: ' + status);
    	};
	});
});

function getLocation(){ 
  	if (navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(showPosition,err);
    } else {
		alert("Geolocation is not supported by this browser.");
	};
};

function err(){
	alert("Geolocation failed. Make sure your browser supports geolocation!");
};

function showPosition(position){
  	var tempvar = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var tempmarker = new google.maps.Marker({
		position: tempvar,
		map: map,
		title:'Current Position'
	});
	map.panTo(tempvar);
	map.setZoom(14);
};

function goToPosition(myLat,myLng){
	var templocation = new google.maps.LatLng(myLat, myLng);
	map.panTo(templocation);
	var markerId = getMarkerUniqueId(myLat, myLng);
	var marker = crime_markers[markerId];
	marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 1500);
	map.setZoom(14);
};


