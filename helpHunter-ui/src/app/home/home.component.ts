import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { DeviceSizeService } from '../services/deviceSize/device-size.service';
import { Subject, takeUntil } from 'rxjs';
import { FiltersComponent } from './filters/filters.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceOrderingComponent } from '../service-ordering/service-ordering.component';
import {ServiceFilters, ServiceModel, ServicesService} from "./serviceModel";
import { MapLocalisationComponent } from '../map/map-localisation/map-localisation.component';
import { isEqual } from 'lodash';
import {TokenService} from "../map/token.service";
import {environment} from "../../environments/environment.local";

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
    selectedService: Service | null = null;

    services = [
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 52.229,
                    lng: 21.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar2',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 53,
                    lng: 23.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 40,
                    lng: 29.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 53,
                    lng: 25.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar3',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 20,
                    lng: 21.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 58,
                    lng: 21.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 50.229,
                    lng: 24.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 2001,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 50.229,
                    lng: 24.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 201,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 50.229,
                    lng: 24.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 240,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 50.229,
                    lng: 24.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 100,
            maxPrice: 200,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 50.22,
                    lng: 24.0,
                },
            },
        },
        {
            name: 'Mariusz Kowalski',
            cityName: 'Warszawa',
            minPrice: 150,
            maxPrice: 200,
            image: 'avatar1',
            location: {
                address: 'Warszawa 00-00, ul. Kowalska 1',
                coordinates: {
                    lat: 50.229,
                    lng: 24.0,
                },
            },
        },
    ];

    constructor(
        private auth: AuthService,
        private deviceSizeService: DeviceSizeService,
        public dialog: MatDialog,
        private servicesService: ServicesService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.deviceSizeService
            .getIsSmallScreen()
            .pipe(takeUntil(this.destroy))
            .subscribe(isSmallScreen => {
                this.navigationMode = 'list';
                this.isSmallScreen = isSmallScreen;
            });

        this.tokenService.getToken().subscribe(token => {
            environment.mapToken = token.map_token
        })
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

    openFilters() {
        this.dialog.open(FiltersComponent, { width: '500px', height: '500px' });
    }

    openServiceButton(service: Service) {
        this.dialog.open(ServiceOrderingComponent, { width: '460px', height: '780px' });
    }

    selectService(service: Service) {
        this.selectedService = service;

        this.scrollToSelectedService();
    }

    goToLocation(service: Service) {
        if (this.mapComponent) {
            this.mapComponent.flyTo({
                center: [service.location.coordinates.lng, service.location.coordinates.lat],
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

    isSelected(service: Service) {
        return isEqual(service, this.selectedService);
    }
}
