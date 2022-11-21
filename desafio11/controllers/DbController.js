import knex from 'knex';

/* se define la conecion de una base de datos*/
const mysql = {
      client: 'mysql',
      connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
      },
};
/* se define la conecion de una base de datos*/
const sqlite = {
      client: 'sqlite3',
      connection: {
            filename: './DB/ecommerce.sqlite',
      },
      useNullAsDefault: true,
};

/* Funcion para crear tabla*/
export async function createTableProduct() {
      const knexInstance = knex(mysql);
      try {
            const exist = await knexInstance.schema.hasTable('productos');
            if (exist) {
                  console.log('La tabla productos ya existe.');
                  return;
            }
            await knexInstance.schema.createTable('productos', (table) => {
                  table.increments('id').notNullable();
                  table.string('nombre', 15).notNullable();
                  table.string('codigo', 10).notNullable();
                  table.string('imagen', 100).notNullable();
                  table.float('precio').notNullable();
                  table.integer('stock').notNullable();
                  table.primary('id');
            });
            console.log('Tabla productos creada.');
      } catch (error) {
            console.error(error.message);
            throw error;
      } finally {
            knexInstance.destroy();
      }
}
export async function createTableMessage() {
      const knexInstance = knex(sqlite);
      try {
            const exist = await knexInstance.schema.hasTable('message');
            if (exist) {
                  console.log('La tabla productos ya existe.');
                  return;
            }
            await knexInstance.schema.createTable('message', (table) => {
                  table.increments('id').notNullable();
                  table.string('message', 255).notNullable();
                  table.string('email', 25).notNullable();
                  table.string('date', 30).notNullable();
            });
            console.log('Tabla productos creada.');
      } catch (error) {
            console.error(error.message);
            throw error;
      } finally {
            knexInstance.destroy();
      }
}

/*Funcion para insertar datos sirve para las 2 bases de datos y tablas*/
export async function insert(products, table, base) {
      const knexInstance = knex(eval(base));

      try {
            console.log('Se creo  con exito');
            await knexInstance(table).insert(products);
      } catch (error) {
            console.error(error);
            throw error;
      } finally {
            knexInstance.destroy();
      }
}
/*Funcion para obtener datos sirve para las 2 bases de datos y tablas*/
export async function get(table, base) {
      const knexInstance = knex(eval(base));
      try {
            const rows = await knexInstance(table).select('*');
            console.log(`items encontrados en la tabla ${table}:`, rows.length);
            return rows;
      } catch (error) {
            console.error(error);
            throw error;
      } finally {
            knexInstance.destroy();
      }
}
/* funcion para obtener por id*/
export async function getById(table, base, id) {
      const knexInstance = knex(eval(base));
      try {
            const row = await knexInstance(table).where({ id: id });
            return row[0];
      } catch (error) {
            console.error(error);
            throw error;
      } finally {
            knexInstance.destroy();
      }
}
/*Funcion para editar datos sirve para las 2 bases de datos y tablas*/
export async function update(data, conditons, table, base) {
      const knexInstance = knex(eval(base));
      try {
            await knexInstance(table).update(data).where(conditons);
            console.log('Items editados');
      } catch (error) {
            console.error(error.message);
            throw error;
      } finally {
            knexInstance.destroy();
      }
}

/*Funcion para Borrar  datos sirve para las 2 bases de datos y tablas*/
export async function delet(conditions, table, base) {
      const knexInstance = knex(eval(base));
      try {
            if (conditions) {
                  await knexInstance.from(table).del().where(conditions);
            } else {
                  await knexInstance.from(table).del();
            }
            console.log('Items eliminados');
      } catch (error) {
            console.error(error.message);
            throw error;
      } finally {
            knexInstance.destroy();
      }
}
