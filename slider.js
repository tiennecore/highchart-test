function mainslider(dateList){
  dateList.forEach(function (date,index){
    var newDate = date;
    if(index==0){
      newDate.setDate(newDate.getDate()-1);
      DatesSlider[index]=newDate;
    }else{
      newDate.setDate(newDate.getDate()+1);
      DatesSlider[index]=newDate;
    }
  });
  sliderMoove(DatesSlider);
}

function slideReplaceValues(list){
  list.forEach(function (date,index){


  });
  $( "#slider-range" ).slider({
    values:[list[0].getTime() / 1000,list[1].getTime() / 1000]
  });
}

function sliderMoove(list) {
  $( "#slider-range" ).slider({
    range: true,
    min: list[0].getTime() / 1000,
    max: list[1].getTime() / 1000,
    step: 86400,
    values: [ list[0].getTime() / 1000, list[1].getTime() / 1000 ],
    slide: function( event, ui ) {
      list.forEach(function (date,index){
        var dateselected=new Date(ui.values[index]*1000);
        getVal(dateselected.getDate(),index+1,dateselected.getFullYear(),dateselected.getMonth());
        date=dateselected;
        document.getElementById('filterDateLabel-'+(index+1)).click();
        FilterSelectedHtml.dates[index]=dateToString(date);
        addDateSelected(FilterSelectedHtml.dates,index);
        var labeldate=document.getElementById('labelslider'+index);
        labeldate.textContent=dateToString(date);
      });
      onLoadData('data.json',FilterSelected,FilterSelectedHtml,);
      $( "#amount" ).val( (new Date(ui.values[ 0 ] *1000).toDateString() ) + " - " + (new Date(ui.values[ 1 ] *1000)).toDateString() );
    }
  });
}
