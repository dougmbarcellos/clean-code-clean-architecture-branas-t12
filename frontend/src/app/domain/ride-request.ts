import RidePositions from './ride-positions';

export default interface RideRequest extends RidePositions {
  passengerId: string;
}
