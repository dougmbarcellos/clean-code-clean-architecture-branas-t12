import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Driver from 'src/app/domain/Driver';
import { Nullable as NullableProperties } from 'src/app/domain/NullableProperties';

@Injectable({
  providedIn: 'root',
})
export class CreateDriverService {
  private httpClient = inject(HttpClient);

  createDriver(data: NullableProperties<Driver>) {
    return this.httpClient.post<any>('http://localhost:3000/drivers', data);
  }
}
