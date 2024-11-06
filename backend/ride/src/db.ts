// @ts-nocheck
require('dotenv').config({ path: './db.env' }); // backend/ride/db.env
import { MongoClient, ServerApiVersion } from 'mongodb';

// Url local para testes. Utilizar variável de ambiente process.env.ATLAS_URI.
const client = new MongoClient('mongodb://127.0.0.1:27017', {
  replicaSet: 'rs0',
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export { client };
