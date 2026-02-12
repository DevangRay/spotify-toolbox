import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.SUPABASE_CONNECTION_STRING,
    }),

    // emailAndPassword: {
    //     enabled: true,
    // },

    socialProviders: {
        // github: {
        //     clientId: process.env.GITHUB_CLIENT_ID as string,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        // },
        spotify: {
            clientId: process.env.AUTH_SPOTIFY_ID!,
            clientSecret: process.env.AUTH_SPOTIFY_SECRET!,
        },
    },
});