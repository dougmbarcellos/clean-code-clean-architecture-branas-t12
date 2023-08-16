import Ride from '../domain/ride/Ride';
import RideRepository from '../repository/RideRepository';

export default class GetRide {
  constructor(private rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const output = await this.rideRepository.get(input.rideId);
    return output;
  }
}

type Output = Ride;

type Input = {
  rideId: string;
};
