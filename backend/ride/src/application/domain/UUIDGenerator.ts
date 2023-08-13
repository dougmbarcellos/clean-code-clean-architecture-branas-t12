import { ObjectId } from 'mongodb';

export default class UUIDGenerator {
  static create() {
    return new ObjectId();
  }
}
