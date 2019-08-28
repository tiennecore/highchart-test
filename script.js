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
TaskState=[]
ActivityState=['draft', 'submitted', 'review in progress', 'reviewed', 'approval in progress', 'approved', 'withdrawn', 'superseded'  ]
SampleState=['planned', 'collected', 'available', 'readyForDispose', 'disposed','collectionFailed']
AllData=[];
//création des objets
function newActivity(name){
  const activity = {
    name:name,
    countTmp:0,
    listdata:[],
    sampleUsed:0,
    localization:'',
    assignee:''
  };
  return activity;
}
function listDateSelected( datajson){
  var dates=[];
  datajson.data.forEach(function(element){
    if (!dates.includes(element.date)){
      dates.push(element.date);
    }
  });
  return dates;
}
function listNameactivities( datajson, listdate){
  var listActivity=[]
  datajson.data.forEach(function(e0){
    if (!listActivity.includes(e0.activity) && ! listdate.find(value => value == stringToDate(e0.date))){
      listActivity.push(e0.activity);
    }
  })
  return listActivity;
}

function newFilter( datajson,dates,name){
  var filter = {
    name:"",
    listActivity:[]
  };
  filter.name = name;
  ListNames.forEach(function(value){
    filter.listActivity.push(newActivity(value));
  });
  dates.forEach(function(e0){
    //console.log("jour de test :"+e0);
    datajson.data.forEach(function(e1){
      if(dateToString(e0)==dateToString(stringToDate(e1.date)) ){
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

//date tri & affichage
function stringToDate(value){
  var dateList = value.split(".");
  var date=new Date(dateList[2],(parseInt(dateList[0])-1),dateList[1]);
  return date;
}
function dateToString(date){

  return mosname[date.getMonth()]+"-"+date.getDate()+"-"+date.getFullYear();
}
function htmlToDate(value){
  var dateList = value.split("-");
  var month = mosname.findIndex(mois => mois == dateList[0]);
  var date=new Date(dateList[2],month,dateList[1]);
  return date;
}

function trierDates(list){
  var newList=listofDate(list);
  var finalList=[];
  newList.forEach(function (date){
    finalList.push(date);
  });
  return finalList;
}
function listofDate(list){
  var newList=[];
  list.forEach(function (stringDate){
    if(typeof stringDate == 'string'){
      newList.push(stringToDate(stringDate));
    }
    else{
      newList.push(stringDate);
    }
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
  var frontDates=[]
  dates.forEach(function (date){
    frontDates.push(dateToString(date));
  });
  var Conf= dataToConf(filter);
  var myChart = Highcharts.chart('graph', {
    chart: {
      type: 'column'
    },
    title: {
      text: filter.name
    },
    xAxis: {
      categories: frontDates
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
  var element = document.createElement("span");
  element.textContent = text;
  return element;
}
function resultOnClickGraph(date,nbTask,totalTask,activityName,filterName){
  var activityinfo = AllData.Activities.find(element => element.name == activityName);
  if(!activityinfo){
    activityinfo={
      name:"",
      version:"",
      LifecycleStatus:'',
      Cost:"",
      EntryParameters:"",
      OutputParameter:"",
      FixedParameter:""
    }
  }
  var activity = FilterDataSelected.data.find(element => element.name = activityName && dateToString(stringToDate(element.date)) == date);
  var sample = AllData.Samples.find(element => element.id == activity.sampleUsed);
  var parentSample = AllData.Samples.find(element => element.id == sample.ParentSample);
  var currentDiv = document.getElementById("graphInfo");
  while (currentDiv.firstChild) {
      currentDiv.removeChild(currentDiv.firstChild);
  }

  currentDiv.appendChild(createText("Date : "+date));
  currentDiv.appendChild(createText("Filter : "+ filterName));

  var activtyheaddiv=document.createElement('div');
  activtyheaddiv.setAttribute('class','activtyheaddiv');

  var icon=document.createElement('i');
  icon.setAttribute('class','fas fa-caret-right');

  var activityheaderlabel=document.createElement('span');
  activityheaderlabel.textContent=activityName+' information';

  activtyheaddiv.appendChild(icon);
  activtyheaddiv.appendChild(activityheaderlabel);
  currentDiv.appendChild(activtyheaddiv);

  var activtydiv=document.createElement('div');
  activtydiv.setAttribute('class','activtyinfodiv');

  activtydiv.appendChild(createText('version : '+activityinfo.version));
  activtydiv.appendChild(createText("lifecycle : " +activityinfo.LifecycleStatus));
  activtydiv.appendChild(createText('Cost activity : '+activityinfo.Cost));
  activtydiv.appendChild(createText("Entry parameters : "+activityinfo.EntryParameters));
  activtydiv.appendChild(createText("Fixed parameter : "+activityinfo.FixedParameter));
  activtydiv.appendChild(createText("Output parameter : "+activityinfo.OutputParameter));

  activtyheaddiv.onclick=function(){
    if(activtydiv.style.display == 'flex'){
      activtydiv.style.display='none';
    }else{
      activtydiv.style.display='flex';
    }
  }

  currentDiv.appendChild(createText("Sample information "));
  currentDiv.appendChild(createText("localization : "+sample.localization));
  currentDiv.appendChild(createText("Storage condition : "+sample.storageCondition));
  currentDiv.appendChild(createText("Amount : "+sample.amount +' mL'));
  currentDiv.appendChild(createText("Due collection date : "+sample.dueCollectionDate));
  currentDiv.appendChild(createText("Handling instructions : "+sample.handlingInstructions));
  currentDiv.appendChild(createText("Due Collection date : "+sample.dueCollectionDate));
  currentDiv.appendChild(createText("Planned collection date : "+sample.plannedCollectionDate));
  if(parentSample){
    currentDiv.appendChild(createText("Parent sample information "));
    currentDiv.appendChild(createText("localization : "+parentSample.localization));
    currentDiv.appendChild(createText("Storage condition : "+parentSample.storageCondition));
    currentDiv.appendChild(createText("Amount : "+parentSample.amount +' mL'));
    currentDiv.appendChild(createText("Due collection date : "+parentSample.dueCollectionDate));
    currentDiv.appendChild(createText("Handling instructions : "+parentSample.handlingInstructions));
    currentDiv.appendChild(createText("Due Collection date : "+parentSample.dueCollectionDate));
    currentDiv.appendChild(createText("Planned collection date : "+parentSample.plannedCollectionDate));
  }

}
function selectFilter(dataset,filterName){
  return dataset.Tasks.find( filter => filter.name==filterName);
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

    DateBeginEnds.forEach(function(date,index){
      init(date,index+1,DatesSelected);
    });



  }else{
    //ListDates= trierDates(listDates);
    if(FilterSelected==FilterDataSelected.name){
      if ((DatesSelected[0]) < (DateBeginEnds[0]) ){
        DatesSelected[0]=DateBeginEnds[0];
        getVal(DatesSelected[0].getDate(),1,DatesSelected[0].getFullYear(),DatesSelected[0].getMonth());
      }
      if ( (DatesSelected[1]) > (DateBeginEnds[1]) ){
        DatesSelected[1]=DateBeginEnds[1];
        getVal(DatesSelected[1].getDate(),2,DatesSelected[1].getFullYear(),DatesSelected[1].getMonth());
      }
      var listTmpDates= listofDate(listDates);
      var listDatesGraph=[];
      listTmpDates.forEach(function ( date){
        if( date >= DatesSelected[0] && date <= DatesSelected[1]){
          listDatesGraph.push(date);
        }
      });
      ListDates= trierDates(listDatesGraph);
      initNewFilter(1,DatesSelected[0].getFullYear(),DatesSelected[0].getMonth(),DatesSelected);

      initNewFilter(2,DatesSelected[1].getFullYear(),DatesSelected[1].getMonth(),DatesSelected);
    }else {
      ListDates= trierDates(listDates);

      DatesSelected[0]=ListDates[0];
      DateBeginEnds[0]=DatesSelected[0];
      getVal(DatesSelected[0].getDate(),1,DatesSelected[0].getFullYear(),DatesSelected[0].getMonth());

      DatesSelected[1]=ListDates[ListDates.length-1];
      DateBeginEnds[1]=DatesSelected[1];
      getVal(DatesSelected[1].getDate(),2,DatesSelected[1].getFullYear(),DatesSelected[1].getMonth());
    }
  }
}

//fonction principale (main)
function onLoadData(link,filtername,selected,callback){
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', link, true);
  req.onload  = function() {
     AllData = JSON.parse(req.responseText);
     FilterDataSelected=selectFilter(AllData,filtername);

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
