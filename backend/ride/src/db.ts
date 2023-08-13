// @ts-nocheck
require('dotenv').config({ path: './db.env' }); // backend/ride/db.env
import { MongoClient, ServerApiVersion } from 'mongodb';

// process.env.ATLAS_URI

const client = new MongoClient('mongodb://localhost:27017', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export { client };
