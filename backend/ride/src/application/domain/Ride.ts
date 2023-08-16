import { ObjectId } from 'mongodb';
import DistanceCalculator from './DistanceCalculator';
import Position from './Position';
import Segment from './Segment';
import UUIDGenerator from './UUIDGenerator';

export default class Ride {
  OVERNIGHT_FARE = 3.9;
  OVERNIGHT_SUNDAY_FARE = 5;
  SUNDAY_FARE = 2.9;
  NORMAL_FARE = 2.1;
  MIN_PRICE = 10;

  segments: Segment[] = [];
  positions: Position[] = [];

  constructor(
    readonly _id: ObjectId,
    readonly passengerId: string,
    readonly requestDate: Date,
    readonly rideStatus: string,
    readonly acceptDate: Date | null,
    readonly driverId: string | null,
    readonly startDate: Date | null,
    readonly endDate: Date | null,
    readonly waitingDuration: number | null
  ) {}

  static create(passengerId: string) {
    const _id = UUIDGenerator.create();
    return new Ride(_id, passengerId, new Date(), 'waiting_driver', null, null, null, null, null);
  }

  addPosition(lat: number, long: number, date: Date) {
    this.positions.push(new Position(lat, long, date));
  }

  calculate() {
    let price = 0;
    for (const [index, position] of this.positions.entries()) {
      const nextPosition = this.positions[index + 1];
      if (!nextPosition) break;
      const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
      const segment = new Segment(distance, nextPosition.date);
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
