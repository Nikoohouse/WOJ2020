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
      var d = new Date();
        var month = d.getUTCMonth() +1;
        var day = d.getUTCDate();
        var year = d.getUTCFullYear();
        var newdate = year + "-" + month + "-" + day;
      var sql = "INSERT INTO asiakas(nimi, osoite, postinro, postitmp, luontipvm, asty_avain) VALUES  (";
      sql = sql + "'" + req.body.nimi + "'" + "," + "'" + req.body.osoite + "'" + "," + "'" + req.body.postinro + "'" + "," + "'" + req.body.postitmp + "'" + "," + "'" + newdate + "'" + "," + req.body.asty_avain + ")";
      connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("Virhe lisättäessä asiakasta" + error);
          res.status(400);
          res.json("Jokin tieto puuttui, lisäys epäonnistui");
        }
        else {
          console.log("data = " + JSON.stringify(req.body));
          console.log(req.body.nimi);
          res.send("Kutsuttiin create");
        }

      });
     
      
    },

    update: function(req, res){

    },

    delete : function (req, res) { 
      var sql = "DELETE FROM asiakas WHERE avain="
      sql = sql + "'" + req.params.id + "';";
      connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("Virhe lisättäessä asiakasta" + error);
          res.status(400);
          res.json("Jokin tieto puuttui, lisäys epäonnistui");
        }
        else {
          console.log("Body = " + JSON.stringify(req.body));
          console.log("Params = " + JSON.stringify(req.params));
            res.send("Kutsuttiin delete");
        }
      });
      
    }
  
}
