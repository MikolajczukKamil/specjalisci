import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.local';

@Injectable()
export class GeocodingService {
    private url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    private token = environment.mapToken;

    constructor(private client: HttpClient) {}

    getGeocoding(address: string, city: string, region: string, country: string): Observable<Geocoding> {
        return this.client.get<Geocoding>(
            this.url +
                encodeURIComponent(address + ' ' + city + ' ' + region + ' ' + country) +
                '.json?access_token=' +
                this.token
        );
    }
}

export interface Geocoding {
    type: string;
    features: GeocodingFeatures[];
}

export interface GeocodingFeatures {
    type: string;
    place_name: string;
    center: number[];
}

interface Geometry {
    type: string;
    coordinates: number[];
    properties: Properties;
}

interface Properties {
    title: string;
    description: string;
}
