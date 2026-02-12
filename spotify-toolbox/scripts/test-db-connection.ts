import { Pool } from 'pg';

async function testConnection() {
  console.log('Testing Supabase PostgreSQL connection...\n');
  
  const connectionString = process.env.SUPABASE_CONNECTION_STRING;
  
  if (!connectionString) {
    console.error('SUPABASE_CONNECTION_STRING was not found in environment variables');
    process.exit(1);
  }
  
  console.log('SUPABASE_CONNECTION_STRING found');
  console.log('Connection string format:', connectionString.split('@')[1]?.split('/')[0] || 'hidden\n');
  
  const pool = new Pool({
    connectionString,
  });
  
  try {
    console.log('Test 1: Establishing connection...');
    const client = await pool.connect();
    console.log(`Connection established\n`);
    
    console.log('Test 2: Running simple query...');
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version');
    console.log('Simple Query successful!');
    console.log(`Current time: [${result.rows[0].current_time}]`);
    console.log(`PostgreSQL version: ${result.rows[0].postgres_version.split(' ')[0]}\n`);
    
    console.log('Test 3: Checking database info...');
    const dbInfo = await client.query('SELECT current_database(), current_user');
    console.log('Database info:');
    console.log(`Database name: [${dbInfo.rows[0].current_database}]`);
    console.log(`Current user: [${dbInfo.rows[0].current_user}]\n`);
    
    console.log('Test 4: Listing existing tables...');
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    console.log('Existing tables in public schema:', 
      tables.rows.length > 0 ? tables.rows.map(t => t.tablename) : '(none yet)');
    console.log('');
    
    console.log('Test 5: Testing write permissions...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS _connection_test (
        id SERIAL PRIMARY KEY,
        test_value TEXT
      )
    `);
    await client.query(`INSERT INTO _connection_test (test_value) VALUES ('test')`);
    await client.query(`DROP TABLE _connection_test`);
    console.log('Write permissions confirmed\n');
    
    client.release();
    await pool.end();
    
    console.log('All connection tests passed!');
    console.log('You can now safely run:');
    console.log('npx dotenv -e .env.local -- npx @better-auth/cli generate');
    console.log('npx dotenv -e .env.local -- npx @better-auth/cli migrate');
    
    process.exit(0);
  } catch (error) {
    console.error('Connection test failed:\n');
    
    if (error instanceof Error) {
      console.error('Error:', error.message);
      console.error('');
      
      if (error.message.includes('password authentication failed')) {
        console.error('Potential issue with password in the SUPABASE_CONNECTION_STRING');
      } else if (error.message.includes('no pg_hba.conf entry')) {
        console.error('Check that your IP is allowed in Supabase settings');
        console.error('How? In the Supabase console: Project Settings > Database > Connection Pooling');
      } else if (error.message.includes('connect ETIMEDOUT') || error.message.includes('ENOTFOUND')) {
        console.error('Check your internet connection and Supabase host URL');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.error('Verify the database name in SUPABASE_CONNECTION_STRING');
      } else if (error.message.includes('SSL')) {
        console.error('Try adding ?sslmode=require to SUPABASE_CONNECTION_STRING');
      }
    } else {
      console.error(error);
    }
    
    await pool.end();
    process.exit(1);
  }
}

testConnection();