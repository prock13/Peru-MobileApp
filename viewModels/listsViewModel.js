function ListItem(data) {
	this.nid = ko.observable(data.nid);
    this.name = ko.observable(data.name);
} 

function ListsViewModel() {
    // Data
    var self = this;
    //self.lists = ko.observableArray(['Mi Lista 1', 'Mi Lista 2', 'Mi Lista 3', 'Mi Lista 5']);
    self.lists = ko.observableArray();

/*	var cachedUserInfo = Lungo.Cache.get("lungoUserInfo");
	var txtUserName = cachedUserInfo['userName'];
	var txtPassword = cachedUserInfo['userPass'];
	var txtPortalID = cachedUserInfo['portalID'];
	var txtPortalLang = cachedUserInfo['portalLang'];
*/


	function getListItems() {
		//PMA - TESTING!!
		var txtUserName = 'test250';
	    var txtPassword = 'testtest';
	    var txtPortalLang  = 'es-es';	
	
		jQuery.ajax({
	        type: "GET",
	        url: "http://m8staging.com/"+txtPortalLang+"/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems",
	        username: txtUserName,
	        password: txtPassword,
	        cache: false,
	        dataType: "xml",
	        success: function(xml) {
	        	var i = 0;
	            $(xml).find('list').each(function(){
	                var name = $(this).find("listname").text()
	                alert(name);
					self.lists[i] = name;
					i = i + 1;
	            });
	        },
	        error: function(xhr, type) { 
	                Lungo.Notification.error("Error","Login Error.  Please try again.", "cancel", 3);
	        }            
	    });
	}

    
};

var viewModel = new ListsViewModel();
ko.applyBindings(viewModel, document.getElementById('viewLists'));