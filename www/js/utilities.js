function networkAvailable(){
                var networkState = navigator.connection.type;
                var states = {};
                //can limit the number of available connections
                states[Connection.UNKNOWN]  = true;
                states[Connection.ETHERNET] = true;
                states[Connection.WIFI]     = true;
                states[Connection.CELL_2G]  = true;
                states[Connection.CELL_3G]  = true;
                states[Connection.CELL_4G]  = true;
                states[Connection.CELL]     = true;
                states[Connection.NONE]     = false;
                
                return states[networkState];
           }