'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
 host : 'localhost', 
 port : 3307,
 user : 'root', //vain kehitystarkoituksessa
password : 'Jaakaappi_1',
database : 'asiakas'

});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("virhe haettaessa dataa Asiakas-taulusta: " + error);
          res.status(500);
          res.json({"status" : "Ei toiminut"});
        }
        else
        {
        console.log("data = " + JSON.stringify(results));
        res.json(results);
        }
    });

    },

    fetchAll: function(req, res) {
      var nimi = "Kalle";
      var sql = 'SELECT * FROM ASIAKAS WHERE 1=1'
      sql = sql + " AND nimi like '" + nimi + "%'";
      connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("virhe haettaessa dataa Asiakas-taulusta: " + error);
          res.status(500);
          res.json({"status" : "Ei toiminut"});
        }
        else
        {
        console.log("data = " + JSON.stringify(results));
        res.json(results);
        }
      }); 
    },

    create: function(req, res){
    
      res.send("Kutsuttiin create");
    },

    update: function(req, res){

    },

    delete : function (req, res) {
        res.send("Kutsuttiin delete");
    }
  
}
