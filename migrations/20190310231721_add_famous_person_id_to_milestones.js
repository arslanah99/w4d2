
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('id_to_milestones', function(table){
            table.foreign('famous_person_id').references('famous_person_id')
        })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('id_to_milestones')
    ])
  };
  