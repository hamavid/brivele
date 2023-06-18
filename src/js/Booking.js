$(document).ready(function(){

// DIV SIZING
// keep slides div height < max window height for small screens, so no need to scroll to see whole pic
// setting height of div regardless of img, so the rest of the page doesn't jump around when you switch slides
	/*function set_show_heights() {
		var windowwidth=document.documentElement.clientWidth; // viewable width
		var windowheight=document.documentElement.clientHeight; // viewable max height	
		var maxheight=windowheight-52; // with a little leeway for caption and padding
		if (windowwidth<=535){maxheight=maxheight-57;} // to make room for menu banner
		if (maxheight<370){
	      $('#photoelement').css('height',maxheight+'px');
	      $('#photoelement').css('width',maxheight+'px');
	    }
	}*/
	//$(window).bind('resize',set_show_heights); 
	//set_show_heights();

// SLIDESHOWS
  // Create a dictionary of img file names
	var photodict = {};
  	photodict['misc'] = ['tea.JPG', 'sketch3.JPG', 'closeinstrumentscolor.JPG', 'brivele-debut.jpg', 'brief-horiz.jpg', 'brief-tallgrass.jpg','brief-field.jpg','brief-corner.jpg'];

  	// photo iteration functions
    function photoscroll(photo, direction) {
      // get info
      for (var i = 0; i < photodict['misc'].length; i++) {if (photodict['misc'][i] == photo){var thisindex=i;}};
      var nextindex = (thisindex+direction) % photodict['misc'].length;
      if (nextindex < 0) {var nextindex = photodict['misc'].length-1;}
      var nextphoto = photodict['misc'][nextindex];
      //remove extra photos
  	  $('#photoelement>img').remove();
      // repopulate elements
      //$('#photoelement').attr('src').replace('../images/bandpix/lowfi'+photo,'../images/bandpix/lowfi/'+nextphoto);
      $('#photoelement').prepend($('<img/>').attr('src','../images/bandpix/lowfi/'+nextphoto));
      //$('#photoelement').prepend($('<source/>').attr('src','../images/bandpix/lowfi/'+nextphoto));
      getfullres(nextphoto);
      //$('.vidattrib').html(miscvideo[nextphoto]);
    }  
    photoscroll(photodict['misc'][0], 0);

  $('.larr').click(function() {
    var src=$(this).parent().find('img').attr('src');
    var tail=src.slice(src.indexOf('lowfi/')+6);
    console.log(tail);
    photoscroll(tail, -1);
  });
  $('.rarr').click(function() {
    var src=$(this).parent().find('img').attr('src');
    var tail=src.slice(src.indexOf('lowfi/')+6);
    photoscroll(tail, +1);
  });

 // open full-res image in a new tab when '#getfullres' element is clicked (for promo photo album ONLY)
  function getfullres(picname) {
      var nowshowing = $('#photoelement>img').attr('src').replace('lowfi','hifi');
      var link = $('#getfullres>span>a');
      link.attr('download', 'brivele-'+picname);
      link.attr('href',nowshowing);
  }



});