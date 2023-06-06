import {Pool} from "pg";
// Configure the connection to your PostgreSQL database
const pool = new Pool({
  user: 'inamnurul',
  host: '40.121.213.176',
  database: 'postgres',
  password: 'idontknowwhoiam',
  port: 5432, // or the port number you're using
});

export default pool