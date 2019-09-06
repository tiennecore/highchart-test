

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
  dataset.Tasks.forEach(function (filter) {
    var optionDiv = document.createElement('option');
    optionDiv.setAttribute("id",filter.name);
    var optionText = document.createTextNode(filter.name);
    optionDiv.appendChild(optionText);
    currentDiv.appendChild(optionDiv);
  });
  currentDiv.onchange=function(){
    emptyAll();
    onLoadData('data.json',document.getElementById("filterForm").value,[],function(){
      editActivityFunction(document.getElementById("filterForm").value);
      mainslider(DatesSelected);
      DatesSlider.forEach(function(value,index){
        var labeldate=document.getElementById('labelslider'+index);
        labeldate.textContent=dateToString(value);
        init(DateBeginEnds[index],index+1,DatesSelected);
      });
    });
  };

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
  activtyheaddiv.setAttribute('class','resultheadinfo');

  var icon=document.createElement('i');
  icon.setAttribute('class','fas fa-caret-right');

  var activityheaderlabel=document.createElement('span');
  activityheaderlabel.textContent=activityName+' information';

  activtyheaddiv.appendChild(icon);
  activtyheaddiv.appendChild(activityheaderlabel);
  currentDiv.appendChild(activtyheaddiv);

  var activtydiv=document.createElement('div');
  activtydiv.setAttribute('class','resultinfo');

  activtydiv.appendChild(createText('version : '+activityinfo.version));
  activtydiv.appendChild(createText("lifecycle : " +activityinfo.LifecycleStatus));
  activtydiv.appendChild(createText('Cost activity : '+activityinfo.Cost));
  activtydiv.appendChild(createText("Entry parameters : "+activityinfo.EntryParameters));
  activtydiv.appendChild(createText("Fixed parameter : "+activityinfo.FixedParameter));
  activtydiv.appendChild(createText("Output parameter : "+activityinfo.OutputParameter));

  currentDiv.appendChild(activtydiv);

  activtyheaddiv.onclick=function(){
    var icon= document.createElement('i');
    if(activtydiv.style.display == 'flex'){
      activtyheaddiv.removeChild(activtyheaddiv.children[0]);
      icon.setAttribute('class','fas fa-caret-right');
      activtyheaddiv.insertBefore(icon,activtyheaddiv.children[0]);
      activtydiv.style.display='none';
    }else{
      activtyheaddiv.removeChild(activtyheaddiv.children[0]);
      icon.setAttribute('class','fas fa-caret-down');
      activtyheaddiv.insertBefore(icon,activtyheaddiv.children[0]);
      activtydiv.style.display='flex';
    }
  }


  var sampleheaddiv=document.createElement('div');
  sampleheaddiv.setAttribute('class','resultheadinfo');

  var icon=document.createElement('i');
  icon.setAttribute('class','fas fa-caret-right');

  var sampleheaderlabel=document.createElement('span');
  sampleheaderlabel.textContent='Sample information';

  sampleheaddiv.appendChild(icon);
  sampleheaddiv.appendChild(sampleheaderlabel);
  currentDiv.appendChild(sampleheaddiv);

  var samplediv=document.createElement('div');
  samplediv.setAttribute('class','resultinfo');

  samplediv.appendChild(createText("localization : "+sample.localization));
  samplediv.appendChild(createText("Storage condition : "+sample.storageCondition));
  samplediv.appendChild(createText("Amount : "+sample.amount +' mL'));
  samplediv.appendChild(createText("Due collection date : "+sample.dueCollectionDate));
  samplediv.appendChild(createText("Handling instructions : "+sample.handlingInstructions));
  samplediv.appendChild(createText("Due Collection date : "+sample.dueCollectionDate));
  samplediv.appendChild(createText("Planned collection date : "+sample.plannedCollectionDate));

  currentDiv.appendChild(samplediv);

  sampleheaddiv.onclick=function(){
    var icon= document.createElement('i');
    if(samplediv.style.display == 'flex'){
      sampleheaddiv.removeChild(sampleheaddiv.children[0]);
      icon.setAttribute('class','fas fa-caret-right');
      sampleheaddiv.insertBefore(icon,sampleheaddiv.children[0]);
      samplediv.style.display='none';
    }else{
      sampleheaddiv.removeChild(sampleheaddiv.children[0]);
      icon.setAttribute('class','fas fa-caret-down');
      sampleheaddiv.insertBefore(icon,sampleheaddiv.children[0]);
      samplediv.style.display='flex';
    }
  }
  if(parentSample){
    var parentSampleheaddiv=document.createElement('div');
    parentSampleheaddiv.setAttribute('class','resultheadinfo');

    var icon=document.createElement('i');
    icon.setAttribute('class','fas fa-caret-right');

    var sampleheaderlabel=document.createElement('span');
    sampleheaderlabel.textContent='Parent sample information';

    parentSampleheaddiv.appendChild(icon);
    parentSampleheaddiv.appendChild(sampleheaderlabel);
    currentDiv.appendChild(parentSampleheaddiv);

    var parentsamplediv=document.createElement('div');
    parentsamplediv.setAttribute('class','resultinfo');

    parentsamplediv.appendChild(createText("Parent sample information "));
    parentsamplediv.appendChild(createText("localization : "+parentSample.localization));
    parentsamplediv.appendChild(createText("Storage condition : "+parentSample.storageCondition));
    parentsamplediv.appendChild(createText("Amount : "+parentSample.amount +' mL'));
    parentsamplediv.appendChild(createText("Due collection date : "+parentSample.dueCollectionDate));
    parentsamplediv.appendChild(createText("Handling instructions : "+parentSample.handlingInstructions));
    parentsamplediv.appendChild(createText("Due Collection date : "+parentSample.dueCollectionDate));
    parentsamplediv.appendChild(createText("Planned collection date : "+parentSample.plannedCollectionDate));

    currentDiv.appendChild(parentsamplediv);

    parentSampleheaddiv.onclick=function(){
      var icon= document.createElement('i');
      if(parentsamplediv.style.display == 'flex'){
        parentSampleheaddiv.removeChild(parentSampleheaddiv.children[0]);
        icon.setAttribute('class','fas fa-caret-right');
        parentSampleheaddiv.insertBefore(icon,parentSampleheaddiv.children[0]);
        parentsamplediv.style.display='none';
      }else{
        parentSampleheaddiv.removeChild(parentSampleheaddiv.children[0]);
        icon.setAttribute('class','fas fa-caret-down');
        parentSampleheaddiv.insertBefore(icon,parentSampleheaddiv.children[0]);
        parentsamplediv.style.display='flex';
      }
    }
  }

}
function initLoad(link){

  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', link, true);
  req.onload  = function() {
     var dataset = JSON.parse(req.responseText);
     initFormFilter(dataset);
     research();
     var firstFilter = document.getElementById("filterForm");
     FilterDataSelected = selectFilter(dataset,(document.getElementById("filterForm")).firstChild.nextSibling.id);
     var listdates = listDateSelected(FilterDataSelected);
     dateSetUp(listdates);
     mainslider(DatesSelected);
     DatesSlider.forEach(function(value,index){
       var labeldate=document.getElementById('labelslider'+index);
       labeldate.textContent=dateToString(value);
     });
     document.getElementById('deleteAllSelected').onclick=function(){
       emptyAll();
     }

     onLoadData('data.json',FilterDataSelected.name,[],function(){
       editActivityFunction(document.getElementById("filterForm").value);
     });
  };
  req.send(null);
}
