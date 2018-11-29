function show() {
    var name= document.opros.name.value;
    var favStyle = document.opros.favStyle.value;
	var date = document.opros.date.value;

	
	var country = document.querySelector('.country:checked').value;
	var materialSelect = document.getElementById("material");
	var material = materialSelect.options[materialSelect.selectedIndex].text;

	var color = document.querySelector('.color:checked').value;

    clear();

    

var table =document.getElementById("table");
var row = document.createElement("tr"); 
table.appendChild(row); 

var td1 = document.createElement("td"); 
var td2 = document.createElement("td"); 
var td3 = document.createElement("td"); 
var td4 = document.createElement("td");
var td5 = document.createElement("td");
var td6 = document.createElement("td");

row.appendChild(td1); 
row.appendChild(td2);
row.appendChild(td3);
row.appendChild(td4);
row.appendChild(td5);
row.appendChild(td6);

td1.innerHTML = name; 
td2.innerHTML = country;
td3.innerHTML = material;
td4.innerHTML = color;
td5.innerHTML = favStyle;
td6.innerHTML = date;

document.getElementById("t").style.display = "block";
document.querySelector(".pool-container").style.display = "none";

var nameSelector = document.getElementById('name-select');
var option = createOption(name);
nameSelector.appendChild(option);
 
}

function createOption(value) {
	var option = document.createElement('option');
	option.value = value;
	option.innerHTML = value;
	
	return option;
}


function clear()
{
    opros.name.value = '';
    opros.date.value = '';
    opros.rad.value = '';
    opros.favStyle.value = '';
    opros.material.value = '';
}

function back()
{
        document.getElementById('form').style.display = "block";
        document.getElementById('t').style.display = "none";
		document.querySelector(".pool-container").style.display = "block";
        clear();
}

document.getElementById("newWindow").onclick = function(){
    var win = window.open("about:blank", "hello", "");
}