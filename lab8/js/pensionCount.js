define(function(){
  return function(pension){
	var pensionCof = 1;
	if(pension==true) {pensionCof = 1.5;}
	return pensionCof;
}
});