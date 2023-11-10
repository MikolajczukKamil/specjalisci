import {Component, Input, OnInit} from '@angular/core';
import {Geocoding, GeocodingService} from "./geocoding.service";
import * as turf from "@turf/turf";

@Component({
  selector: 'app-map-localisation',
  templateUrl: './map-localisation.component.html',
  styleUrls: ['./map-localisation.component.css']
})
export class MapLocalisationComponent implements OnInit {

  @Input()
  height: number = 1024

  @Input()
  width: number = 1024

  @Input()
  zoom: number = 15

  @Input()
  address: string = ''

  @Input()
  city: string = ''

  @Input()
  region: string = ''

  @Input()
  country: string = ''

  x: number = 21.000
  y: number = 52.229
  name: string = ''

  circle: any = {
    type: 'geojson',
    data: null
  };

  createCircle(): any {
    const center = [this.x, this.y];
    const radius = 5;
    const options = {steps: 50, units: 'kilometers', properties: {foo: 'bar'}};
    // @ts-ignore
    return turf.circle(center, radius, options);
  }

  public constructor(private geocodingService: GeocodingService) {}

  public ngOnInit() {
    this.geocodingService.getGeocoding(this.address, this.city, this.region, this.country).subscribe({
      next: value => {
        this.filterGeocoding(value)
        this.x = value?.features[0]?.center[0];
        this.y = value?.features[0]?.center[1];
        this.name = value?.features[0]?.place_name;
        this.circle.data = this.createCircle()
      }
    })
  }

  private filterGeocoding(value: Geocoding) {
    value.features = value?.features?.filter(feature => {
      const place = feature?.place_name?.toLowerCase()
      return place?.indexOf(this.city.toLowerCase()) != -1
    })
  }
}
