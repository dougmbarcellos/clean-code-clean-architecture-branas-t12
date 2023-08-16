import Segment from '../../ride/Segment';

export default interface FareCalculatorHandler {
  next?: FareCalculatorHandler;
  handle(segment: Segment): number;
}
