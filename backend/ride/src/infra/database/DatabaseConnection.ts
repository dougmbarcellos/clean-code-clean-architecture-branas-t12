import { ChangeStream } from 'mongodb';

// ISP - Interface Segregation Principle (cama Interface Adapters)
export default interface DatabaseConnection {
  insertOne(collectionName: string, ...args: any): Promise<any>;
  findOne(collectionName: string, ...args: any): Promise<any>;
  updateOne(collectionName: string, ...args: any): Promise<any>;
  findOneAndUpdate(collectionName: string, ...args: any): Promise<any>;
  watch(collectionName: string, ...args: any): Promise<ChangeStream>;
  close(): Promise<void>;
}
