import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as turf from '@turf/turf';
import { Properties, Units } from '@turf/turf';
import { Map, MapboxEvent, Point, FlyToOptions } from 'mapbox-gl';
import { Marker } from './marker.model';
import { Service } from '../../home/home.component';
import { Subject, takeUntil } from 'rxjs';
import { TokenService } from '../token.service';
import {ServiceModel} from "../../home/serviceModel";

@Component({
    selector: 'app-map-localisation',
    templateUrl: './map-localisation.component.html',
    styleUrls: ['./map-localisation.component.css'],
})
export class MapLocalisationComponent implements OnInit {
    @Input()
    services: ServiceModel[] = [];

    @Output()
    clickOnMarker = new EventEmitter<ServiceModel>();

    map!: Map;
    zoom: number = 5.5;
    center: Point = { x: 19.7, y: 52.1 } as Point;
    accessToken = '';
    destroy = new Subject<boolean>();

    constructor(private tokenService: TokenService) {}

    createCircle(x: number, y: number): any {
        const center = [x, y];
        const radius = 5;
        const options: { steps?: number; units?: Units; properties?: Properties } = {
            steps: 50,
            units: 'kilometers',
            properties: { foo: 'bar' },
        };
        return turf.circle(center, radius, options);
    }

    ngOnInit(): void {
        this.tokenService
            .getToken()
            .pipe(takeUntil(this.destroy))
            .subscribe(token => {
                this.accessToken = token.map_token;
            });
    }

    mapCreated(map: Map) {
        this.map = map;
    }

    mapLoaded(event: MapboxEvent) {
        this.map.resize();
    }

    flyTo(options: FlyToOptions) {
        this.map.flyTo(options);
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }
}
