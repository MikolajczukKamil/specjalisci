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

    orderService(payload: ServiceOrderPayload): Observable<unknown> {
        return this.client.post('/api/order', payload);
    }
}

export interface ServiceOrderPayload {
    specialistId: number;
    consumerId: number;
    specialistPricing: number;
    specialistDescription: string;
    startDate: string;
    estimatedTime: number;
    finalPrice: number;
    endDate: string;
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
    name: string;
    surname: string;
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
