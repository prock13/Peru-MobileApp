 		Lungo.Service.Settings.async = false;
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
        //var result = Lungo.Service.get(url, "id=25&len=50", null, "json");   

=========================================================================================================

 		Lungo.Service.Settings.async = false;
        Lungo.Service.Settings.error = function(type, xhr){
        	Lungo.Notification.error("Error","Login Error.  Please try again.", "cancel", 3);
        };
        Lungo.Service.Settings.headers["Content-Type"] = "application/json";
        Lungo.Service.Settings.crossDomain = true;
        Lungo.Service.Settings.timeout = 5;

        var url = "http://m8staging.com/"+txtPortalLang+"/desktopmodules/AuthServices/API/PassPort.ashx/AuthenticateUser?";
        var data = {name: txtUserName, pass: txtPassword, portal: txtPortalID};
        var parseResponse = function(result){
            alert(result);
        };
        Lungo.Service.get(url, data, parseResponse, "json");


=========================================================================================================



        $$.ajax({
            type: 'GET', // defaults to 'GET'
            //url: 'http://m8staging.com/es-es/desktopmodules/AuthServices/API/PassPort.ashx/GetActivePortals',
            url: 'http://m8staging.com/'+txtPortalLang+'/desktopmodules/AuthServices/API/PassPort.ashx/AuthenticateUser?name='+txtUserName+'&pass='+txtPassword+'&portal='+txtPortalID,
            dataType: 'xml', //'json', 'xml', 'html', or 'text'
            async: false,
            success: function(response) { 
                Lungo.Notification.success("Success","Logged in Successfully", "check", 3, goHome);
            },
            error: function(xhr, type) { 
                Lungo.Notification.error("Error","Login Error.  Plesae try again.", "cancel", 3);
            }
        });

    },
