import { Pool } from 'pg';

async function verifyTables() {
  const pool = new Pool({
    connectionString: process.env.SUPABASE_CONNECTION_STRING,
  });

  try {
    const client = await pool.connect();
    
    console.log('Checking for better-auth tables...\n');
    
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    
    const requiredTables = ['user', 'session', 'account', 'verification'];
    
    console.log('Tables found in database:');
    tables.rows.forEach((table: any) => {
      const isRequired = requiredTables.includes(table.tablename);
      console.log(`${isRequired ? 'Found: ' : '  '} ${table.tablename}`);
    });
    console.log();
    
    const missingTables = requiredTables.filter(
      table => !tables.rows.some((t: any) => t.tablename === table)
    );
    
    if (missingTables.length === 0) {
      console.log('All required better-auth tables exist!');
    } else {
      console.log('Missing tables:', missingTables);
      console.log('Run: npx @better-auth/cli migrate');
    }
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('Error verifying tables:', error);
    await pool.end();
    process.exit(1);
  }
}

verifyTables();