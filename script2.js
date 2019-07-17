
document.body.onload = initLoad("data.json",);

function newHtmlActivity(name,filterName){
  var div = document.createElement('button');
  div.setAttribute("id", name);
  div.onclick=function(){
    onLoadData('data.json',filterName,name);
  };
  div.setAttribute("style", "color:red;width:100%;height:25px;");
  var text = document.createTextNode(name);
  div.appendChild(text);
  return div
}
function listbutton(listNameActivities,div){
  var allActivities = newHtmlActivity("all Activities","Task failed");
  allActivities.setAttribute("id", "false");
  div.appendChild(newHtmlActivity(false));
  listNameActivities.forEach(function(activity){
    div.appendChild(newHtmlActivity(activity));
  });
}
function initLoad(link){
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', link, true);
  req.onload  = function() {
     var dataset = JSON.parse(req.responseText);
     var datesSelected = listDateSelected(dataset);
     var listNames = listNameactivities(dataset,datesSelected);
     var currentDiv = document.getElementById("activities");
     listbutton(listNames,currentDiv);
  };
  req.send(null);
}
