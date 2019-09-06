//à faire regex
function research(){
  var element=document.getElementById('researchRegex');
  element.oninput=function(){
    if (element.value){

      var list=[]
      ListNames.forEach(function (name){
        if(name.toLowerCase().includes(element.value.toLowerCase())){
          list.push(name);
        }
      });
      var listElement=[];
      list.forEach(function(span){
        var divsearch=document.getElementById(span);
        if(divsearch){
          listElement.push(divsearch);
        }
      });
      var divactivities=document.getElementById('filterContainerValue');
      while (divactivities.firstChild) {
          divactivities.removeChild(divactivities.firstChild);
      }
      listElement.forEach(span => divactivities.appendChild(span));
      document.getElementsByClassName('filter date begin')[0].style.display='none';
      document.getElementsByClassName('filter date end')[0].style.display='none';
    }else{
      document.getElementsByClassName('filter date begin')[0].style.display='flex';
      document.getElementsByClassName('filter date end')[0].style.display='flex';
      editActivityFunction(FilterDataSelected.name);
    }
  }
}
