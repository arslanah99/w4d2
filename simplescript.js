//1: Input: take the name given by the process.argv
//2: loop through famous people names
//3: take the input name and match with famous persons names
//4: if a match return first and last name, and date of birth
//5: if more than one output is found with the matching name
//6: return all outputs

var specificName = process.argv[2];
var selectorId = `SELECT * FROM famous_people WHERE first_name='${specificName}';`;
var searchingMessage = "Searching...";

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect(err => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(selectorId, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(searchingMessage);
    console.log(
      `Found ${result.rows.length} persons(s) by the name ${specificName}`
    );
    result.rows.forEach(function(person) {
      var strDate = person.birthdate.toISOString().substring(0, 10);

      console.log(`${person.first_name} ${person.last_name}, born ${strDate}`);
    });

    client.end();
  });
});
