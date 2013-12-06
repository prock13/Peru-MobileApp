function ListsViewModel() {
    // Data
    var self = this;
    self.lists = ko.observableArray(['Mi Lista 1', 'Mi Lista 2', 'Mi Lista 3', 'Mi Lista 5']);
   
	//TODO: How to get the user selected country languague code to emebed in URL    
    //self.getListItemsUrl = 'http://m8staging.com/es-es/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems';   

	var txtPortalLang = 'es-es';

	$$.ajax({
	    type: 'GET', 
	    url: 'http://m8staging.com/'+txtPortalLang+'/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems',
	    //data: {name: 'test250', pass: 'testtest', portal: '6'},
	    dataType: 'xml', 
	    async: true,
	    success: function(response) {
	    
	    /*	if (response) {
			   	Lungo.Notification.error("Error","Login Info Incorrect.  Please try again.", "cancel", 3);
			} else {					
				Lungo.Notification.success("Success","UID: "+response.uid, "check", 3, goHome);
			}; 
		*/				
	    },
	    error: function(xhr, type) { 
	        Lungo.Notification.error("Error","Error retrieving lists.", "cancel", 3);
	    }
	});


    
};

var viewModel = new ListsViewModel();
ko.applyBindings(viewModel, document.getElementById('viewLists'));