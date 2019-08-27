mos=['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber']
mosname=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
daylist=['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']

function dateMosNameToDate(date){
  var dateValue=date.split("-");
  var indexValue = mosname.findIndex(function(mois){
  return (mois == dateValue[0])
  });
  indexValue++;

  if (indexValue<10){
    indexValue='0'+indexValue;
  }
  return indexValue+'-'+dateValue[1]+'-'+dateValue[2]
}
function dateDateToDateMosName(date){

  return mosname[parseInt(date.getMonth())]+'-'+date.getDate()+'-'+Date.getFullYear();
}

function initValMY(divCalendarValue,date,listDates){
  var tableMY=document.createElement('calendrierPeriodeSelection-'+divCalendarValue);
  tableMY.setAttribute('class','calendrierPeriodeSelection');
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
  var buttonLastMonth = document.createElement('img');
  buttonLastMonth.setAttribute('id','buttonLastMonth-'+divCalendarValue);
  buttonLastMonth.src='chevron-left.svg';
  buttonLastMonth.onclick=function(){
    lastMonth(divCalendarValue,date.getMonth(),date.getFullYear());
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
  monthElement.selectedIndex=date.getMonth();
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
  var listYears=initNbYear(listDates);
  listYears.forEach(function (year){
    var optionYear = document.createElement('option');
    optionYear.value=year;
    optionYear.label=year;
    yearElement.appendChild(optionYear);
  });

  yearElement.selectedIndex=0;
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
  var buttonNextMonth = document.createElement('img');
  buttonNextMonth.setAttribute('id','buttonNextMonth-'+divCalendarValue);
  buttonNextMonth.src='chevron-right.svg';
  buttonNextMonth.onclick=function(){
    nextMonth(divCalendarValue,date.getMonth(),date.getFullYear());
  }
  element4.appendChild(buttonNextMonth);
  line.appendChild(element4);

  tbody.appendChild(line);
  tableMY.appendChild(tbody);
  currentDiv.appendChild(tableMY);
}
function initNbYear(datesLimits){
  var years=[];
  datesLimits.forEach(function(date){
    years.push(date.getFullYear());
  });
  var listYears=[]
  for(years[0];years[0]<=years[1];years[0]++){
    listYears.push(years[0]);
  }
  return listYears;
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
        if(dayCount <= lastDay.getDate())
        {
          var element = document.createElement('td');
          var elementValue = document.createElement('span');
          element.setAttribute('class','calendarBlockDay ');
          element.setAttribute('id',new Date(year+'.'+month+'.'+dayCount));
          elementValue.textContent=dayCount;
          elementValue.style.font='12px/20px arial';
          elementValue.style.textAlign='center';
          element.style.height='auto';
          element.style.width='auto';
          element.style.padding='4px 7px';
          element.style.borderColor='#C0C0C0';
          element.onclick= function(){
            getVal(this.textContent,divCalendarValue,year,month);
            DatesSelected[divCalendarValue-1]=htmlToDate(document.getElementById('inputDate-'+divCalendarValue).value);
            document.getElementById('filterDateLabel-'+divCalendarValue).click();
            onLoadData('data.json',FilterSelected,FilterSelectedHtml,function(){
              editActivityFunction(document.getElementById("filterForm").value);
            });
            DatesSlider[divCalendarValue-1]=DatesSelected[divCalendarValue-1];
            slideReplaceValues();
            FilterSelectedHtml.dates[divCalendarValue-1]=mosname[DatesSlider[divCalendarValue-1].getMonth()]+'-'+DatesSlider[divCalendarValue-1].getDate()+'-'+DatesSlider[divCalendarValue-1].getFullYear();
            addDateSelected(FilterSelectedHtml.dates,divCalendarValue-1);
          };
          element.appendChild(elementValue);
          line.appendChild(element);
          dayCount++;
        }else{
          var element = document.createElement('td');
          element.style.backgroundColor='#e2e4e3';
          element.style.borderColor='#C0C0C0';
          line.appendChild(element);
        }

      }else{
        var element = document.createElement('td');
        element.style.backgroundColor='#e2e4e3';
        element.style.borderColor='#C0C0C0';
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
function getVal(e,divCalendarValue,year,monthValue){
   //lert(document.getElementById(e.id).value);
   day = e;
   var datepicker=document.getElementById('datepicker-'+divCalendarValue);
   datepicker.style.display = 'none';
   if (day<10){day="0"+day}

   if (!typeof monthValue=='int') {monthValue=parseInt(monthValue)}
   document.getElementById('inputDate-'+divCalendarValue).value = mosname[monthValue]+"-"+day+"-"+year ;
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
function buttonfiltre(calendarvalue){
  var datepicker=document.getElementById('datepicker-'+calendarvalue);
  var dateinput=document.getElementById('inputDate-'+calendarvalue);
  var begin = document.getElementById('filterDateLabel-'+calendarvalue);
  var icon= document.createElement('i');

  begin.onclick=function(){
    if(begin.value==0){
      dateinput.style.display='flex';
      begin.value=1;
      begin.removeChild(begin.children[0]);
      icon.setAttribute('class','fas fa-caret-down');
      begin.insertBefore(icon,begin.children[0]);
    }else{
      datepicker.style.display='none';
      dateinput.style.display='none';
      begin.value=0;
      begin.removeChild(begin.children[0]);
      icon.setAttribute('class','fas fa-caret-right');
      begin.insertBefore(icon,begin.children[0]);
    }
  }
  var end = document.getElementById('filterDateLabelBegin')
}
function init(date,calendarvalue,listDates){
  var datepicker=document.getElementById('datepicker-'+calendarvalue);
  var listMY= document.getElementById('selectionDate-'+calendarvalue);


  while (listMY.firstChild) {
      listMY.removeChild(listMY.firstChild);
  }

  var table= document.getElementById('calendar-'+calendarvalue);
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  initValMY(calendarvalue,date,listDates);
  getVal(date.getDate(),calendarvalue,date.getFullYear(),date.getMonth());
  document.getElementById(('inputDate-'+calendarvalue)).onclick=function(){
    datepicker.style.display = "block";
    getDays(date.getMonth(),calendarvalue,date.getFullYear());
  }
  buttonfiltre(calendarvalue);

}
function initNewFilter(divCalendarValue,year,month,listDates){
  var datepicker=document.getElementById('datepicker-'+divCalendarValue);

  var table= document.getElementById('calendar-'+divCalendarValue);
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  document.getElementById(('inputDate-'+divCalendarValue)).onclick=function(){
    datepicker.style.display = "block";
    getDays(month,divCalendarValue,year);
  }


}
