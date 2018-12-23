var color = document.getElementById("idColor").value;
var s = " ";

var arr = document.getElementsByName('nameSize');
        for(var j=0;j<arr.length;j++){
            if(arr[j].checked){
                s = arr[j].value;
                break;
            }
        }

$("#text").load("text.txt", function() {
	$("#text").css({"color": color,"font-size": s});
});



