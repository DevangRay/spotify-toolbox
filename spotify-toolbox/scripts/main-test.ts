import { verifyEnv } from './verify-env';
import { testConnection } from './test-db-connection';
import { verifyTables } from './verify-tables';

console.log("Starting test script...")
console.log("=============================================================");
console.log("Step 1: Verifying environment variables...\n");
verifyEnv();
console.log('Next step: Run "test-db-connection.ts"')
console.log("=============================================================\n");

console.log("=============================================================");
console.log("Step 2: Testing database connection...\n");
console.log('Next step: Run "verify-tables.ts"');

testConnection()
    .then(() => {
        console.log("=============================================================\n");

        console.log("=============================================================");
        console.log("Step 3: Verifying better-auth tables...\n");
        verifyTables()
            .then(() => {
                console.log("Test script complete!");
                console.log("=============================================================\n");

                console.log('You can now safely run:');
                console.log('npx dotenv -e .env.local -- npx @better-auth/cli generate');
                console.log('npx dotenv -e .env.local -- npx @better-auth/cli migrate');
                process.exit(0);
            })
    })