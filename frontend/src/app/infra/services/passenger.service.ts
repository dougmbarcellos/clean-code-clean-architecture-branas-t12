import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NullableProperties } from 'src/app/domain/nullable-properties';
import Passenger from 'src/app/domain/passenger';
import { HttpClientService } from '../http/http-client.service';
import IPassenger from './passenger.interface';

@Injectable({
  providedIn: 'root',
})
export class PassengerService implements IPassenger {
  private httpClient = inject(HttpClientService);

  get(passengerId: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  save(passenger: NullableProperties<Passenger>): Observable<any> {
    return this.httpClient.post('http://localhost:3000/passengers', passenger);
  }
}
