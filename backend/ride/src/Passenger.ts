import { ObjectId } from 'mongodb';
import CPFValidator from './CPFValidator';

function modelId(idName: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      initModelId() {
        const id = new ObjectId();
        (this as any)._id = id;
        (this as any)[idName] = id;
      }
    };
  };
}

class Model {
  constructor() {
    this.initModelId();
  }
  initModelId() {}
}

@modelId('passengerId')
export default class Passenger extends Model {
  passengerId!: ObjectId;

  constructor(private name: string, private email: string, private document: string) {
    super();
    this.validateRequired();
    new CPFValidator(this.document).validate();
  }

  validateRequired() {
    if (!this.name) throw new Error('Name is required');
    if (!this.email) throw new Error('Email is required');
  }
}
