var express = require('express');
var app = express();
var Connection = require('tedious').Connection;
var result = "";
    var config = {  
        server: '10.0.0.103',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'rdsuser', //update me
                password: 'Ha@74740170'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: false,
            database: 'database1'  //update me
        }
    }; 
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");  

        executeStatement();  

    });  
    
    connection.connect();
  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
  function executeStatement() {  
        request = new Request("SELECT * FROM mytable2", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
      
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
	
            //result ="";  

        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);  
    }  

    app.get('/', function(req,res){
res.send(result)
});
var server = app.listen(5001, function () {
    console.log('Server is running..');
});