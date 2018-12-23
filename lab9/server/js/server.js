const http = require("http");
const fs = require("fs");
var csv = require('fast-csv');



var mas = [];
var result = [];

var n = 8, m = 10;

function readTable(filename){
    var stream = fs.createReadStream(filename);
    var csvStream = csv()
      .on("data", function(data){
          var tmp = 0;
          for (var i = 0; i < n; i++){
            result[i] = [];
            for (var j = 0; j < m; j++){
                result[i][j] = data[tmp];
                tmp++;
          }}
      })
      .on("end", function(){
      });
  stream.pipe(csvStream);
}

function generateTable(){
  
    for (var i = 0; i < n; i++){
      mas[i] = [];
      for (var j = 0; j < m; j++){
          mas[i][j] = randomInRange(1,10);
    }}
    fs.writeFileSync("casual.csv", mas);
    var stream = fs.createReadStream("casual.csv");
    var csvStream = csv()
        .on("data", function(data){

            var tmp = 0;
            for (var i = 0; i < n; i++){
              result[i] = [];
              for (var j = 0; j < m; j++){
                  result[i][j] = data[tmp];
                  tmp++;
            }}

        })
        .on("end", function(){
        });
    stream.pipe(csvStream);
}

http.createServer(function (request, response) {

  switch (request.url) {
    case '/':
      fs.readFile("../../client/html/index.html", function (error, data) {
        response.setHeader("Content-Type", "text/html");
        response.end(data);
      });
      break;
    case '/js/client.js':
      fs.readFile("../../client/js/client.js", function (error, data) {
        response.setHeader("Content-Type", "text/js");
        response.end(data);
      });
      break;
    case '/css/client.css':
      fs.readFile("../../client/css/client.css", function (error, data) {
        response.setHeader("Content-Type", "text/css");
        response.end(data);
      });
      break;
    case '/get-data':
      		
          generateTable();

		  console.log('Hello')
          sortIncr(mas);
          fs.writeFileSync("increase.csv", mas);

          sortDecr(mas);
          fs.writeFileSync("decrease.csv", mas);

          readTable("casual.csv");
          response.end(makeTableHTML(result));
        
      
      break;

      case '/get-data-decrease':
      var sizeText1 = [];
          request.on('data', (chunk) => {
        sizeText1.push(chunk);
      }).on('end', () => {
        sizeText1 = Buffer.concat(sizeText1).toString();

        readTable("decrease.csv");
        sortDecr(result);
        roundArray(result, sizeText1);
        
        response.end(makeTableHTML(result));
      });
      break;

      case '/get-data-increase':
      var sizeText2 = [];
          request.on('data', (chunk) => {
        sizeText2.push(chunk);
      }).on('end', () => {
        sizeText2 = Buffer.concat(sizeText2).toString();

        readTable("increase.csv");
        sortIncr(result);
        roundArray(result, sizeText2);
        
        response.end(makeTableHTML(result));
      });
      break;

    
  }
}).listen(8080);

function makeTableHTML(myArray) {
    var result = "<table border=1>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

function randomInRange(min, max) {
  return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
}

function sortIncr(a){

    var tmp;

    for (var j=0; j<m; j++)    
       for (var i=0; i<n-1; i++)
           for (var k=0; k<n-i-1; k++)        
               if (a[k][j] > a[k+1][j])
                {
                    tmp = a[k][j];
                    a[k][j] = a[k+1][j];
                    a[k+1][j] = tmp;             
                } 


}

function sortDecr(a) {
  var tmp;

    for (var j=0; j<m; j++)    
       for (var i=0; i<n-1; i++)
           for (var k=0; k<n-i-1; k++)        
               if (a[k][j] < a[k+1][j])
                {
                    tmp = a[k][j];
                    a[k][j] = a[k+1][j];
                    a[k+1][j] = tmp;             
                } 
}

function roundArray(array, num){
  if(num == "small"){
      for (var i = 0; i < n; i++){
    //array[i] = [];
       for (var j = 0; j < m; j++){
         array[i][j] = roundPlus(array[i][j],2);
       }
     }
  }
  else if(num == "medium"){
      for (var i = 0; i < n; i++){
        //array[i] = [];
           for (var j = 0; j < m; j++){
             array[i][j] = roundPlus(array[i][j],4);
           }
         }
  }
  else{
    for (var i = 0; i < n; i++){
      //array[i] = [];
         for (var j = 0; j < m; j++){
           array[i][j] = roundPlus(array[i][j],6);
         }
       }
  }
  

}

function roundPlus(x, n) { //x - число, n - количество знаков

  if(isNaN(x) || isNaN(n)) return false;

  var m = Math.pow(10,n);

  return Math.round(x*m)/m;

}

