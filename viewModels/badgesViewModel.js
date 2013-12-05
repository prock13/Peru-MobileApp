function badgesViewModel() {
    // Data
    var self = this;
    self.userBadgesTitle = 'Mis Sellos';
    self.userBadgesLists = ko.observableArray([{badgesURL: 'images/badges/unlocked/1.png', badgesID: 15}, {badgesURL: 'images/badges/unlocked/2.png', badgesID: 25}]);   
    //self.allBadgesLists = array(['Mi Lista 1', 'Mi Lista 2', 'Mi Lista 3', 'Mi Lista 5']);

};

var viewModel = new badgesViewModel();
ko.applyBindings(viewModel, document.getElementById('viewBadges'));