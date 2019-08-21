

  function newHtmlActivity(name,filterName){

  var elementList = document.createElement('span');
  elementList.setAttribute("id", name);
  elementList.setAttribute("class", 'filter activity value');
  var findvalue=FilterSelectedHtml.activities.find(function (activity){
    return activity == name;
  });
  if(findvalue){
    elementList.style.color='#368ec4';
  }else{
    elementList.onclick=function(){
      FilterSelectedHtml.activities.push(name);
      addActivitySelected();
      onLoadData('data.json',filterName,FilterSelectedHtml,);
    };
  }
  elementList.textContent =name;
  return elementList;
}
function listbutton(listNameActivities,div,filterName,value){
  var containerdiv= document.createElement('div');
  containerdiv.setAttribute('value',value);
  containerdiv.setAttribute('class','filter contain value');
  containerdiv.setAttribute('id','filterContainerValue');
  var icon= document.createElement('i');
  var allActivities = document.getElementById('menuFilterLabel');
  if(containerdiv.value==0){
    containerdiv.style.display='none';
    allActivities.removeChild(allActivities.children[0]);
    icon.setAttribute('class','fas fa-caret-right');
    allActivities.insertBefore(icon,allActivities.children[0]);
    containerdiv.value=0;
  }else{
    containerdiv.style.display='flex';
    containerdiv.value=1;
    allActivities.removeChild(allActivities.children[0]);
    icon.setAttribute('class','fas fa-caret-down');
    allActivities.insertBefore(icon,allActivities.children[0]);
  }
  allActivities.onclick=function(){
    if(containerdiv.value==0){
      containerdiv.style.display='flex';
      containerdiv.value=1;
      allActivities.removeChild(allActivities.children[0]);
      icon.setAttribute('class','fas fa-caret-down');
      allActivities.insertBefore(icon,allActivities.children[0]);
    }else{
      containerdiv.style.display='none';
      allActivities.removeChild(allActivities.children[0]);
      icon.setAttribute('class','fas fa-caret-right');
      allActivities.insertBefore(icon,allActivities.children[0]);
      containerdiv.value=0;
    }
  };

  listNameActivities.forEach(function(activity){
    containerdiv.appendChild(newHtmlActivity(activity,filterName));
  });
  div.appendChild(containerdiv);
}
function initFormFilter(dataset){
  var currentDiv = document.getElementById("filterForm");
  dataset.studyRisk.forEach(function (filter) {
    var optionDiv = document.createElement('option');
    optionDiv.setAttribute("id",filter.name);
    var optionText = document.createTextNode(filter.name);
    optionDiv.appendChild(optionText);
    currentDiv.appendChild(optionDiv);
  });
  currentDiv.onchange=function(){
    onLoadData('data.json',document.getElementById("filterForm").value,[],function(){
      editActivityFunction(document.getElementById("filterForm").value);
    });
  };

}

function initLoad(link){
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', link, true);
  req.onload  = function() {
     var dataset = JSON.parse(req.responseText);
     initFormFilter(dataset);
     var firstFilter = document.getElementById("filterForm");
     FilterDataSelected = selectFilter(dataset,(document.getElementById("filterForm")).firstChild.nextSibling.id);
     var datesSelected = listDateSelected(FilterDataSelected);
     ListNames = listNameactivities(FilterDataSelected,datesSelected);
     var currentDiv = document.getElementById("activities");
     listbutton(ListNames,currentDiv,FilterDataSelected.name,0);
     document.getElementById('deleteAllSelected').onclick=function(){
       emptyAll();
     }
     onLoadData('data.json',FilterDataSelected.name,[],);
  };
  req.send(null);
}
