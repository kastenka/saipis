define(function(){
  return function(){

  	var salary=0;
	var i=0;
    var ind = 0;
	$("#surnames option").each(function(){
		if(localStorage.getItem(this.text)==null){ ind=1; return false;}
		salary+=+localStorage.getItem(this.text);		
		i++;
	})
      if(ind==1){alert("Введена не вся информация!");}
      else{
          salary/=i;
	alert("Средняя зарплата по отделу: " + salary);
      }
	}
});