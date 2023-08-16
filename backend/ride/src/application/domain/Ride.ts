import { ObjectId } from 'mongodb';
import DistanceCalculator from './DistanceCalculator';
import FareCalculatorFactory from './FareCalculatorFactory';
import Position from './Position';
import Segment from './Segment';
import UUIDGenerator from './UUIDGenerator';

export default class Ride {
  segments: Segment[] = [];
  positions: Position[] = [];
  MIN_PRICE = 10;

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
      const fareCalculator = FareCalculatorFactory.create(segment);
      price += fareCalculator.calculate(segment);
    }
    return price < this.MIN_PRICE ? this.MIN_PRICE : parseFloat(price.toFixed(2));
  }
}
