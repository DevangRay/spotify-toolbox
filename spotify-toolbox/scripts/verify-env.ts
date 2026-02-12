function verifyEnv() {
    console.log('🔍 Verifying Environment Setup\n');

    const requiredVars = [
        'SUPABASE_CONNECTION_STRING',
        'BETTER_AUTH_SECRET',
        'BETTER_AUTH_URL',
    ];

    let allPresent = true;

    requiredVars.forEach(varName => {
        const value = process.env[varName];
        if (value) {
            console.log(`${varName}: Set as [${value}]`);
        } else {
            console.log(`${varName}: Missing`);
            allPresent = false;
        }
    });

    if (allPresent) {
        console.log(`Environment setup looks good! \n Next step: Run "npx tsx scripts/test-db-connection.ts"`);
    } else {
        console.log('Missing/invalid environment variables. Need to fix');
        process.exit(1);
    }
}

verifyEnv();