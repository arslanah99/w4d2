var firstNameAdder = process.argv[2];
var lastNameAdder = process.argv[3];
var dateAdder = process.argv[4];

var selectorId = `SELECT * FROM famous_people WHERE first_name='${firstNameAdder}';`;
var searchingMessage = "Searching...";

const knex = require('knex')({
    client: 'pg',
    connection: require('./settings')    
  })

knex('famous_people').insert(
    {first_name : `${firstNameAdder}`, last_name: `${lastNameAdder}`, birthdate: `${dateAdder}`}
)
.then((response) =>{
    console.log(response)
})

.catch((err) => {
  console.log(err);
  throw err
})
.finally(() =>{
  knex.destroy();
})


// knex('famous_people').where('first_name', specificName)
// .then((response) => {
// var founder = `Found ${response.length} person(s) by the name ${specificName}`

//     console.log(searchingMessage)
//     console.log(founder)
//     response.forEach(function(person){
//     var strDate = person.birthdate.toISOString().substring(0, 10);

//     console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${strDate}`);
// })
// })
// .catch((error) => {
//     console.log(error)
// })
