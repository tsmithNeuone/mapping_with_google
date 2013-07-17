// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require application
var cur_url = document.location;
$(document).ready(function(){
	
	
	$("#logo_with_shadow").hide();
	$(".buttons_hidden").hide();
	
	$("#home_button_div").hover(function(){
    	$("#home_button_hover").toggle();
  	});
  	
  	$("#crimes_button_div").hover(function(){
    	$("#crime_button_hover").toggle();
  	});
  	
  	$("#logo_no_shadow").hover(function(){
    	$("#logo_with_shadow").toggle();
  	});
	
  	
  	$("#about_button_div").hover(function(){
    	$("#about_button_hover").toggle();
  	});
  	if( cur_url =="http://localhost:3000/crimes" ){
  		initialize();
  		$("#home_button_selected").show();
  		$("#home_button_div").css("color", "#FF7600");
  		$("#search_submit_button").show();
  		$("#search_form").show();
  		$("#search_bar").show();
  	} else {
  		$("#search_submit_button").hide();
  		$("#search_form").hide();
  		$("#search_bar").hide();
  	}
  	
});