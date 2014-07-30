$('#get-menu').click(function() {
          var dhall = $('input[name=dhall-choice]:checked').val();//get name of DH
          var meal = $('input[name=meal-option]:checked').val(); // get meal
          var date = $('#dining-date').val(); //get date
          getMenu(meal,dhall,date);
});
      
function getMenu(meal,diningHall,date){
          //Takes meal, dining hall name and date. Shows menu as popup
          var text = '';
          $.getJSON("https://www.smith.edu/its/api/diningservices/dininghallmeal/"+meal+"/"+diningHall+"/"+date, function(data){
                    $.each(data, function (index, value) {
                              text = text.concat(value.item_text + '\n');
            
                    });
                    alert(text);//use alert for debugging
          });
}
      
      
$('#get-time').click(function() {
          var dh = $('input[name=dhall-choice]:checked').val();
          var ml = $('input[name=meal-option]:checked').val();
          var date = new Date(); //object to get day number
          getHours(ml,dh,getDayNumber(date.getDay()));
});
      
     
      
function getHours(meal,diningHall, day){
          var text = ''; //initialize ouput message
          $.getJSON("https://www.smith.edu/its/api/diningservices/dininghallhours/"+diningHall, function(data){
                    $.each(data, function (index, value) {//chek for meal and day in each entry
                              if (value.meal == meal && $.inArray(day, value.days.split(',')) != -1) {
                                        alert(value.information);//use alert for debugging
                              }
            
                    });
        });      
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