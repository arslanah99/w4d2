// var specificName = process.argv[2];
// var selectorId = `SELECT * FROM famous_people WHERE first_name='${specificName}';`;
// var searchingMessage = "Searching...";

// const pg = require("pg");
// const settings = require("./settings"); // settings.json

// const client = new pg.Client({
//   user: settings.user,
//   password: settings.password,
//   database: settings.database,
//   host: settings.hostname,
//   port: settings.port,
//   ssl: settings.ssl
// });

// client.connect(err => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query(selectorId, (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(searchingMessage);
//     console.log(
//       `Found ${result.rows.length} persons(s) by the name ${specificName}`
//     );
//     result.rows.forEach(function(person) {
//       var strDate = person.birthdate.toISOString().substring(0, 10);

//       console.log(`${person.first_name} ${person.last_name}, born ${strDate}`);
//     });

//     client.end();
//   });
// });
var specificName = process.argv[2];

var selectorId = `SELECT * FROM famous_people WHERE first_name='${specificName}';`;
var searchingMessage = "Searching...";

const knex = require('knex')({
    client: 'pg',
    connection: require('./settings')    
  })
knex('famous_people').where('first_name', specificName)
.then((response) => {
var founder = `Found ${response.length} person(s) by the name ${specificName}`

    console.log(searchingMessage)
    console.log(founder)
    response.forEach(function(person){
    var strDate = person.birthdate.toISOString().substring(0, 10);

    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${strDate}`);
})
})
.catch((error) => {
    console.log(error)
})


