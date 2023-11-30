import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    isSmallScreen = false;
    isMobileMenuOpen = false;

    constructor(
        private auth: AuthService,
        public breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        this.breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
            this.isMobileMenuOpen = false;
            this.isSmallScreen = result.matches;
        });
    }

    logout() {
        this.auth.logout();
    }
}
