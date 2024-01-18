import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile, ProfileOverviewService } from '../../service/profile-overview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceSizeService } from '../../../services/deviceSize/device-size.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit, OnDestroy {
    @Input() profile!: Profile;
    @Output() isEditingChanged = new EventEmitter<boolean>();

    isEditing = false;
    destroy = new Subject<boolean>();
    isSmallScreen = false;

    constructor(
        private profileOverview: ProfileOverviewService,
        private toast: MatSnackBar,
        private deviceSizeService: DeviceSizeService
    ) {}

    ngOnInit(): void {
        this.deviceSizeService
            .getIsSmallScreen()
            .pipe(takeUntil(this.destroy))
            .subscribe(isSmallScreen => {
                this.isSmallScreen = isSmallScreen;
            });
    }

    text = new FormControl('', { nonNullable: true });
    rating = new FormControl(0, { nonNullable: true });

    addComment() {
        this.isEditing = true;
        this.isEditingChanged.emit(this.isEditing);
    }

    closeComment() {
        this.isEditing = false;
        this.isEditingChanged.emit(this.isEditing);
    }

    sendComment() {
        this.profileOverview
            .sendRating({
                id: 0,
                userId: this.profile.id,
                reviewerId: 0,
                reviewerName: 'Wstaw tutaj imię użytkownika',
                rating: this.rating.getRawValue(),
                comment: this.text.getRawValue(),
            })
            .subscribe(() => {
                this.isEditing = false;
                this.isEditingChanged.emit(this.isEditing);
                this.toast.open('Dodano komentarz', 'Zamknij', {
                    duration: 3000,
                });
            });
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }
}
