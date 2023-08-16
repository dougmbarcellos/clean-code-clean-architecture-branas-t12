import Segment from '../../ride/Segment';

// Template Method
export default abstract class FareCalculatorHandler {
  abstract FARE: number;

  constructor(readonly next?: FareCalculatorHandler) {}

  abstract handle(segment: Segment): number;

  calculate(segment: Segment) {
    return segment.distance * this.FARE;
  }
}
