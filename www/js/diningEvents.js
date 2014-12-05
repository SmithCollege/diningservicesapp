$(document).on('change', '[type="radio"]', function(){
          //makes sure that virtual keyboard is hidden when radio button(dining hall) is selected
          document.activeElement.blur();
          $("#dh-choice").blur();
    });    

$(document).on('click', '#get-menu', function(e){
          //triggers when user clicks 'get menu'
          var dhall = $('input[name=dhall-choice]:checked').val();//get name of DH
          var meal = $('input[name=meal-option]:checked').val(); // get meal
          var date = $('#dining-date').val(); //get date
          getMenu(meal,dhall,date);
});

$(document).on('click', '#get-time', function(e){
           //triggers when user clicks 'get hours'
          var dh = $('input[name=dhall-choice]:checked').val();
          var ml = $('input[name=meal-option]:checked').val();
          var date = new Date(); //object to get day number
          getHours(ml,dh,getDayNumber(date.getDay()));
});

      
function getMenu(meal,diningHall,date){
          //Takes meal, dining hall name and date. Shows menu as popup
          if (window.sessionStorage.getItem(meal+diningHall+date) != null) {//DH and meal pair to distinguish menus
                    //alert("cached");
                    showMessage(window.sessionStorage.getItem(meal+diningHall+date));                  
          }
          else {
                    var text = '';
                    $.getJSON("https://www.smith.edu/its/api/diningservices/dininghallmeal/"+meal+"/"+diningHall+"/"+date, function(data){
                             if (data.length != 0) {
                                        $.each(data, function (index, value) {
                                                  text = text.concat(value.item_text + '\n');
                                        });
                                        text = text.replace('</br>','');
                                        window.sessionStorage.setItem(meal+diningHall+date,text);
                                        showMessage(text);
                              }
                              else{
                                  window.plugins.toast.show('No menu available', 'short', 'bottom');   //notify user   
                              }
                    });
          }
}

function getHours(meal,diningHall, day){
          if (window.sessionStorage.getItem(meal+diningHall+day) != null) {//meal + dh pair to distinguish menus
                    //alert("cached");
                    showMessage(window.sessionStorage.getItem(meal+diningHall+day));                  
          }
          else {
                    var text = ''; //initialize ouput message
                    $.getJSON("https://www.smith.edu/its/api/diningservices/dininghallhours/"+diningHall, function(data){
                              if (data.length != 0){
                                        $.each(data, function (index, value) {//chek for meal and day in each entry
                                                  if (value.meal == meal && $.inArray(day, value.days.split(',')) != -1) {
                                                            text = value.information;
                                                            text = text.replace(/<(?:.|\n)*?>/gm, ' ');//stripping html tags
                                                            window.sessionStorage.setItem(meal+diningHall+day,text);
                                                            showMessage(text);
                                                  }
                                        });
                              }
                              else{
                                  window.plugins.toast.show('No data available', 'short', 'bottom');
                              }
                  });
          }
}

function alertDismissed() {
    // do nothing
}

function showMessage(message){
          //notifies user via alert-like popup with passed message
          navigator.notification.alert(
                                       message,  // message to show
                                       alertDismissed,         // callback
                                       'Menu',            // title
                                       'Ok'                  // buttonName
          );
}

function getDayNumber(date) {
          //getDay() returns days where Sunday is 0
          //Smith JSON uses 1-7 for Monday-Sunday
          var weekday=new Array(7);
          weekday[0]="7";
          weekday[1]="1";
          weekday[2]="2";
          weekday[3]="3";
          weekday[4]="4";
          weekday[5]="5";
          weekday[6]="6";
          
          return weekday[date];
}