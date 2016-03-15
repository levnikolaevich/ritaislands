jQuery(function($){'use strict';var BANSHEE=window.BANSHEE||{};BANSHEE.subMenu=function(){$('#menu ul').supersubs({minWidth:12,maxWidth:27,extraWidth:0}).superfish({delay:0,animation:{opacity:'show'},speed:'fast',autoArrows:false,dropShadows:false});};var mobileMenuClone=$('#menu').clone().attr('id','navigation-mobile');BANSHEE.mobileNav=function(){};BANSHEE.listenerMenu=function(){};BANSHEE.mobileMenu=function(){};BANSHEE.people=function(){if($('#team-people').length>0){var $container=$('#team-people');$container.imagesLoaded(function(){$container.isotope({animationEngine:'best-available',itemSelector:'.single-people',layoutMode:'fitRows'});});var $optionSets=$('#team-filter .option-set'),$optionLinks=$optionSets.find('a');$optionLinks.click(function(){var $this=$(this);if($this.hasClass('selected')){return false;}
var $optionSet=$this.parents('.option-set');$optionSet.find('.selected').removeClass('selected');$this.addClass('selected');var options={},key=$optionSet.attr('data-option-key'),value=$this.attr('data-option-value');value=value==='false'?false:value;options[key]=value;if(key==='layoutMode'&&typeof changeLayoutMode==='function'){changeLayoutMode($this,options);}else{$container.isotope(options);}
return false;});}};BANSHEE.portfolio=function(){if($('#portfolio-projects').length>0){var $container=$('#portfolio-projects');$container.imagesLoaded(function(){$container.isotope({animationEngine:'best-available',itemSelector:'.item-project'});});$(window).smartresize(function(){$('#portfolio-projects').isotope('reLayout');});var $optionSets=$('#portfolio-filter .option-set'),$optionLinks=$optionSets.find('a');$optionLinks.click(function(){var $this=$(this);if($this.hasClass('selected')){return false;}
var $optionSet=$this.parents('.option-set');$optionSet.find('.selected').removeClass('selected');$this.addClass('selected');var options={},key=$optionSet.attr('data-option-key'),value=$this.attr('data-option-value');value=value==='false'?false:value;options[key]=value;if(key==='layoutMode'&&typeof changeLayoutMode==='function'){changeLayoutMode($this,options);}else{$container.isotope(options);}
return false;});}};BANSHEE.portfolioMasonry=function(){if($('#portfolio-projects .masonry-portfolio').length>0){var $container=$('#portfolio-projects .masonry-portfolio');$container.imagesLoaded(function(){$container.isotope({animationEngine:'best-available',itemSelector:'.item-project'});});$(window).smartresize(function(){$container.isotope('reLayout');});var $optionSets=$('#portfolio-filter .option-set'),$optionLinks=$optionSets.find('a');$optionLinks.click(function(){var $this=$(this);if($this.hasClass('selected')){return false;}
var $optionSet=$this.parents('.option-set');$optionSet.find('.selected').removeClass('selected');$this.addClass('selected');var options={},key=$optionSet.attr('data-option-key'),value=$this.attr('data-option-value');value=value==='false'?false:value;options[key]=value;if(key==='layoutMode'&&typeof changeLayoutMode==='function'){changeLayoutMode($this,options);}else{$container.isotope(options);}
return false;});}};BANSHEE.masonry=function(){if($('.masonry-blog').length>0){var $container=$('.masonry-area');$container.imagesLoaded(function(){$container.masonry({itemSelector:'.item-blog'});});}};BANSHEE.dropDown=function(){$('.dropmenu').on('click',function(e){$(this).toggleClass('open');$('.dropmenu-active').stop().slideToggle(350,'easeOutExpo');e.preventDefault();});$('.dropmenu-active a').on('click',function(e){var dropdown=$(this).parents('.dropdown');var selected=dropdown.find('.dropmenu .selected');var newSelect=$(this).html();$('.dropmenu').removeClass('open');$('.dropmenu-active').slideUp(350,'easeOutExpo');selected.html(newSelect);e.preventDefault();});};BANSHEE.fancyBox=function(){if($('.fancybox').length>0||$('.fancybox-media').length>0||$('.fancybox-various').length>0){$(".fancybox").fancybox({padding:0,helpers:{title:{type:'inside'},}});$('.fancybox-media').fancybox({padding:0,openEffect:'none',closeEffect:'none',helpers:{media:{}}});$(".fancybox-various").fancybox({maxWidth:800,maxHeight:600,fitToView:false,width:'70%',height:'70%',autoSize:false,closeClick:false,openEffect:'none',closeEffect:'none'});}};BANSHEE.accordion=function(){if($('.accordion-builder').length>0){var accordion_trigger=$('.accordion-heading.accordionize');accordion_trigger.delegate('.accordion-toggle','click',function(e){if($(this).hasClass('active')){$(this).removeClass('active');$(this).addClass('inactive');}
else{accordion_trigger.find('.active').addClass('inactive');accordion_trigger.find('.active').removeClass('active');$(this).removeClass('inactive');$(this).addClass('active');}
e.preventDefault();});}};BANSHEE.toggle=function(){if($('.toggle-builder').length>0){var accordion_trigger_toggle=$('.accordion-heading.togglize');accordion_trigger_toggle.delegate('.accordion-toggle','click',function(e){if($(this).hasClass('active')){$(this).removeClass('active');$(this).addClass('inactive');}
else{$(this).removeClass('inactive');$(this).addClass('active');}
    e.preventDefault();
});
}
}; BANSHEE.tabs = function () { if ($('.tabbable').length > 0) { $('.tabbable').each(function () { $(this).find('li').first().addClass('active'); $(this).find('.tab-pane').first().addClass('active'); }); } }; BANSHEE.toolTip = function () { $('a[data-toggle=tooltip]').tooltip(); };



BANSHEE.scrollToTop = function () {
    var didScroll = false;
    var gotonext = false;
    var $arrow = $('#back-to-top');
    var $gtn1 = $('#go-to-next');
    var $gtn2 = $('#go-to-back');
    $arrow.click(function (e) { $('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo'); e.preventDefault(); });
    $(window).scroll(function () { didScroll = true; gotonext = true; });
    setInterval(function () {
        if (didScroll) { didScroll = false; if ($(window).scrollTop() > 1000) { $arrow.css('display', 'block'); } else { $arrow.css('display', 'none'); } }

        if (gotonext)
        {
            gotonext = false;
            if ($(window).scrollTop() > 350)
            {
                $gtn1.css('display', 'block');
                $gtn2.css('display', 'block');
            } else
            {
                $gtn1.css('display', 'none');
                $gtn2.css('display', 'none');
            }
        }

    }, 250);
};

BANSHEE.video = function () { $('.videoWrapper, .video-embed').fitVids(); }; BANSHEE.customSelect = function () { if ($('.selectpicker').length > 0) { $('.selectpicker').selectpicker(); } }; BANSHEE.mediaElements = function () { $('audio,video').each(function () { $(this).mediaelementplayer({ defaultVideoWidth: 480, defaultVideoHeight: 270, videoWidth: -1, videoHeight: -1, audioWidth: 400, audioHeight: 50, startVolume: 0.8, pluginPath: theme_objects.base + '/_include/js/mediaelement/', flashName: 'flashmediaelement.swf', silverlightName: 'silverlightmediaelement.xap', loop: false, enableAutosize: true, alwaysShowControls: false, iPadUseNativeControls: false, iPhoneUseNativeControls: false, AndroidUseNativeControls: false, alwaysShowHours: false, showTimecodeFrameCount: false, framesPerSecond: 25, enableKeyboard: true, pauseOtherPlayers: true, keyActions: [] }); }); }; BANSHEE.leavePage = function () { $('header #logo a, #menu li a').not('header #menu li a[href$="#"]').click(function (event) { event.preventDefault(); var linkLocation = this.href; $('header').animate({ 'opacity': 0, 'marginTop': -150 }, 500, 'easeOutExpo'); $('#main').animate({ 'opacity': 0 }, 500, 'easeOutExpo'); $('body').fadeOut(500, function () { window.location = linkLocation; }); }); }; BANSHEE.reloader = function () { window.onpageshow = function (event) { if (event.persisted) { window.location.reload(); } }; }; BANSHEE.animationsModule = function () {


    function elementViewed(element) {
        //if (Modernizr.touch && $('html').hasClass('no-animation-effects')) { 
        return true; //}
var elem=element,window_top=$(window).scrollTop(),offset=$(elem).offset(),top=offset.top;if($(elem).length>0){if(top+$(elem).height()>=window_top&&top<=window_top+$(window).height()){return true;}else{return false;}}};function onScrollInterval(){var didScroll=false;$(window).scroll(function(){didScroll=true;});setInterval(function(){if(didScroll){didScroll=false;}
    if ($('.animated-content').length > 0) { $('.animated-content').each(function () { var currentObj = $(this); if (elementViewed(currentObj)) { currentObj.addClass('animate'); } }); }
}, 250);
}; onScrollInterval(); }; $(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide"
    });
    if ($('.animation-enabled').length > 0) { BANSHEE.leavePage(); }}); $(document).ready(function () { if ($('.animation-enabled').length > 0) { BANSHEE.reloader(); $('body').jpreLoader({ splashID: "#jSplash", showSplash: true, showPercentage: false, autoClose: true }, function () { $("header").delay(150).animate({ 'opacity': 1, 'marginTop': 0 }, 500, 'easeOutExpo', function () { $('#main').delay(150).animate({ 'opacity': 1 }, 500, 'easeOutExpo', function () { $('footer').animate({ 'opacity': 1 }, 500, 'easeOutExpo'); }); }); }); }
BANSHEE.customSelect();BANSHEE.mobileNav();BANSHEE.mobileMenu();BANSHEE.listenerMenu();BANSHEE.subMenu();BANSHEE.dropDown();BANSHEE.people();BANSHEE.portfolio();BANSHEE.accordion();BANSHEE.toggle();BANSHEE.tabs();BANSHEE.toolTip();BANSHEE.fancyBox();BANSHEE.scrollToTop();BANSHEE.video();BANSHEE.masonry();BANSHEE.mediaElements();BANSHEE.animationsModule();$('#textRed').redactor({lang:'ru',fixed:true,imageUpload:'/Admin/UploadImage'});});$(window).resize(function(){BANSHEE.mobileNav();});});