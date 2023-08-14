import RideRepository from '../repository/RideRepository';

export default class StartRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const output = await this.rideRepository.start(input.rideId);
    return output;
  }
}

type Input = {
  rideId: string;
};

type Output = any;
