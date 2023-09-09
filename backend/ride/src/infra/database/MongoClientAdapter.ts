import { client } from '../../db';
import DatabaseConnection from './DatabaseConnection';

// Frameworks and Drivers
export default class MongoClientAdapter implements DatabaseConnection {
  constructor() {}

  async findOne(collectionName: string, ...args: any) {
    await client.connect();
    return (
      client
        .db('db1')
        .collection(collectionName)
        // @ts-ignore
        .findOne(...args)
    );
  }

  async updateOne(collectionName: string, ...args: any) {
    await client.connect();
    return (
      client
        .db('db1')
        .collection(collectionName)
        // @ts-ignore
        .updateOne(...args)
    );
  }

  async findOneAndUpdate(collectionName: string, ...args: any) {
    await client.connect();
    return (
      client
        .db('db1')
        .collection(collectionName)
        // @ts-ignore
        .findOneAndUpdate(...args)
    );
  }

  async insertOne(collectionName: string, ...args: any) {
    await client.connect();
    return (
      client
        .db('db1')
        .collection(collectionName)
        // @ts-ignore
        .insertOne(...args)
    );
  }

  async watch(collectionName: string, ...args: any) {
    await client.connect();
    return client
      .db('db1')
      .collection(collectionName)
      .watch(...args);
  }

  async close(): Promise<void> {
    // Desabilitado fechamento da conexão pois ao utilizar o .watch()
    // novas conexões abertas estavam causando erro.
    // await client.close();
  }
}
