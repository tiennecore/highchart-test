mos=['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber']
daylist=['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']
function getVal(e,divCalendarValue,year,monthValue){
   //lert(document.getElementById(e.id).value);
   day = e.defaultValue;
   var datepicker=document.getElementById('datepicker-'+divCalendarValue);
   datepicker.style.display = 'none';
   if (day<10){day="0"+day}
   if ((monthValue + 1)<10){monthValue='0'+(monthValue+1)}
   document.getElementById('inputDate-'+divCalendarValue).value = monthValue+"-"+day+"-"+year ;
}
function initValMY(divCalendarValue,year,month){
  if(month<10 && typeof month == "string"){
    var monthValue=month.split('0');
  }else {
    var monthValue=['',month]
  }

  var tableMY=document.createElement('calendrierPeriodeSelection-'+divCalendarValue);
  tableMY.cellspacing="0";
  tableMY.cellpadding="5";
  tableMY.border="0";
  var tbody=document.createElement('tbody');
  var line= document.createElement('tr');



  var currentDiv =document.getElementById('selectionDate-'+divCalendarValue);
  currentDiv.style.height='30px';

  //button lastmonth
  var element1= document.createElement('td');
  element1.setAttribute('valign','middle');
  element1.setAttribute('align','center');
  var buttonLastMonth = document.createElement('button');
  buttonLastMonth.setAttribute('id','buttonLastMonth-'+divCalendarValue);
  buttonLastMonth.style.Height='20px';
  buttonLastMonth.style.Width='20px';
  buttonLastMonth.style.backgroundColor='red';
  var icon = document.createElement('span');
  icon.setAttribute('class','glyphicon glyphicon-chevron-left');
  buttonLastMonth.appendChild(icon);
  buttonLastMonth.onclick=function(){
    lastMonth(divCalendarValue,monthValue[1],year);
  }
  element1.appendChild(buttonLastMonth);
  line.appendChild(element1);

  // select monthValue
  var element2= document.createElement('td');
  element2.setAttribute('valign','middle');
  element2.setAttribute('align','center');
  var monthElement = document.createElement('select');
  monthElement.setAttribute('id','monthValue-'+divCalendarValue);
  monthElement.setAttribute('class','form-control input-sm input-very-sm');
  var int = 0;
  mos.forEach(function (mois){
    var optionMonth = document.createElement('option');
    optionMonth.value=int;
    int++;
    optionMonth.label=mois;
    monthElement.appendChild(optionMonth);
  });
  monthElement.selectedIndex=monthValue[1]-1;
  monthElement.onchange=function (){
    var newYearValue=document.getElementById('yearValue-'+divCalendarValue);
    thisMonth(divCalendarValue,this.selectedIndex,newYearValue);
  }
  element2.appendChild(monthElement);
  line.appendChild(element2);

  //select year
  var element3= document.createElement('td');
  element3.setAttribute('valign','middle');
  element3.setAttribute('align','center');
  var yearElement = document.createElement('select');
  yearElement.setAttribute('id','yearValue-'+divCalendarValue);
  yearElement.setAttribute('class','form-control input-sm input-very-sm');
  // à modifier sur la liste de de date max
  for(i=5;i!=0;i--){
    var optionYear = document.createElement('option');
    optionYear.value=year-i;
    optionYear.label=year-i;
    yearElement.appendChild(optionYear);
  }
  for(i=0;i<6;i++){
    var optionYear = document.createElement('option');
    optionYear.value=parseInt(year)+i;
    optionYear.label=parseInt(year)+i;
    yearElement.appendChild(optionYear);
  }
  yearElement.selectedIndex=5;
  yearElement.onchange=function (){
    var newmonthValue=document.getElementById('monthValue-'+divCalendarValue).selectedIndex;
    thisYear(divCalendarValue,newmonthValue,this);
  }
  element3.appendChild(yearElement);
  line.appendChild(element3);

  //button nextmonth
  var element4= document.createElement('td');
  element4.setAttribute('valign','middle');
  element4.setAttribute('align','center');
  var buttonNextMonth = document.createElement('button');
  buttonNextMonth.setAttribute('id','buttonNextMonth-'+divCalendarValue);
  buttonNextMonth.style.Height='20px';
  buttonNextMonth.style.Width='20px';
  buttonNextMonth.style.marginRight='7px';
  buttonNextMonth.style.backgroundColor='red';
  var icon = document.createElement('span');
  icon.setAttribute('class','glyphicon glyphicon-chevron-right');
  buttonNextMonth.appendChild(icon);
  buttonNextMonth.onclick=function(){
    nextMonth(divCalendarValue,monthValue[1],year);
  }
  element4.appendChild(buttonNextMonth);
  line.appendChild(element4);

  tbody.appendChild(line);
  tableMY.appendChild(tbody);
  currentDiv.appendChild(tableMY);
}
function editButton(button,callback){
  document.getElementById(button).onclick=function(){
    if (callback) callback();
  }
}
function weekCalendar(divCalendarValue){
  var currentDiv =  document.getElementById('calendar-'+divCalendarValue);
  var headTable = document.createElement('thead');
  var line = document.createElement('tr');
  daylist.forEach(function (dayValue){
    var elementTable=document.createElement('th');
    elementTable.setAttribute('id','dt-head');
    elementTable.appendChild((document.createTextNode(dayValue)));
    line.appendChild(elementTable);
  });
  headTable.appendChild(line);
  currentDiv.appendChild(headTable);
}
function calendar(month,divCalendarValue,year){
  var currentDiv =  document.getElementById('calendar-'+divCalendarValue);
  var bodyTable = document.createElement('tbody');
  var firstDay = new Date(year,month, 1);
  var lastDay = new Date(year, month+1, 0);
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
        elementValue.onclick= function(){
          getVal(this,divCalendarValue,year,month);
          DatesSelected[divCalendarValue-1]=document.getElementById('inputDate-'+divCalendarValue).value;
          onLoadData('data.json',FilterSelected,ActivityName,)
        };
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
function getDays(month,divCalendarValue,year){
  var table= document.getElementById('calendar-'+divCalendarValue);
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  weekCalendar(divCalendarValue);
  calendar(month,divCalendarValue,year);

}
function nextMonth(divCalendar,monthValue,year){
  if(monthValue < 11){
    monthValue =  parseInt(monthValue)+1;
    getDays(monthValue,divCalendar,year);
  }
  else {
    nextYear(divCalendar,monthValue,year);
    monthValue=0;
  }
  editButton(('buttonLastMonth-'+divCalendar),function(){
    lastMonth(divCalendar,monthValue,year);
  });
  editButton(('buttonNextMonth-'+divCalendar),function(){
    nextMonth(divCalendar,monthValue,year);
  });
  document.getElementById("monthValue-"+divCalendar).selectedIndex=monthValue-1;
}
function lastMonth(divCalendar,monthValue,year){
  if(monthValue > 0){
    monthValue =  parseInt(monthValue)-1;
    getDays(monthValue,divCalendar,year);
  }
  else{
    lastyear(divCalendar,monthValue,year);
    monthValue = 11;
  }
  editButton(('buttonLastMonth-'+divCalendar),function(){
    lastMonth(divCalendar,monthValue,year);
  });
  editButton(('buttonNextMonth-'+divCalendar),function(){
    nextMonth(divCalendar,monthValue,year);
  });
  document.getElementById("monthValue-"+divCalendar).selectedIndex=monthValue-1;
}
function nextYear(divCalendar,monthValue,year){
  year++;
  document.getElementById("yearValue-"+divCalendar).selectedIndex=document.getElementById("yearValue-"+divCalendar).selectedIndex+1;
  getDays(monthValue,divCalendar,year);
}
function lastyear(divCalendar,monthValue,year){
  year--;
  document.getElementById("yearValue-"+divCalendar).selectedIndex=document.getElementById("yearValue-"+divCalendar).selectedIndex-1;
  getDays(monthValue,divCalendar,year);
}
function thisYear(divCalendar,monthValue,year){
  getDays(monthValue,divCalendar,year.value);
}
function thisMonth(divCalendar,monthValue,year){

  monthValue =  parseInt(monthValue);
  getDays(monthValue,divCalendar,year.value);
  editButton(('buttonLastMonth-'+divCalendar),function(){
    lastMonth(divCalendar,monthValue,year.value);
  });
  editButton(('buttonNextMonth-'+divCalendar),function(){
    nextMonth(divCalendar,monthValue,year.value);
  });
  document.getElementById("monthValue-"+divCalendar).selectedIndex=monthValue;
}
function init(dayinit,calendarvalue,year,month){
  var datepicker=document.getElementById('datepicker-'+calendarvalue);
  var listMY= document.getElementById('selectionDate-'+calendarvalue);
  while (listMY.firstChild) {
      listMY.removeChild(listMY.firstChild);
  }

  var table= document.getElementById('calendar-'+calendarvalue);
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  initValMY(calendarvalue,year,month);
  var elementValue = document.createElement('input');
  elementValue.setAttribute('value',dayinit);
  getVal(elementValue,calendarvalue,year,month);
  document.getElementById(('inputDate-'+calendarvalue)).onclick=function(){
    datepicker.style.display = "block";
    getDays(month,calendarvalue,year);
  }

}
function initNewFilter(divCalendarValue,year,month){
  var datepicker=document.getElementById('datepicker-'+divCalendarValue);
  var listMY= document.getElementById('selectionDate-'+divCalendarValue);
  while (listMY.firstChild) {
      listMY.removeChild(listMY.firstChild);
  }

  var table= document.getElementById('calendar-'+divCalendarValue);
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  initValMY(divCalendarValue,year,month);
  document.getElementById(('inputDate-'+divCalendarValue)).onclick=function(){
    datepicker.style.display = "block";
    getDays(month,divCalendarValue,year);
  }


}
