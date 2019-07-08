$(document).ready(function(){

// open small nav menu on navbar click and show overlay, close when overlay is clicked or navbars are clicked again
	$('.navbar-bars, .overlay').bind('click', togglemenu);
	function togglemenu() {
		$('.smallnavlinks').slideToggle();$('#overlaybkgrnd').fadeToggle();
	};
	

// swipe up to close menu
 	/*$('.smallnavlinks, .overlay').touchwipe({
      wipeUp: function() {togglemenu()},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
*/

// show signup form help when help span is clicked
 $('#showhelpsignup').click(function(){$('#helpsignup').slideToggle()});



});
