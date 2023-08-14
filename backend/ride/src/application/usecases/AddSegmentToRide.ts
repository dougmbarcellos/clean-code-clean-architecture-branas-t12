import Segment from '../domain/Segment';
import RideRepository from '../repository/RideRepository';

export default class AddSegmentToRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const outputGet = await this.rideRepository.get(input.rideId);

    const [lastSegment] = outputGet.segments.slice(-1);
    const newSegment = new Segment(lastSegment.to, input.to, new Date());
    const segments = [...outputGet.segments, newSegment];

    const output = await this.rideRepository.addSegment(input.rideId, segments);
    return output;
  }
}

type Input = {
  rideId: string;
  to: number[];
};

type Output = any;
