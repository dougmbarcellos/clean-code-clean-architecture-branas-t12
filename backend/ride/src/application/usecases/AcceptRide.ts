import RideRepository from '../repository/RideRepository';

export default class AcceptRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const output = await this.rideRepository.accept(input.rideId, input.driverId);
    return output;
  }
}

type Input = {
  rideId: string;
  driverId: string;
};

type Output = any;
