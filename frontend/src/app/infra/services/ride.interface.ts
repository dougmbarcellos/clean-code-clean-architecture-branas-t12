import { Observable } from 'rxjs';
import RidePositions from 'src/app/domain/ride-positions';

export interface IRide {
  calculate(positions: RidePositions): Observable<any>;
}
