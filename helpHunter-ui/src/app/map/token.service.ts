import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class TokenService {

  private url = 'http://95.217.193.230:9999/api/config';

  constructor(private client: HttpClient) {}

  getToken(): Observable<MapToken> {
    return this.client.get<MapToken>(this.url);
  }
}

export interface MapToken {
  map_token: string
}
