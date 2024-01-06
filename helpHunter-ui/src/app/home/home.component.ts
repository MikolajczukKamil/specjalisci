import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { DeviceSizeService } from '../services/deviceSize/device-size.service';
import { Subject, takeUntil } from 'rxjs';
import {FiltersComponent} from "./filters/filters.component";
import {MatDialog} from "@angular/material/dialog";
import { ServiceOrderingComponent } from '../service-ordering/service-ordering.component';

type NavigationMode = 'list' | 'map' | 'filters';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    navigationMode: NavigationMode = 'list';
    isMapVisited: boolean = false;
    isSmallScreen: boolean = false;
    destroy = new Subject<boolean>();

    constructor(
        private auth: AuthService,
        private deviceSizeService: DeviceSizeService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.deviceSizeService
            .getIsSmallScreen()
            .pipe(takeUntil(this.destroy))
            .subscribe(isSmallScreen => {
                this.navigationMode = 'list';
                this.isSmallScreen = isSmallScreen;
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

  openFilters() {
        this.dialog.open(FiltersComponent, { width: '500px', height: '500px' });
  }

  openServiceButton() {
    this.dialog.open(ServiceOrderingComponent, { width: '460px', height: '780px' });
}
}
