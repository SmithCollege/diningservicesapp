function reachableCallback(reachability) {
        // There is no consistency on the format of reachability
        var networkState = reachability.code || reachability;

        var states = {};
        states[NetworkStatus.NOT_REACHABLE]                      = false;
        states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = true;
        states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = true;

       return states[networkState];
    }
    
    //$.getScript("my_lovely_script.js", function(){

   //alert("Script loaded and executed.");
   // Here you can use anything you defined in the loaded script
//});