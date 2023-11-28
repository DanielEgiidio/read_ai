import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/better-sqlite3";


neonConfig.fetchConnectionCache = true;


if(!process.env.DATABASE_URL) {
    throw new Error ("O banco de dados não foi encontrado meu nobre 😔")
}

const sql = neon(process.env.DATABASE_URL);


export const d = drizzle(sql);
