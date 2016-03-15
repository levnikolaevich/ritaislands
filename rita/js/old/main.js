jQuery(function($){

var ANUBIS = window.ANUBIS || {};

ANUBIS.subMenu = function(){
	$('#menu-nav').supersubs({
		minWidth: 12,
		maxWidth: 27,
		extraWidth: 0 
	}).superfish({
		delay: 0,
		animation: {opacity:'show'},
		speed: 'fast',
		autoArrows: false,
		dropShadows: false
	});	
}

var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

ANUBIS.mobileNav = function(){
	var windowWidth = $(window).width();
	
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('header');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile').wrap('<div class="container"><div class="row"><div class="span12" />');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

ANUBIS.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		$('#navigation-mobile').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
}

ANUBIS.slider = function(){
	var tpj=jQuery;
	tpj.noConflict();

	tpj(document).ready(function() {

	if (tpj.fn.cssOriginal!=undefined)
		tpj.fn.css = tpj.fn.cssOriginal;

		
		tpj('.fullwidthbanner').revolution(
			{
				delay:4000,
				startwidth:1200,
				startheight:700,

				

				thumbWidth:100,						
				thumbHeight:50,
				thumbAmount:3,

				hideThumbs:0,
				navigationType: "none",				
				navigationArrows:"solo",			

				navigationStyle:"round",			


				navigationHAlign:"center",			
				navigationVAlign:"bottom",				
				navigationHOffset:0,
				navigationVOffset:20,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:20,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:20,
				soloArrowRightVOffset:0,

				touchenabled:"on",						



				stopAtSlide:-1,							
				stopAfterLoops:-1,						

				hideCaptionAtLimit:0,					
				hideAllCaptionAtLilmit:0,				
				hideSliderAtLimit:0,					


				fullWidth:"on",

				shadow:0								

			});
			
			tpj('.sliderbanner').revolution(
			{
				delay:9000,
				startwidth:1170,
				startheight:600,

				onHoverStop:"on",						

				thumbWidth:100,							
				thumbHeight:50,
				thumbAmount:3,

				hideThumbs:0,
				navigationType:"bullet",				
				navigationArrows:"solo",				

				navigationStyle:"round",				


				navigationHAlign:"center",				
				navigationVAlign:"bottom",				
				navigationHOffset:0,
				navigationVOffset:20,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:20,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:20,
				soloArrowRightVOffset:0,

				touchenabled:"on",						



				stopAtSlide:-1,							
				stopAfterLoops:-1,						

				hideCaptionAtLimit:0,					
				hideAllCaptionAtLilmit:0,				
				hideSliderAtLimit:0,					


				fullWidth:"on",

				shadow:0								

			});
	});
}

ANUBIS.utils = function(){
	
	$('.work-item-thumbs, .box, .post-thumb, .single-people, .item-project, .lightbox').bind('touchstart', function(){
		$(".tapped").removeClass("tapped");
      	$(this).addClass('tapped');
    });
	
}

ANUBIS.people = function (){
	if($('#team-people').length > 0){		
		var $container = $('#team-people');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  animationEngine: 'best-available',
			  itemSelector : '.single-people',
			  layoutMode : 'fitRows'
			});
		});
	
		

		var $optionSets = $('#team-filter .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  
			  changeLayoutMode( $this, options )
			} else {
			  
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}

ANUBIS.portfolio = function (){
	if($('#portfolio-projects').length > 0){		
		var $container = $('#portfolio-projects');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  
			  animationEngine: 'best-available',
			  itemSelector : '.item-project',
			  layoutMode : 'fitRows'
			});
		});
	
		
		
		var $optionSets = $('#portfolio-filter .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			
			  changeLayoutMode( $this, options )
			} else {
			
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}



ANUBIS.dropDown = function(){
	$('.dropmenu').on('click', function(e){
		$(this).toggleClass('open');
		
		$('.dropmenu-active').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
	
	$('.dropmenu-active a').on('click', function(e){
		var dropdown = $(this).parents('.dropdown');
		var selected = dropdown.find('.dropmenu .selected');
		var newSelect = $(this).html();
		
		$('.dropmenu').removeClass('open');
		$('.dropmenu-active').slideUp(350, 'easeOutExpo');
		
		selected.html(newSelect);
		
		e.preventDefault();
	});
}



ANUBIS.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({				
			padding : 0,
			helpers : {
				title : { type: 'inside' },
			}
		});
			
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
		
		$(".fancybox-various").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}
}



ANUBIS.contactForm = function(){
	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		
		var fields = $contact_form.serialize();
		
		$.ajax({
			type: "POST",
			url: "_include/php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
				}
				
				$('#response').empty().html(response.html);
			}
		});
		return false;
	});
}


ANUBIS.map = function(){
	if($('.map').length > 0)
	{

		$('.map').each(function(i,e){

			$map = $(e);
			$map_id = $map.attr('id');
			$map_lat = $map.attr('data-mapLat');
			$map_lon = $map.attr('data-mapLon');
			$map_zoom = parseInt($map.attr('data-mapZoom'));
			$map_title = $map.attr('data-mapTitle');
			
			
			
			var latlng = new google.maps.LatLng($map_lat, $map_lon);			
			var options = { 
				scrollwheel: false,
				draggable: false, 
				zoomControl: false,
				disableDoubleClickZoom: false,
				disableDefaultUI: true,
				zoom: $map_zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var styles = [ 
							{
								
							}
						];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
			
			var map = new google.maps.Map(document.getElementById($map_id), options);
		
			var image = '_include/img/map-marker.png';
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: $map_title,
				icon: image
			});
			
			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');
			
			var contentString = '<p><strong>Company Name</strong><br>Address here</p>';
       
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			
			google.maps.event.addListener(marker, 'click', function() {
      			infowindow.open(map,marker);
    		});

		});
	}	
}

ANUBIS.twitter = function(){
	
	if($('.twitter-list').length > 0){
		
	
		$(".twitter-list").each(function(){
			$count = $(this).attr('data-count'); 
			
			$(this).tweet({
				join_text: '',
				username: "Bluxart", 
				count: $count, 
				view_text: "View on Twitter"
			});	
		});
	}	
}


ANUBIS.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(e){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		e.preventDefault();
	});
}


ANUBIS.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(e){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		e.preventDefault();
	});
}



ANUBIS.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}



ANUBIS.scrollToTop = function () {
    var didScroll = false;

    var $arrow = $('#back-to-top');

    $arrow.click(function (e) {
        $('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo');
        e.preventDefault();
    })

    $(window).scroll(function () {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            didScroll = false;

            if ($(window).scrollTop() > 1000) {
                $arrow.css('display', 'block');
            } else {
                $arrow.css('display', 'none');
            }
        }
    }, 250);
}



ANUBIS.getSize = function(){
	
	if($('#image-static .fullimage-container').length > 0){
		$('#image-static .fullimage-container').each(function() {
			
			var img = $(this).find('img');	
			
			
			var screenImage = img;
	
			
			var theImage = new Image();
			theImage.src = screenImage.attr("src");
	
			
			var imageWidth = theImage.width;
			var imageHeight = theImage.height;
			
			screenImage.attr('width', imageWidth);
			screenImage.attr('height', imageHeight);
		});
	}
	
}

ANUBIS.centerImg = function(){
	if($('#image-static .fullimage-container').length > 0){
		$('#image-static .fullimage-container').each(function(){
			var img = $(this).find('img'),
				vpWidth = $(window).width(),
				vpHeight,
				imgHeight = img.attr('height'),
				imgWidth = img.attr('width'),
				imgAspectRatio = imgWidth / imgHeight,
				vpAspectRatio,
				newImgWidth,
				newImgHeight = vpWidth / imgAspectRatio;
		
			if( vpWidth <= 660 ) {
				vpHeight = 400;
				newImgWidth = imgWidth * vpHeight / imgHeight;
			} else if( vpWidth > 660 && vpWidth <= 1024 ) {
				vpHeight = 500;
				newImgWidth = imgWidth * vpHeight / imgHeight;
			} else {
				vpHeight = 700;
				newImgWidth = imgWidth * vpHeight / imgHeight;
			}
			
			vpAspectRatio = vpWidth / vpHeight;
									
			if( vpAspectRatio <= imgAspectRatio ) {
				img.css({
					'margin-top': 0,
					'width': newImgWidth,
					'height': '100%',
					'margin-left': (vpWidth - newImgWidth)/2
				});
			} else {
				img.css({
					'width': '100%',
					'height': newImgHeight,
					'margin-left': 'auto',
					'margin-top': (vpHeight - newImgHeight)/2
				});
			}
		});
	}
}


ANUBIS.changeOpacity = function(){
	var arrows = $('.fullwidthbanner-container .tparrows, .fullwidthbanner-container .tp-bullets');
	
	$(window).scroll(function(){
		var st = $(this).scrollTop();
		arrows.css({ 'opacity' : (1 - st/600) });
	});
}



ANUBIS.slider();

$(document).ready(function () {
	ANUBIS.utils();
	ANUBIS.getSize();
	ANUBIS.centerImg();
	ANUBIS.mobileNav();
	ANUBIS.listenerMenu();
	ANUBIS.subMenu();
	ANUBIS.dropDown();
	ANUBIS.people();
	ANUBIS.portfolio();
	ANUBIS.accordion();
	ANUBIS.toggle();
	ANUBIS.toolTip();
	ANUBIS.fancyBox();
	ANUBIS.map();
	
	ANUBIS.twitter();
	ANUBIS.contactForm();
	ANUBIS.scrollToTop();
	ANUBIS.changeOpacity();
    
    
	$('#textRed').redactor({ lang: 'ru', fixed: true, imageUpload: '/Admin/UploadImage' });
	
});

$(window).resize(function(){
	ANUBIS.centerImg();
	ANUBIS.mobileNav();
});

});
