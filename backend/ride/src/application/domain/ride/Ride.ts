import { ObjectId } from 'mongodb';
import DistanceCalculator from '../distance/DistanceCalculator';
import FareCalculatorHandler from '../fare/chain_of_resposability/FareCalculatorHandler';
import NormalFareCalculatorHandler from '../fare/chain_of_resposability/NormalFareCalculatorHandler';
import OvernightFareCalculatorHandler from '../fare/chain_of_resposability/OvernightFareCalculatorHandler';
import OvernightSundayFareCalculatorHandler from '../fare/chain_of_resposability/OvernightSundayFareCalculatorHandler';
import SundayFareCalculatorHandler from '../fare/chain_of_resposability/SundayFareCalculatorHandler';
import UUIDGenerator from '../identity/UUIDGenerator';
import Position from './Position';
import Segment from './Segment';

export default class Ride {
  segments: Segment[] = [];
  positions: Position[] = [];
  MIN_PRICE = 10;
  fareCalculator: FareCalculatorHandler;

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
  ) {
    const overnightSundayFareCalculatorHandler = new OvernightSundayFareCalculatorHandler();
    const sundayFareCalculatorHandler = new SundayFareCalculatorHandler(
      overnightSundayFareCalculatorHandler
    );
    const overnightFareCalculator = new OvernightFareCalculatorHandler(sundayFareCalculatorHandler);
    this.fareCalculator = new NormalFareCalculatorHandler(overnightFareCalculator);
  }

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
      // const fareCalculator = FareCalculatorFactory.create(segment);
      // price += fareCalculator.calculate(segment);

      price += this.fareCalculator.handle(segment);
    }
    return price < this.MIN_PRICE ? this.MIN_PRICE : parseFloat(price.toFixed(2));
  }
}
