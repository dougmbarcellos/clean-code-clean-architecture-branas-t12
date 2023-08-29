import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import Driver from 'src/app/domain/driver';
import { NullableProperties } from 'src/app/domain/nullable-properties';
import { HttpClientService } from '../http/http-client.service';
import IDriver from './driver.interface';

@Injectable({
  providedIn: 'root',
})
export class DriverService implements IDriver {
  private httpClient = inject(HttpClientService);

  get(driverId: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  save(driver: NullableProperties<Driver>): Observable<any> {
    return this.httpClient.post('/drivers', driver);
  }
}
