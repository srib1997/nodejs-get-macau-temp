var eyes = require('eyes');
 var https = require('https');
 var fs = require('fs');
 var xml2js = require('xml2js');
 var parser = new xml2js.Parser();

 parser.on('error', function(err) { console.log('Parser error', err); });

 var data = '';
 https.get('https://xml.smg.gov.mo/c_typhoon.xml', function(res) {
     if (res.statusCode >= 200 && res.statusCode < 400) {
       res.on('data', function(data_) { data += data_.toString(); });
       res.on('end', function() {
         console.log('data', data);
         parser.parseString(data, function(err, result) {
           console.log('FINISHED', err, JSON.stringify(result.TyphoonWarning))
         });
       });
     }
   });