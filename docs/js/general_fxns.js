// open small nav menu on navbar click and show overlay, close when overlay is clicked or navbars are clicked again
	function togglemenu() {
		$('.smallnavlinks').slideToggle();$('#overlaybkgrnd').fadeToggle();
	};
	//$('.navbar-bars, .overlay').click(togglemenu());

// swipe up to close menu
 	/*$('.smallnavlinks, .overlay').touchwipe({
      wipeUp: function() {togglemenu()},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
*/