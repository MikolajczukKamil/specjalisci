import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeviceSizeService {
    private isSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isMediumScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
            this.isSmallScreen.next(result.matches);
        });
        this.breakpointObserver.observe(['(max-width: 1024px)']).subscribe(result => {
            this.isMediumScreen.next(result.matches);
        });
    }

    getIsSmallScreen(): Observable<boolean> {
        return this.isSmallScreen.asObservable();
    }

    getIsMediumScreen(): Observable<boolean> {
        return this.isMediumScreen.asObservable();
    }
}
