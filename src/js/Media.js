$(document).ready(function(){

// DIV SIZING
// keep slides div height < max window height for small screens, so no need to scroll to see whole pic
// setting height of div regardless of img, so the rest of the page doesn't jump around when you switch slides
	function set_show_heights() {
		var windowwidth=document.documentElement.clientWidth; // viewable width
		var windowheight=document.documentElement.clientHeight; // viewable max height	
		var maxheight=windowheight-52; // with a little leeway for caption and padding
		if (windowwidth<=535){maxheight=maxheight-57;} // to make room for menu banner
		if (maxheight<370){
      $('.thisphoto, #videoelement').css('height',maxheight+'px');
      $('#videoelement').css('width',maxheight+'px');
    }
	}
	$(window).bind('resize',set_show_heights); 
	set_show_heights();


// SLIDESHOWS
  // Create a dictionary of img names for each show 
  // key is show name, which should =  name of the directory that has the relevant files
	var showdict = {};
  showdict['shows/shtetl-to-streets-20'] = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg', 'five.jpg', 'six.jpg', 'seven.jpg', 'eight.jpg', 'nine.jpg', 'ten.jpg', 'eleven.jpg'];
  showdict['shows/kugel-cafe19'] = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg', 'five.jpg'];
  //showdict['shows/paloma-khanike18'] = ['three.jpg', 'one.jpg', 'two.jpg'];
  showdict['shows/theriot-montreal18'] = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg', 'five.jpg', 'six.jpg', 'seven.jpg'];
  showdict['shows/paloma-release18'] = ['20180623_210640.jpg', '20180623_205751.jpg', '20180623_210655.jpg', 'janedrawing.jpg'];
  showdict['shows/cdassembly'] = ['20180604_171434.jpg', '20180604_191501.jpg', '20180604_191513.jpg', '20180604_203746.jpg', '20180604_214911.jpg', '20180604_221752.jpg'];
  showdict['shows/folklife18'] = ['BriveleFolklife18-11.jpg', 'BriveleFolklife18-4.jpg', 'BriveleFolklife18-5.jpg'];
	showdict['shows/bubbes17'] = ['25440158_10213236172671598_2710990013775537959_o.jpg', '20171216_213355.jpg', 'DSC01442.jpg', 'DSC01431.jpg',
		'DSC01434.jpg', 'DSC01470.jpg', 'DSC01477.jpg', 'DSC01588.jpg','20171216_213353.jpg',
		'DSC01466.jpg', 'DSC01417.jpg'];
	showdict['shows/misc'] = ['18-11-20-tractor.jpg', '20-01-19.jpg', '18-12-07-paloma.jpg', '18-10-14.jpg', '18-05-01-houseshow.jpg', '18-01-20-houseshow.jpg', '17-11-18-paloma.jpg', '17-10-23.jpg', '17-08-04-pocket-theater.jpg'],
  showdict['bandpix/lowfi'] = ['tea.JPG', 'sketch3.JPG', 'closeinstrumentscolor.JPG', 'brivele-debut.jpg'];

// create a meta dictionary of all the shows and their order
  var metashowdict = {};
  var initial = -1;
  for (var key in showdict){
    initial++;
    metashowdict[initial] = key;
  };

// create a dictionary of attributions for each item in social media albums
  var miscphoto = {};
  miscphoto['18-12-07-paloma.jpg'] = ['Cafe Paloma, Dec 2018.'];
  miscphoto['18-11-20-tractor.jpg'] = ['The Tractor, Nov 2018. Photo by Mai Li Pittard.'];
  miscphoto['20-01-19.jpg'] = ['The Old Church, Portland, Jan 2020. Photo by Sooze.'];
  miscphoto['18-05-01-houseshow.jpg'] = ['May Day house show 2018. Photo by BPS.'];
  miscphoto['18-01-20-houseshow.jpg'] = ['House show at 5507 Farm, Jan 2018. Photo by Alex.'];
  miscphoto['17-11-18-paloma.jpg'] = ['Cafe Paloma, Nov 2017. Photo by Todo Es.'];
  miscphoto['17-10-23.jpg'] = ['Brief at the Royal Room, Oct 2017. Photo by <a href ="https://www.instagram.com/thesarahshay/">@thesarahshay</a>.'];
  miscphoto['17-08-04-pocket-theater.jpg'] = ['The Pocket Theater, Aug 2017. Photo by Leah Knopf.'];
  miscphoto['18-10-14.jpg'] = ['The Murder Mine, Oct 2018. Photo by <a href ="https://www.instagram.com/rascalmiles/">@rascalmiles</a>.'];
  

// video dictionaries
  var viddict = {}
  viddict['misc'] = ['19-02-23.mp4', '18-01-20-1.mp4', '18-01-20-2.mp4'];

  var miscvideo = {}
  miscvideo['18-01-20-1.mp4'] = ['House show at 5507 Farm, Jan 2018. Video by <a href ="https://www.instagram.com/thesarahshay/">@thesarahshay</a>.'];
  miscvideo['18-01-20-2.mp4'] = ['More house show at 5507 Farm, Jan 2018. Video by <a href ="https://www.instagram.com/thesarahshay/">@thesarahshay</a>.'];
  miscvideo['19-02-23.mp4'] = ['Carlton House, Feb 2019. Video by Emily <a href ="https://www.instagram.com/stringandshadow/">@stringandshadow</a>.'];
  miscvideo['bham-altlib-1.mp4'] = ['Bellingham Alternative Library, Mar 2019. Video by <a href ="https://www.instagram.com/bhamaltlib/">@bhamaltlib</a>.'];


  // on page load the 0th image will be shown for each show, so trigger the fxn to say this in the captions
	function start() {for (var key in showdict) {enumerate(key,0,showdict[key].length);}}
	start();

 // function to look up which pictures to show in a given slideshow, using the id of the div and the show dictionary
  	function whichpics(show) {for (var key in showdict) {if (show.includes(key)) {return showdict[key];}};};
    
  // function to show a given image in the slides for a given show
  	function showslideimg(show, picname){
      //remove extra photos
  		$('figure img').remove();
      $('figure').prepend($('<img/>').attr('src','../images/'+show+'/'+picname));
      // for promo album only
      $('#getfullres').removeClass('promo');
      if (show == 'bandpix/lowfi') {
        $('#getfullres').addClass('promo');
        getfullres(picname);
      }
  	}

  // function to say which number out of total photos this photo is for a given show
  	function enumerate(show, num, total){
  		var thisnum=num+1;
      var thumbimg = $('.sights img').each(function(){
        if ($(this).attr('src').includes(show)){
          var bigcaption = $(this).parent().find('.caption').html()
          var caption = bigcaption.slice(0, bigcaption.indexOf('<span'));
          //$('.theidoftheshow').html(caption + ' (' + thisnum + ' of ' + total + ')');
          $('.theidoftheshow').html(caption);
        }
      });
  	}

  // function to find the order number of a given show
    function findshowindex(show){
      var foundit;var i = -1;
      for (var key in metashowdict){i++;if (metashowdict[key] == show){var foundit = i;}}
      return foundit;
    }

  // function to iterate back and forward through images in slideshow
  	function iterate(show, direction) {
    // get info on which show this is and what the next show will be
      var showindex = findshowindex(show);
      var nextshow=(showindex+direction) % (initial+1);
      if (nextshow < 0){var nextshow = initial;}
    // get info on which image to display
  		var srcList = whichpics(show);
      if (direction==0){var thisimg = srcList[0];}
  		else{var thisimg=$('#photo-overlay').find('img').attr('src').replace('../images/'+show+'/','');}
		  for (var i = 0; i < srcList.length; i++) {if (srcList[i] == thisimg){var thisindex=i;}};
		  var nextindex=(thisindex+direction);
    // reset to appropriate image in adjacent show if we've run out of images for this show
		  if (nextindex < 0) {var show = metashowdict[nextshow]; var srcList = whichpics(show);var nextindex = srcList.length-1;};
      if (nextindex > srcList.length-1){var show = metashowdict[nextshow]; var srcList = whichpics(show);var nextindex = 0;};
		  var nextimg=srcList[nextindex];
    // show the image!
		  showslideimg(show, nextimg);
		  enumerate(show, nextindex, srcList.length);
      if (show == 'shows/misc'){$('.attribution').html(miscphoto[nextimg]);$('.attribution-container').css('display','block');}
      else{$('.attribution').html('');$('.attribution-container').css('display','none');}
  	}


  // remove video when we have moved on
   function removevideo() {
    var videoElement = document.getElementById('videoelement');
    videoElement.pause();
    videoElement.removeAttribute('source'); // empty source
    videoElement.load();
   }

  // video iteration etc functions
    function videoscroll(video, direction) {
      // get info
      for (var i = 0; i < viddict['misc'].length; i++) {if (viddict['misc'][i] == video){var thisindex=i;}};
      var nextindex = (thisindex+direction) % viddict['misc'].length;
      if (nextindex < 0) {var nextindex = viddict['misc'].length-1;}
      var nextvideo = viddict['misc'][nextindex];
      // clear the way
      removevideo();
      $('.vidattrib').html('');
      // repopulate elements
      $('#videoelement').prepend($('<source/>').attr('src','../images/video/'+nextvideo));
      $('.vidattrib').html(miscvideo[nextvideo]);
    }  
    videoscroll(viddict['misc'][0], 0);

 // close photo overlay and remove images if background or close button is clicked  
  $('#photo-overlay,.thisphoto,.xit').click(function(event) {
    if(event.target != this) return;
    else {$('#photo-overlay').css('display','none');removevideo();}
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
// TO DO: make this slicker/less repetitive
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
  $('.vidlarr').click(function() {
    var src=$(this).parent().find('source').attr('src');
    var tail=src.slice(src.indexOf('video/')+6);
    videoscroll(tail, -1);
  });
  $('.vidrarr').click(function() {
    var src=$(this).parent().find('source').attr('src');
    var tail=src.slice(src.indexOf('video/')+6);
    videoscroll(tail, +1);
  });


  // open full-res image in a new tab when '#getfullres' element is clicked (for promo photo album ONLY)
  function getfullres(picname) {
      var nowshowing = $('figure img').attr('src').replace('lowfi','hifi');
      var link = $('#getfullres>span>a');
      link.attr('download', 'brivele-'+picname);
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
