//--CUSTOM APP FUNCTIONS--

var App = (function(lng, undefined) {
  
    sectionTrigger = function(event) {
        event.stopPropagation();
        console.error(event);
     };

    articleTrigger = function(event) {       
        event.stopPropagation();
        console.error(event);
    };

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
    
    'load article#viewLists' : App.showListCount,

    'load section#home': function(event) {
        App.carousel = Lungo.Element.Carousel( $$('[data-control=carousel]')[0] );
        /* App.carousel = Lungo.Element.Carousel($$('[data-control=carousel]')[0], function(index, element) {
            //Lungo.dom("article#homeSlider .title span").html(index + 1);           
        }); */

        Lungo.dom('[data-direction=left]').tap(App.carousel.prev);
        Lungo.dom('[data-direction=right]').tap(App.carousel.next);
    },

    'touch section#main button[data-label=Login]': function() {
       /* Lungo.Service.Settings.async = false;
        Lungo.Service.Settings.error = function(type, xhr){
            alert('Error!');
        };
        //Lungo.Service.Settings.headers["Content-Type"] = "application/json";
        Lungo.Service.Settings.headers["Content-Type"] = "text/xml";
        Lungo.Service.Settings.crossDomain = true;
        Lungo.Service.Settings.timeout = 10;

        var url = "http://m8staging.com/es-es/desktopmodules/AuthServices/API/PassPort.ashx/GetActivePortals";
        //var data = {ZipCode: 33026};
        var data = '';
        var parseResponse = function(result){
            alert(result);
        };
        Lungo.Service.get(url, data, parseResponse, "xml");
        //Another example
        //var result = Lungo.Service.get(url, "id=25&len=50", null, "json");    */

        $$.ajax({
            type: 'GET', // defaults to 'GET'
            url: 'http://m8staging.com/es-es/desktopmodules/AuthServices/API/PassPort.ashx/GetActivePortals',
            dataType: 'xml', //'json', 'xml', 'html', or 'text'
            async: false,
            success: function(response) { 
                alert(response);
            },
            error: function(xhr, type) { 
                alert('Error!')
            }
        });

    },



});


Lungo.ready(function() {

 
 

});
