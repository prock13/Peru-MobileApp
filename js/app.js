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
	
			var goHome = function(){
				Lungo.Router.section('home');
				Lungo.Notification.hide();	
			};
	
	       $$.ajax({
	            type: 'GET', 
	            url: 'http://m8staging.com/'+txtPortalLang+'/desktopmodules/AuthServices/API/PassPort.ashx/AuthenticateUser',
				//HARDCODED USER/PASS DURING DEV 
				//data: {name: txtUserName, pass: txtPassword, portal: txtPortalID},
	            data: {name: 'test250', pass: 'testtest', portal: '6'},
	            dataType: 'json', 
	            async: true,
	            success: function(response) {
	            	if (response.message) {
					   	Lungo.Notification.error("Error","Login Info Incorrect.  Please try again.", "cancel", 3);
					} else {
						var userInfoArray = {uid: response.uid, userName: txtUserName, userPass: txtPassword, userEmail: response.mail, userFirstName: response.firstname, userLastName: response.lastname, portalID: txtPortalID, portalLang: txtPortalLang};
						Lungo.Cache.set("lungoUserInfo", userInfoArray);					
						//PMA: Show loading instead of success notification for live app: Lungo.Notification.show();
						Lungo.Notification.success("Success","UID: "+response.uid, "check", 3, goHome);
						//var cachedInfo = Lungo.Cache.get("lungoUserInfo");
						//console.log('cache0: '+ cachedInfo['uid']);
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
   

	'touch #list-nav': function() {

/*		
		$$.ajaxSettings = {
		    async: true,
		    success: {},
		    error: {},
		    timeout: 10
		};

		$$.ajaxSettings.async = true;
		$$.ajaxSettings.dataType = 'xml';		
		//var txtURL = 'http://m8staging.com/'+txtPortalLang+'/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems';
		//var response = $$.get(txtURL, {name: txtUserName, pass: txtPassword});
		var response = $$.get('http://m8staging.com/es-es/desktopmodules/AuthServices/API/PassPort.ashx/GetActivePortals');		
		console.log(response);
*/
/*
	       $$.ajax({
	            type: 'GET', 
	            url: 'http://m8staging.com/es-es/desktopmodules/AuthServices/API/PassPort.ashx/GetActivePortals',
	            //data: {name: txtUserName, pass: txtPassword},
	            dataType: 'xml', 
	            async: true,
	            success: function(response) {
	            	alert(response);
					//Lungo.Notification.success("Success","Success", "check", 3);
	            },
	            error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Login Error.  Please try again.", "cancel", 3);
	            }
	        });
*/
	},

/*
	'touch #badge-nav': function() {
		$$('header > h1').html($$(this).attr('data-title'));
		Lungo.Router.section('secBadges');		
	},
*/

    'load article#viewLists' : App.showListCount,

    'load article#viewBadges' : function() {
    	
	},
	

});


Lungo.ready(function() {

 
 

});
