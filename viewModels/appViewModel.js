function AppViewModel() {
    var self = this;

	// LISTS  ////////////////////////////////////
    //self.lists = ko.observableArray(['Mi Lista 1', 'Mi Lista 2', 'Mi Lista 3', 'Mi Lista 5']);
    self.lists = ko.observableArray();

/*	var cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
	var txtUserName = cachedUserInfo['userName'];
	var txtPassword = cachedUserInfo['userPass'];
	var txtPortalID = cachedUserInfo['portalID'];
	var txtPortalLang = cachedUserInfo['portalLang'];
*/

	self.getListItems = function () {
		//PMA - TESTING WITH HARDCODED DATA!!
		var txtUserName = 'test250';
	    var txtPassword = 'testtest';
	    var txtPortalLang  = 'es-es';
	    var name = '';	
	
		jQuery.ajax({
	        type: "GET",
	        url: "http://m8staging.com/"+txtPortalLang+"/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems",
	        username: txtUserName,
	        password: txtPassword,
	        cache: false,
	        dataType: "xml",
	        success: function(xml) {
	            $(xml).find('list').each(function(){
	                name = $(this).find("listname").text()
					self.lists.push(name);
	            });
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Login Error.  Please try again.", "cancel", 3);
	        }            
	    });
	};


	// BADGES  ////////////////////////////////////
    self.userBadgesTitle = 'Mis Sellos';
    self.userBadgesList = ko.observableArray();
    self.allBadgesList = ko.observableArray();
    
	self.getBadgeItems = function () {
		//PMA - TESTING WITH HARDCODED DATA!!
		var txtUserName = 'test250';
	    var txtPassword = 'testtest';
	    var txtPortalLang  = 'es-es';
	    var badge = '';
	    var badgeTxt = '';	
	
		jQuery.ajax({
	        type: "GET",
	        url: "http://m8staging.com/"+txtPortalLang+"/desktopmodules/AuthServices/API/PassPort.ashx/GetBadgeItems",
	        username: txtUserName,
	        password: txtPassword,
	        cache: false,
	        dataType: "xml",
	        success: function(xml) {
	            $(xml).find('earnedbadges').each(function() {
	            	$(this).find("badge").each(function() {
	                	badge = $(this).text();
	                	self.userBadgesList.push(badge);
					});
	            });
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Login Error.  Please try again.", "cancel", 3);
	        }            
	    });
	};
    

    
};

ko.applyBindings(new AppViewModel());