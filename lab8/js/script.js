//Обновление списка сотрудников
function reSelect(){
	require(['reSelect', 'jquery'], function(reSelect, $){
		reSelect();
	});
}

//Вывод в нумерованный список
function showInfo(name){
	$("#infoSotr").html('');
	$(function(){
    $.getJSON('json/department.json', function(data) {
        $('#infoSotr').html('');
$('#infoSotr').css('border', '3px solid black');  
$('#infoSotr').append( $('<tr><td>Имя и фамилия</td><td>Отдел</td><td>Должность</td><td>Зарплата</td></tr>'));
            for(var i=0;i<data.sotr.length;i++){
                
            	var nameSurname = data.sotr[i].surname + ' ' + data.sotr[i].name;
            	console.log(nameSurname);
            	sal = localStorage.getItem(nameSurname);
            	console.log(sal);
                if(nameSurname == name) {if(localStorage.getItem(name)!=null){
                    $('#infoSotr').append('<td>' + nameSurname +'</td><td>' + data.sotr[i].dep +'</td><td>' + data.sotr[i].position +'</td><td>' + localStorage.getItem(name) +' $</td>'); 
                }
            else{alert("Не введена информация о сотруднике!");}}
                }
    });
	});
}


//Подсчёт зарплаты
function showSalary(name,rate,exp,pension,breach){
require(['rateCount'], function(rateCount){
		var salary = rateCount(rate);
require(['expCount'], function(expCount){
		salary *= expCount(exp);
require(['pensionCount'], function(pensionCount){
		salary *= pensionCount(pension);
require(['pensionCount'], function(pensionCount){
		salary *= pensionCount(pension);
require(['breachCount'], function(breachCount){
		salary *= breachCount(breach);
		salary=Math.round(salary);

		localStorage.setItem(name, salary);
	});
	});
	});
	});
	});
}

function showAverage(){
	require(['showAverage', 'jquery'], function(showAverage, $){
		showAverage();
	});	
}