import { Component, Input, OnInit } from '@angular/core';
import { Geocoding, GeocodingService } from './geocoding.service';
import * as turf from '@turf/turf';
import { Properties, Units } from '@turf/turf';
import { Map, MapboxEvent } from 'mapbox-gl';

@Component({
    selector: 'app-map-localisation',
    templateUrl: './map-localisation.component.html',
    styleUrls: ['./map-localisation.component.css'],
})
export class MapLocalisationComponent implements OnInit {
    @Input()
    zoom: number = 15;

    @Input()
    address: string = '';

    @Input()
    city: string = '';

    @Input()
    region: string = '';

    @Input()
    country: string = '';

    map!: Map;
    x: number = 21.0;
    y: number = 52.229;
    name: string = '';

    circle: any = {
        type: 'geojson',
        data: null,
    };

    createCircle(): any {
        const center = [this.x, this.y];
        const radius = 5;
        const options: { steps?: number; units?: Units; properties?: Properties } = {
            steps: 50,
            units: 'kilometers',
            properties: { foo: 'bar' },
        };
        return turf.circle(center, radius, options);
    }

    public constructor(private geocodingService: GeocodingService) {}

    public ngOnInit() {
        this.geocodingService.getGeocoding(this.address, this.city, this.region, this.country).subscribe({
            next: value => {
                this.filterGeocoding(value);
                this.x = value?.features[0]?.center[0];
                this.y = value?.features[0]?.center[1];
                this.name = value?.features[0]?.place_name;
                this.circle.data = this.createCircle();
            },
        });
    }

    private filterGeocoding(value: Geocoding) {
        value.features = value?.features?.filter(feature => {
            const place = feature?.place_name?.toLowerCase();
            return place?.indexOf(this.city.toLowerCase()) != -1;
        });
    }

    mapCreated(map: Map) {
        this.map = map;
    }

    mapLoaded(event: MapboxEvent) {
        this.map.resize();
    }
}
