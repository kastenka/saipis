define(function(){
  return function(breach){
  	var breachCof = 1;
	if(breach==true) {breachCof = 0.8;}
	return breachCof;
	}
});