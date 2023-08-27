import { Observable } from 'rxjs';
import Driver from 'src/app/domain/driver';
import { NullableProperties } from 'src/app/domain/nullable-properties';

export default interface IDriver {
  get(driverId: string): Observable<any>;
  save(driver: NullableProperties<Driver>): Observable<any>;
}
