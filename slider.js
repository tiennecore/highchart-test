function mainslider(dateList){
  dateList.forEach(function (date,index){
    var tmpDate = date.split('-');
    DatesSlider[index]=tmpDate[2]+'.'+tmpDate[0]+'.'+tmpDate[1];
    sliderMoove(DatesSlider);
  });
}

function slideReplaceValues(list){
  list.forEach(function (date,index){
    var tmpDate = date.split('-');
    DatesSlider[index]=tmpDate[2]+'.'+tmpDate[0]+'.'+tmpDate[1];
  });
  $( "#slider-range" ).slider({
    values:[new Date(DatesSlider[0]).getTime() / 1000,new Date(DatesSlider[1]).getTime() / 1000]
  });
}

function sliderMoove(list) {
  $( "#slider-range" ).slider({
    range: true,
    min: new Date(list[0]).getTime() / 1000,
    max: new Date(list[1]).getTime() / 1000,
    step: 86400,
    values: [ new Date(list[0]).getTime() / 1000, new Date(list[1]).getTime() / 1000 ],
    slide: function( event, ui ) {
      list.forEach(function (date,index){
        date=new Date(ui.values[index]*1000);
        getVal(date.getDate(),index+1,date.getFullYear(),date.getMonth());
        DatesSelected[index]=document.getElementById('inputDate-'+(index+1)).value;
        document.getElementById('filterDateLabel-'+(index+1)).click();
        if (DatesSelected[index]!=DateBeginEnds[index]){
          var validDate = DatesSelected[index].split('-');
          FilterSelectedHtml.dates[index]=mosname[parseInt(validDate[0])-1]+'-'+validDate[1]+'-'+validDate[2];
          addDateSelected(FilterSelectedHtml.dates,index);
        }
      });
      onLoadData('data.json',FilterSelected,FilterSelectedHtml,);
      $( "#amount" ).val( (new Date(ui.values[ 0 ] *1000).toDateString() ) + " - " + (new Date(ui.values[ 1 ] *1000)).toDateString() );
    }
  });
}
