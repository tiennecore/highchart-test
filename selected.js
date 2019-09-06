//selected activity
function addActivitySelected(){
  var element=document.getElementById('selectedValues');
  selectedvalue();
  if(FilterSelectedHtml.activities){
    element.insertAdjacentElement('afterend',newActivitySelected(FilterSelectedHtml.activities[FilterSelectedHtml.activities.length-1],'activities'));
  }

}
function newActivitySelected(text,type){
  var divtext=document.createElement('div');

  var iconText=document.createElement('i');
  iconText.setAttribute('class','fas fa-filter');

  var newValue=document.createElement('span');
  newValue.textContent='Activity/ '+text;

  divtext.appendChild(iconText);
  divtext.appendChild(newValue);

  var divtrash= document.createElement('div');

  var trashIcon=document.createElement('i');
  trashIcon.setAttribute('class','fas fa-trash-alt');

  divtrash.appendChild(trashIcon);
  divtrash.onclick=function(){
    if (type=='activities'){
       var newListActivities = FilterSelectedHtml.activities.filter(activity => activity != text);
       FilterSelectedHtml.activities=newListActivities;
    }

    onLoadData('data.json',FilterSelected,FilterSelectedHtml,function(){
      editActivityFunction(document.getElementById("filterForm").value);
    });
    var divselec=document.getElementById(type+text);
    divselec.parentNode.removeChild(divselec);
    selectedvalue();
  }

  var divContain=document.createElement('div');
  divContain.setAttribute('class','item Selected');
  divContain.setAttribute('id',type+text);
  divContain.appendChild(divtext);
  divContain.appendChild(divtrash);
  return divContain;
}

//filter activity selectedName

function addActivityToFilter(){
  var listActivity=[];
  FilterSelectedHtml.activities.forEach(function(name){
    Filter.listActivity.find(function(activity){
      if(activity.name == name ){
        listActivity.push(activity);
      }
    });
  });
  Filter.listActivity=listActivity;
}

//selected dates
function addDateSelected(list,indexlist){
  if (dateMosNameToDate(list[indexlist])!=DateBeginEnds[indexlist]){
    selectedvalue();
    var divtext=document.createElement('div');

    var iconText=document.createElement('i');
    iconText.setAttribute('class','far fa-calendar-alt');

    var newValue=document.createElement('span');
    if (indexlist==0){newValue.textContent='Date Begin / '+list[indexlist];}
    else{ newValue.textContent='Date Ends / '+list[indexlist];}

    divtext.appendChild(iconText);
    divtext.appendChild(newValue);

    var divtrash= document.createElement('div');

    var trashIcon=document.createElement('i');
    trashIcon.setAttribute('class','fas fa-trash-alt');

    divtrash.appendChild(trashIcon);
    divtrash.onclick=function(){
      DatesSelected[indexlist]=DateBeginEnds[indexlist];
      getVal(DatesSelected[indexlist].getDate(),indexlist+1,DatesSelected[indexlist].getFullYear(),DatesSelected[indexlist].getMonth());
      FilterSelectedHtml.dates[indexlist]='';
      onLoadData('data.json',FilterSelected,FilterSelectedHtml,);
      slideReplaceValues();
      var divselec=document.getElementById('Calendar'+indexlist);
      divselec.parentNode.removeChild(divselec);
      selectedvalue();
    }

    var divContain=document.createElement('div');
    divContain.setAttribute('class','item Selected '+indexlist);
    divContain.setAttribute('id','Calendar'+indexlist);
    divContain.appendChild(divtext);
    divContain.appendChild(divtrash);
    var exitingCalendar = document.getElementById('Calendar'+indexlist);
    if(exitingCalendar){
      exitingCalendar.parentNode.removeChild(exitingCalendar);
    }
    var element=document.getElementById('selectedValues');
    element.insertAdjacentElement('afterend',divContain)

  }
}

//supress allActivities
function emptyAll(){
  FilterSelectedHtml.activities.forEach(function(element){
    var divselec=document.getElementById('activities'+element);
    divselec.parentNode.removeChild(divselec);
  });
  FilterSelectedHtml.dates.forEach(function(element,index){
    var divselec=document.getElementById('Calendar'+index);
    divselec.parentNode.removeChild(divselec);
  });
  FilterSelectedHtml={
    'activities':[],
    'dates':[]
  };
  selectedvalue();
  ListDates=[];
  onLoadData('data.json',FilterSelected,FilterSelectedHtml,function(){
    editActivityFunction(document.getElementById("filterForm").value);
  });
}

function selectedvalue(){
  var divselected=document.getElementById('selectedValues');

  if (FilterSelectedHtml.activities.length>0 || FilterSelectedHtml.dates.some(date => date!='')){
    divselected.style.display='flex';
  }else{
    divselected.style.display='none';
  }
}
