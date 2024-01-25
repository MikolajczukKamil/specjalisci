import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicesService {
    private url = '/api/search';

    constructor(private client: HttpClient) {}

    getServices(filters: ServiceFilters): Observable<ServiceModel[]> {
        return this.client.post<ServiceModel[]>(this.url, filters);
    }
}

export interface ServiceFilters {
    Location: string;
    PriceMax?: number;
    PriceMin?: number;
    CategoryOrServiceName: string;
    RatingMax?: number;
    RatingMin?: number;
    UserCoordinateX?: number;
    UserCoordinateY?: number;
}

export interface ServiceModel {
    serviceId: number;
    serviceName: string;
    avatar: number;
    maxPrice: number;
    minPrice: number;
    operatingMode: string;
    categoryName: string;
    categoryId: number;
    userId: number;
    rating: number;
    fullName: string;
    location: string;
    locationCoordinatesX: number;
    locationCoordinatesY: number;
    distance: number;
}
