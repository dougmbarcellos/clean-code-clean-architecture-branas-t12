import { Observable } from 'rxjs';
import { NullableProperties } from 'src/app/domain/nullable-properties';
import Passenger from 'src/app/domain/passenger';

export default interface IPassenger {
  get(passengerId: string): Observable<any>;
  save(passenger: NullableProperties<Passenger>): Observable<any>;
}
