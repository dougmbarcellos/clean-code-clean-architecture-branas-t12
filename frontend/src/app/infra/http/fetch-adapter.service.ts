import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class FetchAdapterService implements HttpClientService {
  get(url: string): Observable<any> {
    return from(window.fetch(url, { method: 'GET' }));
  }
  post(url: string, body: any): Observable<any> {
    return from(
      window.fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    ).pipe(switchMap((response) => from(response.json())));
  }
}
