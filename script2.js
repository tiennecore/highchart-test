/*
function requestAsync( url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.overrideMimeType("application/json");
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}
requestAsync('data.json')
    .then(function (e) {
        //var dataset = (e.target.response);
        //console.log(dataset.data);
    }, function (e) {
        console.log(e.target);
    });*/
dataset={
  "filter":"Task failed",
  "values":[
    {
      "date":"19-03-2019",
      "activity":"1"
    },{
      "date":"19-03-2019",
      "activity":"3"
    },{
      "date":"23-03-2019",
      "activity":"2"
    },{
      "date":"23-03-2019",
      "activity":"3"
    },{
      "date":"23-03-2019",
      "activity":"3"
    }
  ]
}


function newActivity(name){
  const activity = {
    name:"",
    description:"",
    countTmp:0,
    listdata:[]
  }; //Object.create(activityPropriety);
  activity.name = name;
  return activity;
}
function listDateSelected( datajson){
  var dates=[];
  datajson.values.forEach(function(element){
    if (!dates.includes(element.date)){
      dates.push(element.date);
    }
  });
  return dates;
}
function listNameactivities( datajson, dates){
  var NbActivity=[]
  datajson.values.forEach(function(e0){
    if (!NbActivity.includes(e0.activity)){
      NbActivity.push(e0.activity);
    }
  })
  return NbActivity;
}
function nbOfActivities(datajson, dates){
  var int = listNameactivities(datajson, dates);
  return int.length;
}

function newFilter( datajson,dates,name){
  const filter = {
    name:"",
    listActivity:[]
  };
  filter.name = name;
  var nbActivity = nbOfActivities(datajson, dates);
  var i = 0;
  var listNameactivity = listNameactivities( datajson, dates);
  for (;i<nbActivity;i++){
    filter.listActivity.push(newActivity(listNameactivity[i]));
  }
  dates.forEach(function(e0){
    console.log("jour de test :"+e0);
    datajson.values.forEach(function(e1){
      if(e0==e1.date){
        var findactivity = filter.listActivity.find(function (activity){
          return activity.name == e1.activity
        });
        findactivity.countTmp++;
      }
    });
    filter.listActivity.forEach(function(e4){
      //console.log("show count activity "+e4.name+" : "+ e4.countTmp);
      e4.listdata.push( e4.countTmp);
      e4.countTmp=0;
    });
  });
    console.log(filter);
  return filter;
}

var DatesSelected = listDateSelected(dataset);
const test =newFilter(dataset,DatesSelected,"Task failed");
