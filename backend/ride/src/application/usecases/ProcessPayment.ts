import RideRepository from '../repository/RideRepository';

export default class ProcessPayment {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.processPayment(input.date);
    const output = await this.rideRepository.update(ride);
    return output;
  }
}

type Input = {
  rideId: string;
  date: Date;
};

type Output = any;
