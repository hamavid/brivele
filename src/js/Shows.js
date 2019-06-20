$(document).ready(function(){

// toggle shows divs by year on click
	$('#s2018 h2, #s2017 h2').click(function(){
		$(this).siblings().slideToggle();
		$(this).find('.fa').toggleClass('fa-caret-right').toggleClass('fa-caret-down');
	})

});