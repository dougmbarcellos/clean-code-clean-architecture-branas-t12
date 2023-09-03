import { Observable } from 'rxjs';
import RidePositions from 'src/app/domain/ride-positions';
import RideRequest from 'src/app/domain/ride-request';

export interface IRide {
  calculate(positions: RidePositions): Observable<{ price: number }>;
  request(rideRequest: RideRequest): Observable<any>;
}
