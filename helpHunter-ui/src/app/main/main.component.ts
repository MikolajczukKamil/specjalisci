import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { DeviceSizeService } from '../services/deviceSize/device-size.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
    isSmallScreen = false;
    destroy = new Subject<boolean>();

    constructor(
        private auth: AuthService,
        public deviceSizeService: DeviceSizeService
    ) {}

    ngOnInit(): void {
        this.deviceSizeService
            .getIsSmallScreen()
            .pipe(takeUntil(this.destroy))
            .subscribe(result => {
                this.isSmallScreen = result;
            });
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }
}
