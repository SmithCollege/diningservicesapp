$('#verify').click(function() {
          var dh = $('input[name=dhall-choice]:checked').val();
          var ml = $('input[name=meal-option]:checked').val();
          var time = $('#dining-date').val();
          getMenu(ml,dh,time);
          });
      
      function getMenu(meal,diningHall,date){
        var text = '';
        $.getJSON("https://www.smith.edu/its/api/diningservices/dininghallmeal/"+meal+"/"+diningHall+"/"+date, function(data){
            $.each(data, function (index, value) {
              text = text.concat(value.item_text + '\n');
            
        });
            alert(text);
        });      
      }
      
      
      $('#getTime').click(function() {
          var dh = $('input[name=dhall-choice]:checked').val();
      var ml = $('input[name=meal-option]:checked').val();
      var date =new Date();
      getHours(ml,dh,day_to_number(date.getDay()));
      });
      
     
      
      function getHours(meal,diningHall, day){
        var text = '';
        $.getJSON("https://www.smith.edu/its/api/diningservices/dininghallhours/"+diningHall, function(data){
            $.each(data, function (index, value) {
              if (value.meal == meal  && $.inArray(day, value.days.split(',')) != -1) {
                alert(value.information);
              }
            
        });
        });      
      }
       function day_to_number(date)
      {
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