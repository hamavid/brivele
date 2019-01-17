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
  // key is show name, which should =  name of the directory that has the relevant files
	var showdict = {};
  showdict['shows/paloma-khanike18'] = ['three.jpg', 'one.jpg', 'two.jpg'];
  showdict['shows/theriot-montreal18'] = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg', 'five.jpg', 'six.jpg'];
  showdict['shows/paloma-release18'] = ['20180623_210640.jpg', '20180623_205751.jpg', '20180623_210655.jpg', 'janedrawing.jpg'];
  showdict['shows/cdassembly'] = ['20180604_171434.jpg', '20180604_191501.jpg', '20180604_191513.jpg', '20180604_203746.jpg', '20180604_214911.jpg', '20180604_221752.jpg'];
  showdict['shows/folklife18'] = ['BriveleFolklife18-11.jpg', 'BriveleFolklife18-4.jpg', 'BriveleFolklife18-5.jpg'];
	showdict['shows/bubbes17'] = ['25440158_10213236172671598_2710990013775537959_o.jpg', '20171216_213355.jpg', 'DSC01442.jpg', 'DSC01431.jpg',
		'DSC01434.jpg', 'DSC01470.jpg', 'DSC01477.jpg', 'DSC01588.jpg','20171216_213353.jpg',
		'DSC01466.jpg', 'DSC01417.jpg'];
	showdict['shows/misc'] = ['18-11-20-tractor.jpg', '18-05-01-houseshow.jpg', '18-01-20-houseshow.jpg', '17-11-18-paloma.jpg', '17-08-04-pocket-theater.jpg'],
  showdict['bandpix/lowfi'] = ['tea.JPG', 'sketch3.JPG', 'closeinstrumentscolor.JPG', 'brivele-debut.jpg'];

  // on page load the 0th image will be shown for each show, so trigger the fxn to say this in the captions
	function start() {for (var key in showdict) {enumerate(key,0,showdict[key].length);}}
	start();

 // function to look up which pictures to show in a given slideshow, using the id of the div and the show dictionary
  	function whichpics(show) {for (var key in showdict) {if (show.includes(key)) {return showdict[key];}};};

  // function to show a given image in the slides for a given show
  	function showslideimg(show, picname){
  		$('figure img').remove(); //remove extra photos
  		$('figure').prepend($('<img/>').attr('src','../images/'+show+'/'+picname));
      $('#getfullres').removeClass('promo');
      if (show == 'bandpix/lowfi') {
        $('#getfullres').addClass('promo');
        getfullres();
      }
  	}

  // function to say which number out of total photos this photo is for a given show
  	function enumerate(show, num, total){
  		var thisnum=num+1;
      var thumbimg = $('.sights img').each(function(){
        if ($(this).attr('src').includes(show)){
          var bigcaption = $(this).parent().find('.caption').html()
          var caption = bigcaption.slice(0, bigcaption.indexOf('<span'));
          $('.theidoftheshow').html(caption + ' (' + thisnum + ' of ' + total + ')');
        }
      });
  	}

  // function to iterate back and forward through images in slideshow
  	function iterate(show, direction) {
  		var srcList = whichpics(show);
      if (direction==0){var thisimg = srcList[0];}
  		else{var thisimg=$('figure img').attr('src').replace('../images/'+show+'/','');}
		  for (var i = 0; i < srcList.length; i++) {if (srcList[i] == thisimg){var thisindex=i;}};
		  var nextindex=(thisindex+direction) % srcList.length;
		  if (nextindex < 0) {var nextindex = srcList.length-1}
		  var nextimg=srcList[nextindex];
		  showslideimg(show, nextimg);
		  enumerate(show, nextindex, srcList.length);
  	}

 // close photo overlay and remove images if background or close button is clicked  
  $('#photo-overlay,.thisphoto,.xit').click(function() {
    if(event.target != this) return;
    else {$('#photo-overlay').css('display','none');}
  });

  // open photo overlay showing current img if image is clicked from the list
  $('.sights img').click(function() {
    $('#photo-overlay').fadeToggle();
    var imgsrc= $(this).attr('src');
    var whichshow = imgsrc.slice(imgsrc.indexOf('images/')+7,imgsrc.indexOf('/thumb'));
    iterate(whichshow,0);
  });


  // highlight left and right scroll arrows when hovering on diff areas of slideshow div
	$('#leftside').mouseenter(function(){$(this).parent().find('.larr').css('opacity','1');});
	$('#leftside').mouseleave(function(){$(this).parent().find('.larr').css('opacity','0.6');});
	$('#rightside').mouseenter(function(){$(this).parent().find('.rarr').css('opacity','1');});
	$('#rightside').mouseleave(function(){$(this).parent().find('.rarr').css('opacity','0.6');});

  // Scroll right or left when various elements are clicked
	$('.larr, #leftside').click(function() {
    var src=$(this).parent().find('img').attr('src');
    var tail=src.slice(src.indexOf('images/')+7);
    var show=tail.substring(0, tail.lastIndexOf('/'));
    iterate(show, -1);
	});
	$('.rarr, #rightside').click(function() {
    var src=$(this).parent().find('img').attr('src');
    var tail=src.slice(src.indexOf('images/')+7);
    var show=tail.substring(0, tail.lastIndexOf('/'));
    iterate(show, +1);
  });

  // open full-res image in a new tab when '#getfullres' element is clicked (for promo photo album ONLY)
  function getfullres() {
      var nowshowing = $('figure img').attr('src').replace('lowfi','hifi');
      var link = $('#getfullres>span>a');
      console.log(link);
      link.attr('href',nowshowing);
  }

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
