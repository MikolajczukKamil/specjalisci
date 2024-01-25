import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceSizeService } from '../../services/deviceSize/device-size.service';
import { Subject, takeUntil } from 'rxjs';
import { Profile, ProfileOverviewService, Rating } from '../service/profile-overview.service';

@Component({
    selector: 'app-profile-overview',
    templateUrl: './profile-overview.component.html',
    styleUrls: ['./profile-overview.component.css'],
})
export class ProfileOverviewComponent implements OnInit, OnDestroy {
    destroy = new Subject<boolean>();
    selectedProfileId: string | undefined = undefined;
    isSmallScreen = false;
    comments: Rating[] | undefined = undefined;
    profile: Profile | undefined | null = undefined;
    isCommenting = false;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private deviceSizeService: DeviceSizeService,
        private profileOverviewService: ProfileOverviewService
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
            this.selectedProfileId = params['id'];

            if (this.selectedProfileId) {
                this.profileOverviewService.getRating(this.selectedProfileId).subscribe(data => {
                    this.comments = data;
                });

                this.profileOverviewService.getProfile(this.selectedProfileId).subscribe(data => {
                    this.profile = data;

                    if (data.id === undefined) {
                        this.profile = null;
                    }
                });
            }
        });

        this.deviceSizeService
            .getIsSmallScreen()
            .pipe(takeUntil(this.destroy))
            .subscribe(isSmallScreen => {
                this.isSmallScreen = isSmallScreen;
            });
    }

    back() {
        this.router.navigate(['..']);
    }

    isEditingChanged(isEditing: boolean) {
        this.isCommenting = isEditing;
    }

    addedComment() {
        if (this.selectedProfileId) {
            this.profileOverviewService.getRating(this.selectedProfileId).subscribe(data => {
                this.comments = data;
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }
}
