import type { Db } from "mongodb";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(uri: string): Promise<Db> {
  if (db) return db;
  if (!uri) throw new Error("Missing URI");

  client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db();
    return db;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
