import Ride from '../domain/Ride';
import Segment from '../domain/Segment';
import RideRepository from '../repository/RideRepository';

export default class RequestRide {
  constructor(private rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const segment = new Segment(input.from, input.to, new Date(input.segmentDate));
    const ride = Ride.create(input.passengerId, segment);
    const output = await this.rideRepository.save(ride);
    return output;
  }
}

type Input = {
  passengerId: string;
  from: number[];
  to: number[];
  segmentDate: string;
};

type Output = {
  rideId: string;
};
