

function newHtmlActivity(name,filterName){
  var div = document.createElement('button');
  div.setAttribute("class","btn btn-light")
  div.setAttribute("id", name);
  div.onclick=function(){
    onLoadData('data.json',filterName,name,);
  };
  div.setAttribute("style", "width:100%;height:5vh;");
  var text = document.createTextNode(name);
  div.appendChild(text);
  return div
}
function listbutton(listNameActivities,div,filterName){
  var allActivities = document.createElement('button');
  allActivities.setAttribute("id", "false");
  allActivities.onclick=function(){
    onLoadData('data.json',filterName,"false",);
  };
  allActivities.setAttribute("class","btn btn-light")
  allActivities.setAttribute("style", "width:100%;height:5vh;");
  var activityText = document.createTextNode("All Activities");
  allActivities.appendChild(activityText);
  div.appendChild(allActivities);
  listNameActivities.forEach(function(activity){
    div.appendChild(newHtmlActivity(activity,filterName));
  });
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
    onLoadData('data.json',document.getElementById("filterForm").value,"false",function(){
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
     listbutton(ListNames,currentDiv,FilterDataSelected.name);
     onLoadData('data.json',FilterDataSelected.name,"false",);
  };
  req.send(null);
}
