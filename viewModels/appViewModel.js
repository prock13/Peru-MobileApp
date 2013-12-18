function AppViewModel() {
    var self = this;
	var cachedUserInfo = '';
	var txtUserName = '';
    var txtPassword = '';
    var txtPortalID = '';
    var txtPortalLang  = '';
	var webServiceData = '';
	var wSDomain = '';
	var wSPath = '';
    var listResults = '';

	function getCacheInfo() {
		cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
		txtUserName = cachedUserInfo['userName'];
		txtPassword = cachedUserInfo['userPass'];
		txtPortalID = cachedUserInfo['portalID'];
		txtPortalLang = cachedUserInfo['portalLang'];
		
		webServiceData = Lungo.Cache.get("webServiceInfo");
		wSDomain = webServiceData['domain'];
		wSPath = webServiceData['path'];		
	};
	
	// LANGUAGE SELECT //////////////////////////////////////	  
	self.languageStrings = ko.observableArray();
	 
	self.setLanguage = function() {
	  	self.languageStrings(Lungo.Cache.get("langStrings"));
	};
	  
  	// LISTS  ///////////////////////////////////
    self.lists = ko.observableArray();
    self.chosenListId = ko.observableArray();

	self.getListItems = function() {		
		Lungo.Notification.show(); // show loading while getting data	
		self.lists([]);  //reset array
		getCacheInfo();  //get cache variables

		jQuery.ajax({
	        type: "GET",
	        url: wSDomain + "/" + txtPortalLang + wSPath + "PassPort.ashx/GetListItems",
	        username: txtUserName,
	        password: txtPassword,
	        cache: false,
	        dataType: "xml",
	        success: function(xml) {
	        	listResults = xml;
	            $(xml).find('list').each(function(){
					self.lists.push({nid: $(this).find("nid").text() , listname: $(this).find("listname").text()});					
	            });
	            Lungo.Notification.hide(); //hide loading
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.hide(); //hide loading 
	                Lungo.Notification.error("Error","Error retrieving lists.  Please try again.", "cancel", 3);
	        }            
	    });
		
	};

	// LIST DETAILS  ////////////////////////////////////
	self.listDetails = ko.observableArray();
	var tempString = '';
	
	self.getListDetails	= function(chosenList) {
		Lungo.Notification.show(); // show loading while getting data
		self.listDetails([]);  //reset array	
		tempString = '';  //reset tempString
		
        myListDetails = $(listResults).find('list').filter(function(){
           return $(this).find("nid").text() == chosenList.nid;
        });

		var dests = myListDetails.find('destination');
		var destCnt = dests.length - 1;  //need to subtract 1 cause array begins with 0
        dests.each(function(n) {				
				tempString += '{ "destName": "' + $(this).attr("name") + '", "category": [' ;
				
				var cats = $(this).find('category');
				var catsCnt = cats.length - 1;  //need to subtract 1 cause array begins with 0
				cats.each(function(i) {
					tempString += '{ "catName": "' + $(this).attr("name") + '", "iconURL": "' + $(this).attr("iconURL") + '" , "item": [';
						
					var items = $(this).find('item');
					var itemCnt = items.length - 1;
					items.each(function(x) {
						if (x < itemCnt) {
							tempString += '{ "itemid": "' + $(this).find("itemid").text() + '", "titleitem": "' + $(this).find("titleitem").text().replace(/"/g, "&quot;") + '" },';
						} else {	
							tempString += '{ "itemid": "' + $(this).find("itemid").text() + '", "titleitem": "' + $(this).find("titleitem").text().replace(/"/g, "&quot;") + '" }';									
						};						
					});	

					if (i < catsCnt) {
						tempString += ']},';
					} else {
						tempString += ']}';
					};								

				}); //end cats.each
				
				if (n < destCnt) {
					tempString += ']},';
				} else {
					tempString += ']}';
					self.listDetails.push.apply( self.listDetails, JSON.parse('[' + tempString + ']'));
				};
        });  //end dests.each

        Lungo.Notification.hide(); //hide loading			

	};


	// ITEM DETAILS //////////////////////////////////////
	self.itemDetails = ko.observableArray();
		
	self.getItemDetails = function(chosenItem) {
		Lungo.Notification.show(); // show loading while getting data
		self.itemDetails([]);  //reset array
		
		myEventDetails = $(listResults).find('item').filter(function(){
           return $(this).find("itemid").text() == chosenItem.itemid;
        });
        
		self.itemDetails.push({itemID2: myEventDetails.find("itemid").text(), titleItem2: myEventDetails.find("titleitem").text(), categoryitem: myEventDetails.find("categoryitem").text(), subcategoryitem: myEventDetails.find("subcategoryitem").text(), thumbnail: myEventDetails.find("thumbnail").text(), destinationid: myEventDetails.find("destinationid").text(), ejeid: myEventDetails.find("ejeid").text(), description: myEventDetails.find("description").text(), isbadgeearn: myEventDetails.find("isbadgeearn").text(), startdate: myEventDetails.find("startdate").text(), enddate: myEventDetails.find("enddate").text(), address: myEventDetails.find("address").text(), phone: myEventDetails.find("phone").text()	});		
		
		 Lungo.Notification.hide(); //hide loading
	};

	// BADGES  ////////////////////////////////////
    self.userBadgesTitle = 'Mis Sellos';
    self.userBadgesList = ko.observableArray();
    self.allBadgesList = ko.observableArray();

	self.getBadgeItems = function() {
		Lungo.Notification.show(); // show loading while getting data
		self.userBadgesList([]);  //reset array
		self.allBadgesList([]);  //reset array
		getCacheInfo();  //get cache variables
		
		jQuery.ajax({
	        type: "GET",
	        url: wSDomain + "/" + txtPortalLang + wSPath + "/PassPort.ashx/GetBadgeItems",
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
	            $(xml).find('unearnedbadges').each(function() {
	            	$(this).find("badge").each(function() {
	                	allBadgeURL = $(this).text();
	                	self.allBadgesList.push(allBadgeURL);
					});
	            });
	            
	            Lungo.Notification.hide(); //hide loading	            
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.hide(); //hide loading
	                Lungo.Notification.error("Error","Error retrieving badges.  Please try again.", "cancel", 3);
	        }            
	    });
	};
    
};

ko.applyBindings(new AppViewModel());