//variable globale
FilterDataSelected={};
FilterSelected="";
ListNames=[];
ListDates=[];
DatesSelected=['','']
DateBegin='';
DateEnds='';
ActivityName='';
//création des objets
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
  var listActivity=[]
  datajson.data.forEach(function(e0){
    if (!listActivity.includes(e0.activity) && dates.includes(e0.date)){
      listActivity.push(e0.activity);
    }
  })
  return listActivity;
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

//date tri
function stringToDate(value){
  var dateList = value.split("-");
  var date=new Date(dateList[2],(parseInt(dateList[0])-1),dateList[1]);
  return date;
}
function dateToString(date){
  var dayValue=date.getDate();
  var monthValue=date.getMonth()+1;
  if(dayValue<10)dayValue="0"+dayValue;
  if(monthValue<10)monthValue="0"+monthValue;
  return monthValue+"-"+dayValue+"-"+date.getFullYear();
}
function trierDates(list){
  var newList=listofDate(list);
  var finalList=[];
  newList.forEach(function (stringDate){
    finalList.push(dateToString(stringDate));
  });
  return finalList;
}
function listofDate(list){
  var newList=[];
  list.forEach(function (stringDate){
    newList.push(stringToDate(stringDate));
  });
  newList.sort(function(a, b) {
    return a - b;
  });
  return newList;
}

// quantité de donnée


//function applicative
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
                      resultOnClickGraph(this.category,this.y,this.stackTotal,this.series.name,filter.name);
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
function resultOnClickGraph(date,nbTask,totalTask,activityName,filterName){
  var currentDiv = document.getElementById("graphInfo");
  while (currentDiv.firstChild) {
      currentDiv.removeChild(currentDiv.firstChild);
  }
  currentDiv.appendChild(createText(("Date : "+date)));
  currentDiv.appendChild(createText(("filter : "+ filterName)));
  currentDiv.appendChild(createText((activityName+" : "+nbTask)));
  currentDiv.appendChild(createText(("Total of "+filterName+" : "+totalTask)));
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
      onLoadData('data.json',filterName,activity.id,);
    }
  });
}
function dateSetUp(listDates){
  if(ListDates.length==0){
    ListDates= trierDates(listDates);

    DatesSelected[0]=ListDates[0];
    DateBegin=DatesSelected[0];
    var dateBeginGraph = DatesSelected[0].split("-");
    init(dateBeginGraph[1],1,dateBeginGraph[2],dateBeginGraph[0]);

    DatesSelected[1]=ListDates[ListDates.length-1];
    DateEnds=DatesSelected[1];
    var dateEndsGraph = DatesSelected[1].split("-");
    init(dateEndsGraph[1],2,dateEndsGraph[2],dateEndsGraph[0]);

  }else{
    //ListDates= trierDates(listDates);
    if(FilterSelected==FilterDataSelected.name){
      if (stringToDate(DatesSelected[0]) < stringToDate(DateBegin) ){
        DatesSelected[0]=DateBegin;
      }
      if ( stringToDate(DatesSelected[1]) > stringToDate(DateEnds) ){
        DatesSelected[1]=DateEnds;
      }
      var dateBeginGraph= stringToDate(DatesSelected[0]);
      var dateEndsGraph= stringToDate(DatesSelected[1]);
      var listTmpDates= listofDate(listDates);
      var listDatesGraph=[];
      listTmpDates.forEach(function ( date){
        if( date >= dateBeginGraph && date <= dateEndsGraph){
          listDatesGraph.push(dateToString(date));
        }
      });
      ListDates= trierDates(listDatesGraph);
      var dateBeginSplit = DatesSelected[0].split("-");
      initNewFilter(1,dateBeginSplit[2],dateBeginSplit[0]);

      var dateEndsSplit = DatesSelected[1].split("-");
      initNewFilter(2,dateEndsSplit[2],dateEndsSplit[0]);
    }else {
      ListDates= trierDates(listDates);

      DatesSelected[0]=ListDates[0];
      DateBegin=DatesSelected[0];
      var dateBeginGraph = DatesSelected[0].split("-");
      init(dateBeginGraph[1],1,dateBeginGraph[2],dateBeginGraph[0]);

      DatesSelected[1]=ListDates[ListDates.length-1];
      DateEnds=DatesSelected[1];
      var dateEndsGraph = DatesSelected[1].split("-");
      init(dateEndsGraph[1],2,dateEndsGraph[2],dateEndsGraph[0]);
    }
  }
}

//fonction principale (main)
function onLoadData(link,filtername,activityName,callback){
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', link, true);
  req.onload  = function() {
     var dataset = JSON.parse(req.responseText);
     FilterDataSelected=selectFilter(dataset,filtername);

     var listdates= listDateSelected(FilterDataSelected);
     dateSetUp(listdates);
     FilterSelected=FilterDataSelected.name;
     ActivityName=activityName;
     ListNames = listNameactivities(FilterDataSelected,ListDates);
     Filter = newFilter(FilterDataSelected,ListDates,filtername);
     if(activityName!="false"){
       selectActivity(Filter,ListDates,activityName);
     }
     setGraph(Filter,ListDates);
     if (callback) callback();
  };
  req.send(null);
}
