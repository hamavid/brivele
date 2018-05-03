$(document).ready(function(){

// DIV SIZING
// keep slides div height < max window height for small screens, so no need to scroll to see whole pic
// setting height of div regardless of img, so the rest of the page doesn't jump around when you switch slides
	function set_show_heights() {
		var windowwidth=document.documentElement.clientWidth; // viewable width
		var windowheight=document.documentElement.clientHeight; // viewable max height	
		var maxheight=windowheight-52; // with a little leeway for caption and padding
		if (windowwidth<=535){maxheight=maxheight-57;} // to make room for menu banner
		if (maxheight<370){$('.thisphoto').css('height',maxheight+'px');}
	  }
	  $(window).bind('resize',set_show_heights); 
	  set_show_heights();


// SLIDESHOWS
  // Create a dictionary of img names for each show 
  // key is show name, which should = id of div these images will be shown in, 
  // as well as the name of the directory that has the relevant files
	var showdict = {};
	showdict['bubbes'] = ['20171216_213355', 'DSC01442', 'DSC01431',
		'DSC01434', 'DSC01470', 'DSC01477', 'DSC01588','20171216_213353',
		'DSC01466', '25440158_10213236172671598_2710990013775537959_o', 'DSC01417'];
	showdict['misc'] = ['18-05-01-houseshow', '18-01-20-houseshow', '17-11-18-paloma', '17-08-04-pocket-theater'];

  // on page load the 0th image will be shown for each show, so trigger the fxn to say this in the captions
	function start() {for (var key in showdict) {enumerate(key,0,showdict[key].length);}}
	start();

 // function to look up which pictures to show in a given slideshow, using the id of the div and the show dictionary
  	function whichpics(show) {for (var key in showdict) {if (show.includes(key)) {return showdict[key];}};};

  // function to show a given image in the slides for a given show
  	function showslideimg(show, picname){
  		$('#'+show+' figure img').remove(); //remove extra photos
  		$('#'+show+' figure').prepend($('<img/>').attr('src','../images/shows/'+show+'/'+picname+'.jpg'));
  	}
  
  // function to say which number out of total photos this photo is for a given show
  	function enumerate(show, num, total){
  		var thisnum=num+1;
  		$('#'+show+' .counter').html(' ('+thisnum+' of '+total+')');
  	}

  // function to iterate back and forward through images in slideshow
  	function iterate(show, direction) {
  		var srcList = whichpics(show);
  		var thisimg=$('#'+show+' figure img').attr('src').replace('../images/shows/'+show+'/','');
		for (var i = 0; i < srcList.length; i++) {if (srcList[i]+'.jpg' == thisimg){var thisindex=i;}};
		var nextindex=(thisindex+direction) % srcList.length;
		if (nextindex < 0) {var nextindex = srcList.length-1}
		var nextimg=srcList[nextindex];
		showslideimg(show, nextimg);
		enumerate(show, nextindex, srcList.length);
  	}

  // highlight left and right scroll arrows when hovering on diff areas of slideshow div
	$('.leftside').mouseenter(function(){$('.larr').css('opacity','1');});
	$('.leftside').mouseleave(function(){$('.larr').css('opacity','0.3');});
	$('.rightside').mouseenter(function(){$('.rarr').css('opacity','1');});
	$('.rightside').mouseleave(function(){$('.rarr').css('opacity','0.3');});

  // Scroll right or left when various elements are clicked
	$('.larr, .leftside').click(function() {iterate($(this).parent().parent().attr('id'), -1);
	});
	$('.rarr, .rightside').click(function() {iterate($(this).parent().parent().attr('id'), +1);});

  // SWIPE  <!-- This does NOT WORK as of 1/28/18 - need to debug on phone -->
    $('.thisphoto').touchwipe({
      wipeLeft: function() {iterate($(this).parent().attr('id'), +1);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
    $('.thisphoto').touchwipe({
      wipeRight: function() {iterate($(this).parent().attr('id'), -1);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });


});
