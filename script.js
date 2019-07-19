var FilterDataSelected={};
var FilterSelected="";
var ListNames=[];
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
  datajson.data.forEach(function(element){
    if (!dates.includes(element.date)){
      dates.push((element.date));
    }
  });
  return dates;
}
function listNameactivities( datajson, dates){
  var NbActivity=[]
  datajson.data.forEach(function(e0){
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
    //console.log("jour de test :"+e0);
    datajson.data.forEach(function(e1){
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
    //console.log(filter);
  return filter;
}
function dataToConf(filter){
  var listconf=[];
  filter.listActivity.forEach(function (activity){
    const proto={name:'',data:[]};
    proto.name=activity.name;
    proto.data=activity.listdata;
    listconf.push(proto);
  });
  return listconf;
}
function setGraph(filter,dates){
  var Conf= dataToConf(filter);
  var myChart = Highcharts.chart('graph', {
    chart: {
      type: 'column'
    },
    title: {
      text: filter.name
    },
    xAxis: {
      categories: dates
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      },
      series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function(){
                      resultOnClickGraph(this.category,this.y,this.stackTotal,filter.name);
                    }
                }
            }
        }
    },
    series: Conf
  });
}
function selectActivity(filter,dates,name){
  var findActiviy = filter.listActivity.find(function (activity){
    return activity.name == name
  });
  var index=0;
  var listIndex=[]
  findActiviy.listdata.forEach(function(element){
    if (element == 0){
      listIndex.unshift(index);
    }
  index++;
  });
  listIndex.forEach(function(element){
    findActiviy.listdata.splice(element,1);
    dates.splice(element,1);

  });
  filter.listActivity = filter.listActivity.filter(function(element){
    return element == findActiviy
  });
}
function createText(text){
  var element = document.createElement("p");
  var node = document.createTextNode(text);
  element.appendChild(node);
  return element;
}
function resultOnClickGraph(date,nbTask,totalTask,filterName){
  var currentDiv = document.getElementById("graphInfo");
  while (currentDiv.firstChild) {
      currentDiv.removeChild(currentDiv.firstChild);
  }
  //divText = document.createElement("p");
  //var nextLine=  document.createElement("br");
  //var text = document.createTextNode(name);
  currentDiv.appendChild(createText(("Date : "+date)));
  currentDiv.appendChild(createText((filterName+" : "+nbTask)));
  currentDiv.appendChild(createText(("Total of "+filterName+" : "+date)));
}
function selectFilter(dataset,filterName){
  return dataset.studyRisk.find( filter => filter.name==filterName);
}
function editActivityFunction (filterName){
  var currentDiv = document.getElementById("activities");
  while (currentDiv.firstChild) {
      currentDiv.removeChild(currentDiv.firstChild);
  }
  listbutton(ListNames,currentDiv,FilterDataSelected.name);
  currentDiv.childNodes.forEach(function (activity){
    activity.onclick=function(){
      onLoadData('data.json',filterName,activity.id,)
    }
  });
}

function onLoadData(link,filtername,activityName,callback){
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', link, true);
  req.onload  = function() {
     var dataset = JSON.parse(req.responseText);
     FilterDataSelected=selectFilter(dataset,filtername)
     var DatesSelected = listDateSelected(FilterDataSelected);
     var date = stringToDate(DatesSelected[0]);
     dateToString(date);
     ListNames = listNameactivities(FilterDataSelected,DatesSelected);
     const Filter = newFilter(FilterDataSelected,DatesSelected,filtername);
     if(activityName!="false"){
       selectActivity(Filter,DatesSelected,activityName);
     }
     setGraph(Filter,DatesSelected);
     if (callback) callback();
  };
  req.send(null);
}

function stringToDate(value){
  var dateList = value.split("-");
  return new Date(dateList[2],dateList[1],dateList[0]);
}
function dateToString(date){
  return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getYear();
}
