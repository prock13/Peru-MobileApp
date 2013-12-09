//--CUSTOM APP FUNCTIONS--
var App = (function(lng, undefined) {
  
    showListCount = function(event) {
        event.stopPropagation();
        Lungo.Element.count( "#list-nav", $$('#viewLists ul').children().length );
    };

    return {
        showListCount: showListCount,
    };

})(Lungo);

App.carousel = {prev: null, next: null};

Lungo.Events.init({

    'touch section#main #btnLogin': function() {
		var txtUserName = $$('#login-name').val();
		var txtPassword = $$('#login-password').val();
		var txtPortalID = $$('#login-portal').val();
		var sel = document.getElementById('login-portal');
		var option = sel.options[sel.selectedIndex];
		var txtPortalLang = option.getAttribute('name');
		
		if (txtUserName == '') {
			Lungo.Notification.error("Error","Username is required", "cancel", 3);
		} else if (txtPassword == '') {
			Lungo.Notification.error("Error","Password is required", "cancel", 3);
		} else if (txtPortalID == '') {
			Lungo.Notification.error("Error","Please select a portal", "cancel", 3);
		} else {
			//alert (txtUserName + ' , ' + txtPassword + ' , ' + txtPortalID + ' , ' + txtPortalLang);
	
			var goHome = function(){
				Lungo.Router.section('home');	
			};
	
	       $$.ajax({
	            type: 'GET', 
	            url: 'http://m8staging.com/'+txtPortalLang+'/desktopmodules/AuthServices/API/PassPort.ashx/AuthenticateUser',
				//data: {name: txtUserName, pass: txtPassword, portal: txtPortalID},
	            data: {name: 'test250', pass: 'testtest', portal: '6'},
	            dataType: 'json', 
	            async: true,
	            success: function(response) {
	            	if (response.message) {
					   	Lungo.Notification.error("Error","Login Info Incorrect.  Please try again.", "cancel", 3);
					} else {					
						Lungo.Notification.success("Success","UID: "+response.uid, "check", 3, goHome);
					};				
	            },
	            error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Login Error.  Please try again.", "cancel", 3);
	            }
	        });
		}
    },
    
	'load section#home': function(event) {
		App.carousel = Lungo.Element.Carousel( $$('[data-control=carousel]')[0] );
		
		Lungo.dom('[data-direction=left]').tap(App.carousel.prev);
		Lungo.dom('[data-direction=right]').tap(App.carousel.next);
		
		setInterval(function() {
			App.carousel.next();
		}, 4500);
		
	},
   
/*
	'touch #list-nav': function() {
		$$('header > h1').html($$(this).attr('data-title'));
		Lungo.Router.section('secLists');
	},

	'touch #badge-nav': function() {
		$$('header > h1').html($$(this).attr('data-title'));
		Lungo.Router.section('secBadges');		
	},
*/

    //'load article#viewLists' : App.showListCount,
    
    
    'load article#listDetal' : function(){
       //fb share list
        var portalURL = "";
        var communityURL = "community/my-passport"; // - comunidad/Mi-Pasaporte
        var listID = "79";
        var userID = "488";

        Lungo.dom('#shareFB').tap(function(){
          FB.ui(
            {
              method: 'feed',
              name: 'Peru Travel App',
              link: 'https://developers.facebook.com/docs/dialogs/', //pass url
              picture: '/images/logo-peru@2x.png',
              caption: 'Peru Travel App - My List', //lang specific
              description: 'Find the most complete guide for vacations in Peru, with the main destinations, attractions, activities, offers, and more.' //lang specific
            }/*,
            function(response) {
              if (response && response.post_id) {
                alert('Post was published.');
              } else {
                alert('Post was not published.');
              }
            }*/
          );

        });//end share tab fb
      
      
    },

    'load article#viewBadges' : function() {
    	
	},
	

});


Lungo.ready(function() {

 
 

});