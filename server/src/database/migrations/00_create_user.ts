import knex from 'knex';


// criando tabela com o knex
export async function up(knex: knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

// caso tenha algum problema, retorna a um estado consistente
export async function down(knex: knex) {
    return knex.schema.dropTable('users');
}