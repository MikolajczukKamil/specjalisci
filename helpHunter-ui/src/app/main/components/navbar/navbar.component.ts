import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DeviceSizeService } from '../../../services/deviceSize/device-size.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    isSmallScreen = false;
    isMobileMenuOpen = false;
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
                this.isMobileMenuOpen = false;
                this.isSmallScreen = result;
            });
    }

    logout() {
        this.auth.logout();
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }
}
