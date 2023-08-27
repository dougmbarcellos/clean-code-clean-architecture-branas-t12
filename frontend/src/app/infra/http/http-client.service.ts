import { Observable } from 'rxjs';

export abstract class HttpClientService {
  abstract get(url: string): Observable<any>;
  abstract post(url: string, body: any): Observable<any>;
}
