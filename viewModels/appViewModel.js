function AppViewModel() {
    var self = this;
	var txtUserName = 'test250';
    var txtPassword = 'testtest';
    var txtPortalLang  = 'es-es';
    var listResults = '';

/*	var cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
	var txtUserName = cachedUserInfo['userName'];
	var txtPassword = cachedUserInfo['userPass'];
	var txtPortalID = cachedUserInfo['portalID'];
	var txtPortalLang = cachedUserInfo['portalLang'];
*/


	// LISTS  ///////////////////////////////////
    self.listDetail = ko.observableArray();

	self.getListItems = function() {
		jQuery.ajax({
	        type: "GET",
	        url: "http://m8staging.com/"+txtPortalLang+"/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems",
	        username: txtUserName,
	        password: txtPassword,
	        cache: false,
	        dataType: "xml",
	        success: function(xml) {
	        	//listResults = xml;
	        	var nid = ''; 
	        	var name = '';
	            $(xml).find('list').each(function(){
	                listNid = $(this).find("nid").text();
	                listName = $(this).find("listname").text();
					self.listDetail.push({nid: listNid , listname: listName});					
	            });
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Error retrieving lists.  Please try again.", "cancel", 3);
	        }            
	    });
	};

	// LIST DETAILS  ////////////////////////////////////
	self.getListDetails	 = function() {
		alert("It's working!");	
	};

	// BADGES  ////////////////////////////////////
    self.userBadgesTitle = 'Mis Sellos';
    self.userBadgesList = ko.observableArray();
    self.allBadgesList = ko.observableArray();

	self.getBadgeItems = function() {
		jQuery.ajax({
	        type: "GET",
	        url: "http://m8staging.com/"+txtPortalLang+"/desktopmodules/AuthServices/API/PassPort.ashx/GetBadgeItems",
	        username: txtUserName,
	        password: txtPassword,
	        cache: false,
	        dataType: "xml",
	        success: function(xml) {
	            //User Badges
				var userBadgeURL = '';
	            $(xml).find('earnedbadges').each(function() {
	            	$(this).find("badge").each(function() {
	                	userBadgeURL = $(this).text();
	                	self.userBadgesList.push(userBadgeURL);
					});
	            });
	            
				//All Badges
				var allBadgeURL = '';
	            $(xml).find('allbadges').each(function() {
	            	$(this).find("badge").each(function() {
	                	allBadgeURL = $(this).text();
	                	self.allBadgesList.push(allBadgeURL);
					});
	            });	            
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Error retrieving badges.  Please try again.", "cancel", 3);
	        }            
	    });
	};
    
};

ko.applyBindings(new AppViewModel());