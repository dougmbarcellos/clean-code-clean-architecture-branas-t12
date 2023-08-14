import { ObjectId } from 'mongodb';
import Segment from './Segment';
import UUIDGenerator from './UUIDGenerator';

export default class Ride {
  OVERNIGHT_FARE = 3.9;
  OVERNIGHT_SUNDAY_FARE = 5;
  SUNDAY_FARE = 2.9;
  NORMAL_FARE = 2.1;
  MIN_PRICE = 10;

  constructor(
    readonly _id: ObjectId,
    readonly passengerId: string,
    readonly segments: Segment[],
    readonly requestDate: Date,
    readonly rideStatus: string,
    readonly driverId: string | null
  ) {}

  static create(passengerId: string, segment: Segment) {
    const _id = UUIDGenerator.create();
    return new Ride(_id, passengerId, [segment], new Date(), 'waiting_driver', null);
  }

  addSegment(segment: Segment) {
    this.segments.push(segment);
  }

  calculate() {
    let price = 0;
    for (const segment of this.segments) {
      if (segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * this.OVERNIGHT_FARE;
      }
      if (segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * this.OVERNIGHT_SUNDAY_FARE;
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * this.SUNDAY_FARE;
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * this.NORMAL_FARE;
      }
    }
    return price < this.MIN_PRICE ? this.MIN_PRICE : parseFloat(price.toFixed(2));
  }
}
