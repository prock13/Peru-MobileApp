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
    self.lists = ko.observableArray();
    self.chosenListId = ko.observableArray();

	self.getListItems = function() {
		self.lists([]);  //reset array
		jQuery.ajax({
	        type: "GET",
	        url: "http://m8staging.com/"+txtPortalLang+"/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems",
	        username: txtUserName,
	        password: txtPassword,
	        cache: false,
	        dataType: "xml",
	        success: function(xml) {
	        	listResults = xml;
	            $(xml).find('list').each(function(){
					self.lists.push({nid: $(this).find("nid").text() , listname: $(this).find("listname").text()});					
	            });
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Error retrieving lists.  Please try again.", "cancel", 3);
	        }            
	    });
	};

	// LIST DETAILS  ////////////////////////////////////
	self.listDetails = ko.observableArray();
	self.getListDetails	= function(chosenList) {
		self.listDetails([]);  //reset array	
        myListDetails = $(listResults).find('list').filter(function(){
           return $(this).find("nid").text() == chosenList.nid;
        });
        
        myListDetails.find('item').each(function() {
			self.listDetails.push({itemID: $(this).find("itemid").text() , titleItem: $(this).find("titleitem").text()});		
        });
        			
	};


	// ITEM DETAILS //////////////////////////////////////
	self.itemDetails = ko.observableArray();	
	self.getItemDetails = function(chosenItem) {
		self.itemDetails([]);  //reset array
		myEventDetails = $(listResults).find('item').filter(function(){
           return $(this).find("itemid").text() == chosenItem.itemID;
        });
        
		self.itemDetails.push({itemID2: myEventDetails.find("itemid").text(), titleItem2: myEventDetails.find("titleitem").text(), categoryitem: myEventDetails.find("categoryitem").text(), subcategoryitem: myEventDetails.find("subcategoryitem").text(), thumbnail: myEventDetails.find("thumbnail").text(), destinationid: myEventDetails.find("destinationid").text(), ejeid: myEventDetails.find("ejeid").text(), description: myEventDetails.find("description").text(), isbadgeearn: myEventDetails.find("isbadgeearn").text()});		
	};

	// BADGES  ////////////////////////////////////
    self.userBadgesTitle = 'Mis Sellos';
    self.userBadgesList = ko.observableArray();
    self.allBadgesList = ko.observableArray();

	self.getBadgeItems = function() {
		self.userBadgesList([]);  //reset array
		self.allBadgesList([]);  //reset array
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