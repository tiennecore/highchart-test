//variable globale
FilterDataSelected={};
FilterSelected="";
ListNames=[];
ListDates=[];
DatesSelected=['','']
DateBeginEnds=['','']
DatesSlider=['','']
NameSelected=[];
FilterSelectedHtml={
  'activities':[],
  'dates':['','']
};
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

//graph tri after selectionactivity

function orderDateAfterSelectedActivity(){
  var tmpListCount=[]
  ListDates.forEach(date=>tmpListCount.push(false));
  Filter.listActivity.forEach(function (activity){
    activity.listdata.forEach(function(value,index){
      if(value==true){
        tmpListCount[index]=true;
      }
    });
  });
  var index=tmpListCount.length-1;
  for (index; index >= 0; index--) {
    if (tmpListCount[index]==false) {
      ListDates.splice(index,1);
    }
  }
  Filter.listActivity.forEach(function (activity){
    index=tmpListCount.length-1;
    for (index; index >= 0; index--) {
      if (tmpListCount[index]==false) {
        activity.listdata.splice(index,1);
      }
    }
    console.log(activity);
  });
}


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
        stacking: 'normal'
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
  var findActivity = filter.listActivity.find(function (activity){
    return activity.name == name
  });
  var index=0;
  var listIndex=[]
  findActivity.listdata.forEach(function(element){
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
function selectActivities(filter,dates,names){
  var listfindActivity=[];
  names.forEach(function(idActivity){
    var findActivity = filter.listActivity.find(function (activity){
      return activity.name == idActivity.value
    });
    listfindActivity.push(findActivity);
  })

  console.log(listfindActivity);
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
  var value =currentDiv.lastChild.value
  currentDiv.removeChild(currentDiv.lastChild);
  listbutton(ListNames,currentDiv,FilterDataSelected.name,value);
}
function dateSetUp(listDates){
  if(ListDates.length==0){
    ListDates= trierDates(listDates);

    DatesSelected[0]=ListDates[0];
    DateBeginEnds[0]=DatesSelected[0];

    DatesSelected[1]=ListDates[ListDates.length-1];
    DateBeginEnds[1]=DatesSelected[1];

    var dateBeginGraph = DatesSelected[0].split("-");
    init(dateBeginGraph[1],1,dateBeginGraph[2],dateBeginGraph[0]-1,DatesSelected);


    var dateEndsGraph = DatesSelected[1].split("-");
    init(dateEndsGraph[1],2,dateEndsGraph[2],dateEndsGraph[0]-1,DatesSelected);

  }else{
    //ListDates= trierDates(listDates);
    if(FilterSelected==FilterDataSelected.name){
      if (stringToDate(DatesSelected[0]) < stringToDate(DateBeginEnds[0]) ){
        DatesSelected[0]=DateBeginEnds[0];
        var newDateWrite=DatesSelected[0].split('-');
        getVal(newDateWrite[1],1,newDateWrite[2],newDateWrite[0]);
      }
      if ( stringToDate(DatesSelected[1]) > stringToDate(DateBeginEnds[1]) ){
        DatesSelected[1]=DateBeginEnds[1];
        var newDateWrite=DatesSelected[1].split('-');
        getVal(newDateWrite[1],1,newDateWrite[2],newDateWrite[0]);
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
      initNewFilter(1,dateBeginSplit[2],dateBeginSplit[0],DatesSelected);

      var dateEndsSplit = DatesSelected[1].split("-");
      initNewFilter(2,dateEndsSplit[2],dateEndsSplit[0],DatesSelected);
    }else {
      ListDates= trierDates(listDates);

      DatesSelected[0]=ListDates[0];
      DateBeginEnds[0]=DatesSelected[0];
      var dateBeginGraph = DatesSelected[0].split("-");
      init(dateBeginGraph[1],1,dateBeginGraph[2],dateBeginGraph[0],DatesSelected);

      DatesSelected[1]=ListDates[ListDates.length-1];
      DateBeginEnds[1]=DatesSelected[1];
      var dateEndsGraph = DatesSelected[1].split("-");
      init(dateEndsGraph[1],2,dateEndsGraph[2],dateEndsGraph[0],DatesSelected);
    }
  }
  DatesSelected.forEach(function(date,index){
    var labeldate=document.getElementById('labelslider'+index);
    labeldate.textContent=dateDateToDateMosName(date);
  });

}

//fonction principale (main)
function onLoadData(link,filtername,selected,callback){
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', link, true);
  req.onload  = function() {
     var dataset = JSON.parse(req.responseText);
     FilterDataSelected=selectFilter(dataset,filtername);

     var listdates= listDateSelected(FilterDataSelected);
     dateSetUp(listdates);
     FilterSelected=FilterDataSelected.name;
     ListNames = listNameactivities(FilterDataSelected,ListDates);
     Filter = newFilter(FilterDataSelected,ListDates,filtername);
     if( selected.activities && selected.activities.length>0){
       addActivityToFilter();
       orderDateAfterSelectedActivity();
       editActivityFunction(filtername);
     }

     setGraph(Filter,ListDates);
     if (callback) callback();
  };
  req.send();
}
