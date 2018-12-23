define(function(){
  return function(exp){
	var cof;
	switch(exp){
		case 'Нет стажа':
		cof = 1;
		break;
		case 'Менее 5 лет':
		cof = 1.2;
		break;
		case '5-10 лет':
		cof = 1.5;
		break;
		case 'Более 10 лет':
		cof = 2;
		break;
	}
	return cof;
}
});