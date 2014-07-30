$(document).ready(function () {
            setDate();
            getDiningHalls();
            var div= $('#dh-choice'); 
            div.css("height", ($(window).height() - div.height())/3  + 'px'); //set dininghall scroll height to 1/3 to fit the screen
        });

        function setDate() {
            //sets date picker to current day on page startup
            var date = new Date();
    
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            
            var today = year + "-" + month + "-" + day;       
            document.getElementById("dining-date").value = today;    
          }
          
          function getDiningHalls(){
            //inflates control group with values from JSON
            $.getJSON("https://www.smith.edu/its/api/diningservices/dininghalls", function(data){
              $.each(data, function (index, value) {
                $('#dh-choice')
                .controlgroup("container")
                .append('<input type="radio" name="dhall-choice" id="'+value.dining_hall_name
                        +'" value="'+value.dining_hall_name
                        +'"><label for="'+value.dining_hall_name+'">'
                        +value.dining_hall_name+'</label>'); //append radio button with DH id/name/value
              });
              $("#dh-choice")
              .enhanceWithin()
              .controlgroup("refresh");  //make sure controul group is displayed updated
            });
          }