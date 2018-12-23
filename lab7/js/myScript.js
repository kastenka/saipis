function xml() {
    
var color = document.getElementById("idColor").value;
var s = " ";

var arr = document.getElementsByName('nameSize');
        for(var j=0;j<arr.length;j++){
            if(arr[j].checked){
                s = arr[j].value;
                break;
            }
        }
    
    //запроc к xml
	jQuery.post("XMLfile.xml",function(xml){
			$(xml).find('form').each(function(){
				$('#id1').val($(this).find('textField1').text()).css({"color": color,"font-size": s});
				$('#id2').val($(this).find('textField2').text()).css({"color": color,"font-size": s});
			});
		},"xml")
};

function script() {
	$.getScript('js/script.js');
};


$(() => {
    setupAjaxHooks();
});

setupAjaxHooks = () => {
    $(document).ajaxStart(() => writeAjaxLog('Начало отправки AJAX-запроса'));
    $(document).ajaxSend(() => writeAjaxLog('Отправка AJAX-запроса'));
    $(document).ajaxStop(() => writeAjaxLog('Конец отправки AJAX-запроса'));
    $(document).ajaxSuccess(() => writeAjaxLog('Получен ответ на AJAX-запрос'));
    $(document).ajaxError(() => writeAjaxLog('Ошибка AJAX-запроса'));
}

writeAjaxLog = (message) => $('#ajaxLog').append(`<span>${message}</span><br/>`);