// @ts-nocheck
require('dotenv').config({ path: './db.env' }); // backend/ride/db.env
import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  const connection = await client.connect();

  return connection.db('db1');
}

export { connect };
