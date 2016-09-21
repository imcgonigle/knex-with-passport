
exports.up = function(knex, Promise) {
	return knex.schema.createTable('posts', function(table) {
		table.increments('id');
		table.integer('user_id');
		table.string('title');
		table.text('body');
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
