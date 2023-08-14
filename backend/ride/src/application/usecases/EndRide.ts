import RideRepository from '../repository/RideRepository';

export default class EndRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const outputGet = await this.rideRepository.get(input.rideId);
    const endDate = new Date();
    const waitingDuration = endDate.valueOf() - new Date(outputGet.startDate!).valueOf();
    const output = await this.rideRepository.end(input.rideId, endDate, waitingDuration);
    return output;
  }
}

type Input = {
  rideId: string;
};

type Output = any;
