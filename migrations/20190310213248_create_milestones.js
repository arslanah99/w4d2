
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('milestones', function(table){
        table.increments('id').primary()
          table.string('description');
          table.date('date_achieved');
          table.integer('famous_person_id')
        //   table.increments('id_to_milestones').references('id_to_milestones').primary()
        table.foreign('famous_person_id').references('id').inTable('famous_people')
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('milestones')
  ])
};
