define(function(){
  return function(){
  	$('#surnames').html('');
    $.getJSON('json/department.json', function(data) {
            for(var i=0;i<data.sotr.length;i++){
                $('#surnames').append('<option>' + data.sotr[i].surname + ' '+ data.sotr[i].name +'</option>');
            }
    });
	}
});