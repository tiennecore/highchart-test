
var currPage = 0; //month
var Year ;
var day;
var date={
  'month':0,
  'day':12,
  'year':2019
}
var mos=['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber']
var daylist=['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']
function getVal(e,divCalendarValue){
   //lert(document.getElementById(e.id).value);
   day = e.defaultValue;
   var datepicker=document.getElementById('datepicker-'+divCalendarValue);
   datepicker.style.display = 'none';
   if (day<10){day="0"+day}
   if ((currPage + 1)<10){currPage="0"+(currPage+1)}
   document.getElementById('inputDate-'+divCalendarValue).value = currPage+"-"+day+"-"+Year ;
}
function initVal(date,divCalendarValue){
  Year=date.year;

  var currentDiv =document.getElementById('selectionDate-'+divCalendarValue);
  currentDiv.style.height='30px';
  var buttonLastMonth = document.createElement('button');
  buttonLastMonth.setAttribute('class','btn btn-default btn-xs');
  buttonLastMonth.style.maxHeight='26px';
  buttonLastMonth.style.backgroundColor='red';
  var icon = document.createElement('span');
  icon.setAttribute('class','glyphicon glyphicon-chevron-left');
  buttonLastMonth.appendChild(icon);
  buttonLastMonth.onclick=function(){
    lastMonth(divCalendar);
  }

  currentDiv.appendChild(buttonLastMonth);

  var month = document.createElement('p');
  month.setAttribute('id','monthValue');
  month.style.marginLeft='7px';
  month.style.marginRight='7px';
  var monthvalue = document.createTextNode(mos[date.month]);
  month.appendChild(monthvalue);

  currentDiv.appendChild(month);

  var buttonNextMonth = document.createElement('button');
  buttonNextMonth.setAttribute('class','btn btn-default btn-xs');
  buttonNextMonth.style.maxHeight='26px';
  buttonNextMonth.style.marginRight='7px';
  buttonNextMonth.style.backgroundColor='red';
  var icon = document.createElement('span');
  icon.setAttribute('class','glyphicon glyphicon-chevron-right');
  buttonNextMonth.appendChild(icon);
  buttonNextMonth.onclick=function(){
    nextMonth(divCalendar);
  }

  currentDiv.appendChild(buttonNextMonth);

  var buttonLastYear = document.createElement('button');
  buttonLastYear.setAttribute('class','btn btn-default btn-xs');
  buttonLastYear.style.maxHeight='26px';
  buttonLastYear.style.backgroundColor='red';
  var icon = document.createElement('span');
  icon.setAttribute('class','glyphicon glyphicon-chevron-left');
  buttonLastYear.appendChild(icon);
  buttonLastYear.onclick=function(){
    lastyear(divCalendar);
  }

  currentDiv.appendChild(buttonLastYear);

  var yearhtml = document.createElement('p');
  yearhtml.setAttribute('id','yearValue');
  yearhtml.style.marginLeft='7px';
  yearhtml.style.marginRight='7px';
  var yearValue = document.createTextNode(Year);
  yearhtml.appendChild(yearValue);

  currentDiv.appendChild(yearhtml);

  var buttonNextYear = document.createElement('button');
  buttonNextYear.setAttribute('class','btn btn-default btn-xs');
  buttonNextYear.style.maxHeight='26px';
  buttonNextYear.style.backgroundColor='red';
  var icon = document.createElement('span');
  icon.setAttribute('class','glyphicon glyphicon-chevron-right');
  buttonNextYear.appendChild(icon);
  buttonNextYear.onclick=function(){
    nextYear(divCalendar);
  }

  currentDiv.appendChild(buttonNextYear);
}
function weekCalendar(days,divCalendarValue){
  var currentDiv =  document.getElementById('calendar-'+divCalendarValue);
  var headTable = document.createElement('thead');
  var line = document.createElement('tr');
  days.forEach(function (dayValue){
    var elementTable=document.createElement('th');
    elementTable.setAttribute('id','dt-head');
    elementTable.appendChild((document.createTextNode(dayValue)));
    line.appendChild(elementTable);
  });
  headTable.appendChild(line);
  currentDiv.appendChild(headTable);
}
function calendar(month,divCalendarValue){
  var currentDiv =  document.getElementById('calendar-'+divCalendarValue);
  var bodyTable = document.createElement('tbody');
  var firstDay = new Date(Year,month, 1);
  var lastDay = new Date(Year, month+1, 0);
  var offset = firstDay.getDay();
  var dayCount = 1;
  for (var i = 0; i < 5; i++){
    var line = document.createElement('tr');
    line.setAttribute('id',i);
    for(rw = 0; rw < 7; rw++ ){
      if (offset==0){
        var element = document.createElement('td');
        var elementValue = document.createElement('input');
        elementValue.setAttribute('class','btn btn-outline-primary');
        elementValue.setAttribute('type','button');
        elementValue.setAttribute('value',dayCount);
        elementValue.style.height='26px';
        elementValue.style.paddingTop='0px';
        elementValue.style.paddingBottom='0px';
        elementValue.style.paddingLeft='2px';
        elementValue.style.textAlign='center';
        elementValue.style.width='26px';
        elementValue.onclick= function(){(getVal(this,divCalendarValue))};
        element.appendChild(elementValue);
        line.appendChild(element);
        if(dayCount >= lastDay.getDate())
        {
          break;
        }
        dayCount++;
      }else{
        var element = document.createElement('td');
        line.appendChild(element);
        offset--;
      }
    }
    bodyTable.appendChild(line);
  }
  currentDiv.appendChild(bodyTable);
}
function getDays(month,divCalendarValue){
  var table= document.getElementById('calendar-'+divCalendarValue);
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  weekCalendar(daylist,divCalendarValue);
  calendar(month,divCalendarValue);

}
function nextMonth(divCalendar){
  if(currPage < 11){
    currPage =  currPage+1;
    getDays(currPage,divCalendar);
  }
  if(currPage == 11){
    currPage=0;
    nextYear(divCalendar);
  }
  document.getElementById("monthValue").innerHTML=mos[currPage];
}
function lastMonth(divCalendar){
  if(currPage > 0){
    currPage =  currPage-1;
    getDays(currPage,divCalendar);
  }
  if(currPage==0){
    currPage = 11;
    lastyear(divCalendar);
  }
  document.getElementById("monthValue").innerHTML=mos[currPage];
}
function nextYear(divCalendar){
  Year++;
  document.getElementById("yearValue").innerHTML=Year;
  getDays(currPage,divCalendar);
}
function lastyear(divCalendar){
  Year--;
  document.getElementById("yearValue").innerHTML=Year;
  getDays(currPage,divCalendar);
}
function init(calendarvalue){
  var datepicker=document.getElementById('datepicker-'+calendarvalue);
  var column=document.getElementById(('columnDate-'+calendarvalue));
  initVal(date,calendarvalue);
  var pistache = document.getElementById(('inputDate-'+calendarvalue));
  document.getElementById(('inputDate-'+calendarvalue)).onclick=function(){
    datepicker.style.display = "block";
    getDays(date.month,(calendarvalue));
  }
}

init(1);
init(2);
