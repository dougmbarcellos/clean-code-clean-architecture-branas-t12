import Ride from '../domain/ride/Ride';
import RideRepository from '../repository/RideRepository';

export default class UpdateRideLocation {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.addLocation(input.location.lat, input.location.long, new Date(input.date));
    const output = await this.rideRepository.update(ride);
    return output;
  }
}

type Input = {
  rideId: string;
  location: { lat: number; long: number };
  date: string;
};

type Output = Ride;
