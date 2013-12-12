//--CUSTOM APP FUNCTIONS--
var App = (function(lng, undefined) {

  	var txtPortalLang = '';
  
  	var setLanguageStrings = function() {
		var cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
		txtPortalLang = cachedUserInfo['portalLang'];	
		
	  	switch (txtPortalLang) {
		  	case 'es-es':
		  		var langStringsArray = { name: 'es-es', btnLists: 'Listas', btnBadges: 'Insignias', btnMore: 'M&aacute;s', btnOut: 'Cerrar Sesión', strUsernameReq: 'Se requiere nombre de usuario' };
		  	break;
		  	
		  	case 'en-us':
		  		var langStringsArray = { name: 'en-us', btnLists: 'Lists', btnBadges: 'Badges', btnMore: 'More', btnOut: 'Log Out', strUsernameReq: 'Username required' };
		  	break;		  	
	  	}  	

		Lungo.Cache.set("langStrings", langStringsArray);
		$( "#btnLang" ).trigger( "click" );  //It's ugly...but it WORKS!!  :)
	};

    return {
        setLanguageStrings: setLanguageStrings    
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
	
			var goHome = function(){
				Lungo.Router.section('home');
				Lungo.Notification.hide();	
			};
	
	       $$.ajax({
	            type: 'GET', 
	            url: 'http://m8staging.com/'+txtPortalLang+'/desktopmodules/AuthServices/API/PassPort.ashx/AuthenticateUser',
				//HARDCODED USER/PASS DURING DEV 
	            data: {name: 'test250', pass: 'testtest', portal: '6'},
				//data: {name: txtUserName, pass: txtPassword, portal: txtPortalID},
	            dataType: 'json', 
	            async: true,
	            success: function(response) {
	            	if (response.message) {
					   	Lungo.Notification.error("Error",response.message, "cancel", 3);
					} else {
						//var userInfoArray = {uid: response.uid, userName: txtUserName, userPass: txtPassword, userEmail: response.mail, userFirstName: response.firstname, userLastName: response.lastname, portalID: txtPortalID, portalLang: txtPortalLang};
						//HARDCODED INFO DURING DEV 
						var userInfoArray = {uid: 178, userName: 'test250', userPass: 'testtest', userEmail: '', userFirstName: '', userLastName: '', portalID: '6', portalLang: 'es-es'};
						Lungo.Cache.set("lungoUserInfo", userInfoArray);  //set global Cache			
						Lungo.Notification.show();    //show loading animation
						App.setLanguageStrings();     //setup language strings
						Lungo.Router.section('home'); // go to the Home section
						Lungo.Notification.hide();    //hide loading animation
					};				
	            },
	            error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Login Error.  Please try again.", "cancel", 3);
	            }
	        });
		} // end if
    },
    
	'load section#home': function(event) {
		App.carousel = Lungo.Element.Carousel( $$('[data-control=carousel]')[0] );
		
		Lungo.dom('[data-direction=left]').tap(App.carousel.prev);
		Lungo.dom('[data-direction=right]').tap(App.carousel.next);
		
		setInterval(function() {
			App.carousel.next();
		}, 4500);
		
		//Lungo.dom('#list-nav').html('Listas');  //NATY: This is the fallback plan! 
	},
   
  'touch section#secListDetail a#share' : function(){
    //fb share list
    // var portalURL = "";
    // var communityURL = "community/my-passport"; // - comunidad/Mi-Pasaporte
    // var listID = "79";
    // var userID = "488";

    if( $$(this).hasClass('clicked') ) {
       $$('nav#socials').removeClass('show');
       $$(this).removeClass('clicked');
    } else {
      $$(this).addClass('clicked');
    }
    
  },

});


Lungo.ready(function() {

 
 

});
