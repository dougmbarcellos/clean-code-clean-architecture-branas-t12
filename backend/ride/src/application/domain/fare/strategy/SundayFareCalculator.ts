import Segment from '../../ride/Segment';
import FareCalculator from './FareCalculator';

export default class SundayFareCalculator implements FareCalculator {
  FARE = 2.9;

  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}
