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
function selectActivity(filter){
 
}

var DatesSelected = listDateSelected(dataset);
const Test =newFilter(dataset,DatesSelected,"Task failed");
var Conf= dataToConf(Test);

document.addEventListener('DOMContentLoaded', function () {
    var myChart = Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: Test.name
      },
      xAxis: {
        categories: DatesSelected
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
        }
      },
      series: Conf
    });
});
