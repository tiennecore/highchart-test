function addActivitySelected(){
  var element=document.getElementById('selectedValues');
  if(FilterSelectedHtml.activities){
    element.appendChild(newActivitySelected(FilterSelectedHtml.activities[FilterSelectedHtml.activities.length-1],'activities'));
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
  }

  var divContain=document.createElement('div');
  divContain.setAttribute('class','item '+type+' Selected');
  divContain.setAttribute('id',type+text);
  divContain.appendChild(divtext);
  divContain.appendChild(divtrash);
  return divContain;
}
