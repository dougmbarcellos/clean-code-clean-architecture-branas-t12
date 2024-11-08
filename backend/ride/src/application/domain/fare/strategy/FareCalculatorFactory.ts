import Segment from '../../ride/Segment';
import NormalFareCalculator from './NormalFareCalculator';
import OvernightFareCalculator from './OvernightFareCalculator';
import OvernightSundayFareCalculator from './OvernightSundayFareCalculator';
import SundayFareCalculator from './SundayFareCalculator';

// Dynamic Static Factory.
export default class FareCalculatorFactory {
  constructor() {}

  static create(segment: Segment) {
    if (segment.isOvernight() && !segment.isSunday()) {
      return new OvernightFareCalculator();
    }
    if (segment.isOvernight() && segment.isSunday()) {
      return new OvernightSundayFareCalculator();
    }
    if (!segment.isOvernight() && segment.isSunday()) {
      return new SundayFareCalculator();
    }
    if (!segment.isOvernight() && !segment.isSunday()) {
      return new NormalFareCalculator();
    }
    throw new Error('Invalid segment');
  }
}
