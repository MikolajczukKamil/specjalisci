import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { DeviceSizeService } from '../services/deviceSize/device-size.service';
import { Subject, takeUntil } from 'rxjs';
import { FiltersComponent } from './filters/filters.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceOrderingComponent } from '../service-ordering/service-ordering.component';
import { ServiceFilters, ServiceModel, ServicesService } from './serviceModel';
import { MapLocalisationComponent } from '../map/map-localisation/map-localisation.component';
import { isEqual } from 'lodash';
import { Filters } from './filters/filters.model';
import { FILTERS_NAME_MAPPING } from './filters/filters-mapping.model';
import { GeocodingService } from '../map/map-localisation/geocoding.service';
import { Router } from '@angular/router';

type NavigationMode = 'list' | 'map' | 'filters';

export interface Service {
    name: string;
    cityName: string;
    minPrice: number;
    maxPrice: number;
    image: string;
    location: {
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild('mapComponent') mapComponent!: MapLocalisationComponent;
    @ViewChildren('serviceItem') serviceItems!: QueryList<ElementRef<HTMLDivElement>>;

    navigationMode: NavigationMode = 'list';
    isMapVisited: boolean = false;
    isSmallScreen: boolean = false;
    destroy = new Subject<boolean>();
    selectedService: ServiceModel | null = null;
    services: ServiceModel[] = [];
    distance: number = 100;
    workMode: string | undefined = undefined;

    constructor(
        private auth: AuthService,
        private deviceSizeService: DeviceSizeService,
        public dialog: MatDialog,
        private servicesService: ServicesService,
        private geocodingService: GeocodingService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.deviceSizeService
            .getIsSmallScreen()
            .pipe(takeUntil(this.destroy))
            .subscribe(isSmallScreen => {
                this.navigationMode = 'list';
                this.isSmallScreen = isSmallScreen;
            });

        this.geocodingService
            .getCurrentLocation()
            .then(location => {
                this.fetchServices({
                    Location: '',
                    CategoryOrServiceName: '',
                    UserCoordinateX: location.x,
                    UserCoordinateY: location.y,
                });
            })
            .catch(error => {
                this.fetchServices({ Location: '', CategoryOrServiceName: '' });
            });
    }

    changeNavigationMode(event: MatButtonToggleChange) {
        const mode: NavigationMode = event.value;
        this.navigationMode = mode;
        if (mode === 'map') {
            this.isMapVisited = true;
        }
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }

    fetchServices(filters: ServiceFilters) {
        this.servicesService.getServices(filters).subscribe(value => {
            // swap x with y
            value.forEach(service => {
                const x = service.locationCoordinatesX;
                service.locationCoordinatesX = service.locationCoordinatesY;
                service.locationCoordinatesY = x;
            });

            if (this.workMode != undefined) {
                value = value.filter(service => {
                    return service?.operatingMode == this.workMode;
                });
            }

            this.services = value;
        });
    }

    openFilters() {
        const dialogRef = this.dialog.open(FiltersComponent, { width: '500px', height: '500px' });
        dialogRef.afterClosed().subscribe(result => {
            const filters = result as Filters;
            let serviceName: string | undefined = '';

            if (filters?.builder.length > 0) {
                serviceName = FILTERS_NAME_MAPPING.get(filters.builder[0]);
            }

            if (filters?.it.length > 0) {
                serviceName = FILTERS_NAME_MAPPING.get(filters.it[0]);
            }

            if (filters?.services.length > 0) {
                serviceName = FILTERS_NAME_MAPPING.get(filters.services[0]);
            }

            if (filters?.services?.length > 0) {
                this.distance = parseInt(FILTERS_NAME_MAPPING.get(filters.services[0]) as string);
            } else {
                this.distance = 100;
            }

            if (filters?.work?.length > 0) {
                this.workMode = FILTERS_NAME_MAPPING.get(filters?.work[0]);
            } else {
                this.workMode = undefined;
            }

            this.fetchServices({ Location: '', CategoryOrServiceName: serviceName ?? '' });
        });
    }

    openServiceButton(service: ServiceModel) {
        this.dialog.open(ServiceOrderingComponent, { width: '460px', height: '780px' });
    }

    selectService(service: ServiceModel) {
        this.selectedService = service;

        this.scrollToSelectedService();
    }

    goToLocation(service: ServiceModel) {
        if (this.mapComponent) {
            this.mapComponent.flyTo({
                center: [service.locationCoordinatesX, service.locationCoordinatesY],
                zoom: 13,
            });
        }
    }

    scrollToSelectedService() {
        if (this.selectedService) {
            const selectedIndex = this.services.findIndex(s => isEqual(s, this.selectedService));
            if (selectedIndex !== undefined) {
                this.serviceItems
                    .get(selectedIndex)
                    ?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        }
    }

    isSelected(service: ServiceModel) {
        return isEqual(service, this.selectedService);
    }

    navigateToProfile(id: string | number) {
        this.router.navigate(['/profile-overview/' + id]);
    }
}
