// ISP - Interface Segregation Principle (cama Interface Adapters)
export default interface DatabaseConnection {
  insertOne(collectionName: string, ...args: any): Promise<any>;
  findOne(collectionName: string, ...args: any): Promise<any>;
  findOneAndUpdate(collectionName: string, ...args: any): Promise<any>;
  close(): Promise<void>;
}
