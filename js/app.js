//--CUSTOM APP FUNCTIONS--
var App = (function(lng, undefined) {

  	var txtPortalLang = '';
  
  	var setLanguageStrings = function() {
		var cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
		txtPortalLang = cachedUserInfo['portalLang'];	
	};

	var getLanguageStrings = function() {
	  	var esLangStrings = {btnLists: 'Listas', btnBadges: 'Insignias', btnMore: 'Más', strUsernameReq: 'Se requiere nombre de usuario' };
	  	switch (txtPortalLang) {
		  	case 'es-es':
		  		//esLangStrings.push();
		  	break;
		  	
		  	case 'en-us':
		  	break;
	  	}  	
	  	return esLangStrings;
  	};    
 
    return {
        setLanguageStrings: setLanguageStrings,
        getLanguageStrings: getLanguageStrings       
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
	            //data: {name: 'test250', pass: 'testtest', portal: '6'},
				data: {name: txtUserName, pass: txtPassword, portal: txtPortalID},
	            dataType: 'json', 
	            async: true,
	            success: function(response) {
	            	if (response.message) {
					   	Lungo.Notification.error("Error",response.message, "cancel", 3);
					} else {
						var userInfoArray = {uid: response.uid, userName: txtUserName, userPass: txtPassword, userEmail: response.mail, userFirstName: response.firstname, userLastName: response.lastname, portalID: txtPortalID, portalLang: txtPortalLang};
						//HARDCODED INFO DURING DEV 
						//var userInfoArray = {uid: 178, userName: 'test250', userPass: 'testtest', userEmail: '', userFirstName: '', userLastName: '', portalID: '6', portalLang: 'es-es'};
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
		
	},
   
    'load article#listDetal' : function(){
       //fb share list
        var portalURL = "";
        var communityURL = "community/my-passport"; // - comunidad/Mi-Pasaporte
        var listID = "79";
        var userID = "488";

       /* Lungo.dom('#shareFB').tap(function(){
          FB.ui(
            {
              method: 'feed',
              name: 'Peru Travel App',
              link: 'https://developers.facebook.com/docs/dialogs/', //pass url
              picture: '/images/logo-peru@2x.png',
              caption: 'Peru Travel App - My List', //lang specific
              description: 'Find the most complete guide for vacations in Peru, with the main destinations, attractions, activities, offers, and more.' //lang specific
            },
            function(response) {
              if (response && response.post_id) {
                alert('Post was published.');
              } else {
                alert('Post was not published.');
              }
            }
          );

        });//end share tab fb
      */
      
    },


});


Lungo.ready(function() {

 
 

});
