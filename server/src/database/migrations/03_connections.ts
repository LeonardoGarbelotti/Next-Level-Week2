import knex from 'knex';


// criando tabela com o knex
// é possível criar uma chave estrangeira utilizando .references().inTable()
export async function up(knex: knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();

        table.integer('user_id').notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');

    });
}

// caso tenha algum problema, retorna a um estado consistente
export async function down(knex: knex) {
    return knex.schema.dropTable('connections');
}