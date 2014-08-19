$(document).on("pagebeforeshow","#diningpage",function (event, ui) {
            //set date to today
            setDate(); 
            //make sure dynamic list is empty to avoid doubled values
            $('#dh-choice').controlgroup("container").empty();
            //get dining halls and append to controlgroup
            getDiningHalls();
            //set height so everything fits screen
            setHeight();          
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
            //check if we have values in current session
            if (window.sessionStorage.length > 0){
                        //iterate through current session's storage 
                        for (var i = 0; i < window.sessionStorage.length; i++){
                                    //append radio buttons
                                    $('#dh-choice')
                                    .controlgroup("container")
                                    .append(sessionStorage.getItem(sessionStorage.key(i)));
                        }
                        $("input[type='radio']:first").attr("checked", "checked");//!!Selects the very first radio on the page
                        $("#dh-choice").trigger("create");//make sure control group is displayed updated     
            }
            else {//if storage is empty we get values from JSON, append them to CG and store in session storage
                        $.getJSON("https://www.smith.edu/its/api/diningservices/dininghalls", function(data){
                          $.each(data, function (index, value) {
                                    var $new = ('<input type="radio" name="dhall-choice" id="'+value.dining_hall_name
                                    +'" value="'+value.dining_hall_name
                                    +'"><label for="'+value.dining_hall_name+'">'
                                    +value.dining_hall_name+'</label>');
                            $('#dh-choice')
                            .controlgroup("container")
                            .append($new); //append radio button with DH id/name/value
                            window.sessionStorage.setItem(value.dining_hall_name,$new);
                        });
                        //select first radio button
                        $("input[type='radio']:first").attr("checked", "checked");//!!Selects the very first radio on the page
                        $("#dh-choice").trigger("create");//make sure control group is displayed updated
                        });
            }
}
          
function setHeight(){
            var div= $('#dining-halls');
            div.css("max-height", ($(window).height() - div.height())/2.5 + 'px'); //set dininghall scroll height to 1/3 to fit the screen
}  