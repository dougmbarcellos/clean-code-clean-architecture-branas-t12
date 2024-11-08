import UUIDGenerator from '../domain/identity/UUIDGenerator';
import Ride from '../domain/ride/Ride';

export default class CalculateRide {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const ride = Ride.create(UUIDGenerator.create().toString());
    for (const position of input.positions) {
      ride.addPosition(position.lat, position.long, new Date(position.date));
    }
    const price = ride.calculate();

    return { price };
  }
}

type Input = {
  positions: { lat: number; long: number; date: string }[];
};

type Output = {
  price: number;
};
