import Ride from '../domain/Ride';

export default class CalculateRide {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const ride = new Ride();
    for (const segment of input.segments) {
      ride.addSegment(segment.from, segment.to, new Date(segment.date));
    }
    const price = ride.calculate();

    return { price };
  }
}

type Input = {
  segments: { from: number[]; to: number[]; date: Date }[];
};

type Output = {
  price: number;
};
