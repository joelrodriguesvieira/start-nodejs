import 'dotenv/config'
import pkg from 'pg'

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados', err.stack);
  }
  console.log('Connected with the data base');
  release();
});

export default pool;