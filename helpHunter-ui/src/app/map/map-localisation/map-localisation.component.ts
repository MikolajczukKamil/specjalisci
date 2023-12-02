import { Component, Input, OnInit } from '@angular/core';
import * as turf from '@turf/turf';
import { Properties, Units } from '@turf/turf';
import {Map, MapboxEvent, Point} from 'mapbox-gl';
import {Marker} from "./marker.model";

@Component({
    selector: 'app-map-localisation',
    templateUrl: './map-localisation.component.html',
    styleUrls: ['./map-localisation.component.css'],
})
export class MapLocalisationComponent implements OnInit {

    @Input()
    markers: Marker[] = [
      { name: "Marker 1", coordinates: {x: 21.0, y: 52.229} } as Marker,
      { name: "Marker 2", coordinates: {x: 22.0, y: 53.228} } as Marker
    ]

    map!: Map;
    zoom: number = 5.5;
    center: Point = { x: 19.70, y: 52.10 } as Point

    createCircle(x : number, y: number): any {
        const center = [x, y];
        const radius = 5;
        const options: { steps?: number; units?: Units; properties?: Properties } = {
            steps: 50,
            units: 'kilometers',
            properties: { foo: 'bar' },
        };
        return turf.circle(center, radius, options);
    }

    public ngOnInit() {}

    mapCreated(map: Map) {
        this.map = map;
    }

    mapLoaded(event: MapboxEvent) {
        this.map.resize();
    }
}
