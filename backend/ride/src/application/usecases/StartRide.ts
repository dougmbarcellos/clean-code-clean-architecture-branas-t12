import RideRepository from '../repository/RideRepository';

export default class StartRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.start(new Date());
    const output = await this.rideRepository.update(ride);
    return output;
  }
}

type Input = {
  rideId: string;
};

type Output = any;
