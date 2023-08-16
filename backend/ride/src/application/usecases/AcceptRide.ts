import RideRepository from '../repository/RideRepository';

export default class AcceptRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.accept(input.driverId, new Date());
    const output = await this.rideRepository.update(ride);
    return output;
  }
}

type Input = {
  rideId: string;
  driverId: string;
};

type Output = any;
