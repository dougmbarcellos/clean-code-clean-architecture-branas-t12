import Ride from '../domain/Ride';
import Segment from '../domain/Segment';
import UUIDGenerator from '../domain/UUIDGenerator';

export default class CalculateRide {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const [firstSegment, ...nextSegments] = input.segments;
    const ride = Ride.create(UUIDGenerator.create().toString(), firstSegment);
    for (const segment of nextSegments) {
      ride.addSegment(segment);
    }
    const price = ride.calculate();

    return { price };
  }
}

type Input = {
  segments: Segment[];
};

type Output = {
  price: number;
};
