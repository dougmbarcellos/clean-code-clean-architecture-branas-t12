import Ride from '../domain/ride/Ride';
import RideRepository from '../repository/RideRepository';

export default class RequestRide {
  constructor(private rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = Ride.create(input.passengerId);
    for (const position of input.positions) {
      ride.addPosition(position.lat, position.long, new Date(position.date));
    }
    ride.calculate();
    const output = await this.rideRepository.insert(ride);
    return output;
  }
}

type Input = {
  passengerId: string;
  positions: { lat: number; long: number; date: string }[];
};

type Output = {
  _id: string;
};
