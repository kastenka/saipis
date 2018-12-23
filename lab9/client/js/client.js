function getLastNode() {
  $.ajax({
    type: "POST",
    url: "/get-data",
    success: function (data) {
      $('#allData').innerHTML = data;
    }
  });
}

function getDecrease() {
  var res = getSize();
  $.ajax({
    type: "POST",
    contentType: "text/plain",
    url: "/get-data-decrease",
    data: res,
    dataType: 'text',

    success: function (data) {
      
      document.getElementById('allData').innerHTML = data;
    }
  });
}

function getIncrease() {
  var res = getSize();
  $.ajax({
    type: "POST",
    contentType: "text/plain",
    url: "/get-data-increase",
    data: res,
    dataType: 'text',
    
    success: function (data) {
      
      document.getElementById('allData').innerHTML = data;
    }
  });
}

function getSize(){
  var res;
  if(document.getElementById("smallNum").checked == true) res = "small";
  if(document.getElementById("mediumNum").checked == true) res = "medium";
  if(document.getElementById("largeNum").checked == true) res = "large";
  return res;
}