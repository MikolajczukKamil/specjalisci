import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class ServicesService {

  private url = 'http://95.217.193.230:9999/api/search';

  constructor(private client: HttpClient) {}

  getServices(filters: ServiceFilters): Observable<ServicesService[]> {
    return this.client.post<ServicesService[]>(this.url, filters);
  }
}

export interface ServiceFilters {
  Location: string,
  PriceMax: number
  PriceMin: number
  CategoryOrServiceName: string
  RatingMax: number
  RatingMin: number
  UserCoordinateX: number
  UserCoordinateY: number
}

export interface ServicesService {
  ServiceId : string,
  ServiceName : string,
  MaxPrice : number,
  MinPrice : number,
  OperatingMode : string,
  CategoryName : string,
  CategoryId : string,
  UserId : string,
  Rating : number,
  FullName : string,
  Location: string,
  LocationCoordinatesX : number,
  LocationCoordinatesY : number,
  Distance : number
}
