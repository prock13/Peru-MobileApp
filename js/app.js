//--CUSTOM APP FUNCTIONS--
var App = (function(lng, undefined) {

	var txtPortalLang = '';

	var setLanguageStrings = function() {
		//GET THE USER INFO
	    var cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
	    txtPortalLang = cachedUserInfo['portalLang'];	
	
	    switch (txtPortalLang) {
	      case 'es-es':
	      case 'es-pe':
	      case 'es-lat':
	      var langStringsArray = { name: 'es-es', btnLists: 'Listas', btnBadges: 'Insignias', btnMore: 'M&aacute;s', btnOut: 'Cerrar Sesi&oacute;n', titleLists: 'Mis Listas de Viaje', titleBadges: 'Mis Insignias', titleBadgesAll: 'Todas las Insignias', titleMore: 'M&aacute;s', titleAbout: 'Acerca de Per&uacute;', titleTerms: 'T&eacute;rminos y Condiciones', fileAbout: 'views/about.html', fileTerms: 'views/tnc.html' };
	      break;
	
	      case 'en-us':
	      case 'en-int':
	      case 'en-ca':
	      case 'en-uk':
	      var langStringsArray = { name: 'en-us', btnLists: 'Lists', btnBadges: 'Badges', btnMore: 'More', btnOut: 'Log Out', titleLists: 'My Itinerary Lists', titleBadges: 'My Badges', titleBadgesAll: 'All Badges', titleMore: 'More', btnAbout: 'About Peru', titleTerms: 'Terms and Conditions', fileAbout: 'views/aboutEn.html', fileTerms: 'views/tncEN.html'  };
	      break;		  	
		}; 	

		Lungo.Cache.set("langStrings", langStringsArray);
		$( "#btnLang" ).trigger( "click" );  
	};

  return {
    setLanguageStrings: setLanguageStrings    
  };

})(Lungo);

App.carousel = {prev: null, next: null};

// THIS IS WHERE YOU SET THE DOMAIN AND PATH FOR THE WEBSERVICE
App.webServiceData = {domain: "http://m8staging.com", path: "/desktopmodules/AuthServices/API/"};
Lungo.Cache.set("webServiceInfo", App.webServiceData);

Lungo.Events.init({

  //forgot password
  'touch section#main #btnPass': function() {
    var passUserName = $$('#pass-user').val();
    var passPortalID = $$('#pass-portal').val();

    if (passUserName == '') {
      Lungo.Notification.error("Error","Username is required", "cancel", 3);
    } else if (passPortalID == '') {
      Lungo.Notification.error("Error","Please select a portal", "cancel", 3);
    } else {     
      $$.ajax({
        type: 'GET', 
        url: webServiceData['domain'] + App.webServiceData['path'] + 'UserAutentication.ashx/ForgotPassword?portalId='+passPortalID+'&userName='+passUserName, 
        dataType: 'text',
        async: true,
        success: function(response) {
          if(response=="False") {
            Lungo.Notification.error("Error","User does not exists in this portal. Please try again.", "check", 3);
          } else { 
            Lungo.Notification.success("Success","Password was sent to your email.", "check", 3);
          }
        },
        error: function(xhr, type) { 
          Lungo.Notification.error("Error","Password reset error. Please try again.", "cancel", 3);
        }
      });
    }
  },

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
        url: App.webServiceData['domain'] + '/' + txtPortalLang + App.webServiceData['path'] +'PassPort.ashx/AuthenticateUser',
        //data: {name: txtUserName, pass: txtPassword, portal: txtPortalID},
        //HARDCODED USER/PASS DURING DEV 
        data: {name: 'test250', pass: 'testtest', portal: '6'},
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
          }			
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

  },
   
  //---SOCIALS---
  'touch section#secListDetail a#share' : function(){
    if($$(this).hasClass('clicked') ) {
       $$('nav#socials').removeClass('show');
       $$(this).removeClass('clicked');
    } else {
       $$(this).addClass('clicked');
    }
  },
   
  'touch #socials a' : function() {
    var cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
    var portalURL = cachedUserInfo['portalLang'];
    if(portalURL=="en-int") portalURL = "";
    var communityURL;
    var shareMsg;
    switch (portalURL) {
      case 'es-es':
      case 'es-pe':
      case 'es-lat':
      communityURL = "comunidad/Mi-Pasaporte";
      shareMsg = "Mira mi itinerario para mi viaje a Perú.";
      break;

      case 'en-us':
      case 'en-int':
      case 'en-ca':
      case 'en-uk':
      communityURL = "community/my-passport";
      shareMsg = "Check out my itinerary for my Peru trip.";
      break;  	
    }

    var listID = "79"; //--get from view
    var userID = cachedUserInfo['uid'];

    window.plugins.socialsharing.share(shareMsg, null, null, App.webServiceData['domain'] + '/'+ portalURL + '/' + communityURL + '/ItineraryId/'+ listID + '/userId/' + userID +'.aspx');

    //--close social modal
    $$('nav#socials').removeClass('show');
    $$('a#share').removeClass('clicked');

  },
  
  'touch a.btnLogout' : function() {
    Lungo.Cache.remove("lungoUserInfo");
    Lungo.Router.section('main');
  }
  

});


Lungo.ready(function() {


});
