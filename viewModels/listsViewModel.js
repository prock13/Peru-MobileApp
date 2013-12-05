function ListsViewModel() {
    // Data
    var self = this;
    self.lists = ko.observableArray(['Mi Lista 1', 'Mi Lista 2', 'Mi Lista 3', 'Mi Lista 5']);
   
	//TODO: How to get the user selected country languague code to emebed in URL    
    self.getListItemsUrl = 'http://m8staging.com/es-es/desktopmodules/AuthServices/API/PassPort.ashx/GetListItems';
    
    self.defaultParams = {
	    country: 'uk',
	    pretty: 1,
	    action: 'search_listings',
	    encoding: 'json',
	    listing_type: 'buy',
	
	    // Used to signify we are using jsonp
	    callback: '?'
	};

    
};

var viewModel = new ListsViewModel();
ko.applyBindings(viewModel, document.getElementById('viewLists'));