import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.local';
import { TokenService } from '../token.service';

@Injectable()
export class GeocodingService {
    private url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    private token = '';

    constructor(
        private client: HttpClient,
        private tokenService: TokenService
    ) {
        this.tokenService.getToken().subscribe(token => {
            this.token = token.map_token;
        });
    }

    getGeocoding(address: string, city: string, region: string, country: string): Observable<Geocoding> {
        return this.client.get<Geocoding>(
            this.url +
                encodeURIComponent(address + ' ' + city + ' ' + region + ' ' + country) +
                '.json?access_token=' +
                this.token
        );
    }

    getReverseGeocoding(x: number, y: number): Observable<Geocoding> {
        return this.client.get<Geocoding>(
            this.url + encodeURIComponent(x + ',' + y) + '.json?language=pl&types=address&access_token=' + this.token
        );
    }

    getCurrentLocation(): Promise<{ x: number; y: number }> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({ x: position.coords.longitude, y: position.coords.latitude });
                },
                error => {
                    reject(error);
                }
            );
        });
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
