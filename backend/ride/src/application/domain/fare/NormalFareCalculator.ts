import Segment from '../ride/Segment';
import FareCalculator from './FareCalculator';

export default class NormalFareCalculator implements FareCalculator {
  FARE = 2.1;

  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}
