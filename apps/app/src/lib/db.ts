import { Surreal } from 'surrealdb'
import { surrealdbWasmEngines } from '@surrealdb/wasm'

interface DbConfig {
  url: string
  namespace: string;
  database: string;
}

const DEFAULT_CONFIG: DbConfig = {
  url: "indxdb://surrealnotes",
  namespace: "surrealnotes",
  database: "local",
};

export async function getDb(config: DbConfig = DEFAULT_CONFIG): Promise<Surreal> {
  let db: Surreal | null = null;

  if (db) return db;

  db = new Surreal({
    engines: surrealdbWasmEngines(),
  });

  try {
    await db.connect(config.url);
    await db.use({ namespace: config.namespace, database: config.database });
    return db;
  } catch (err) {
    console.error("Failed to connect to SurrealDB:", err instanceof Error ? err.message : String(err));
    await closeDb();
    throw err;
  }
}

const db: Surreal = await getDb();


export async function closeDb() {
  if (db) {
    await db.close();
  }
}

export { db };
