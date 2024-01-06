import { Component } from '@angular/core';
import { EventData, Map, MapboxEvent } from 'mapbox-gl';
import { MapService } from 'ngx-mapbox-gl';
import { GeocodingService } from '../map-localisation/geocoding.service';

export type Coordinates = [number, number];

@Component({
    selector: 'app-map-select-location',
    templateUrl: './map-select-location.component.html',
    styleUrls: ['./map-select-location.component.css'],
})
export class MapSelectLocationComponent {
    map!: Map;
    markerCoordinates: Coordinates = [19.24, 52.011];

    constructor(
        private mapboxService: MapService,
        private geocodingService: GeocodingService
    ) {}

    onMapDrag(event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData) {
        this.markerCoordinates = event.target.getCenter().toArray() as Coordinates;
    }

    onMapDragEnd(event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData) {
        this.geocodingService
            .getReverseGeocoding(this.markerCoordinates[0], this.markerCoordinates[1])
            .subscribe(data => {
                console.log(data.features[0]);
            });
    }

    mapCreated(map: Map) {
        this.map = map;
    }

    mapLoaded(event: MapboxEvent) {
        this.map.resize();
    }
}
