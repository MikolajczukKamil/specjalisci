import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceModel, ServicesService } from '../home/serviceModel';
import { UserService } from '../services/user/user.service';
import { UserData } from '../profile/user-data';

@Component({
    selector: 'app-service-ordering',
    templateUrl: './service-ordering.component.html',
    styleUrls: ['./service-ordering.component.css'],
})
export class ServiceOrderingComponent {
    userData!: UserData ;
    service!: ServiceModel ;

    constructor(
        public modalRef: MatDialogRef<ServiceOrderingComponent>,
        private snackBar: MatSnackBar,
        private servicesService: ServicesService,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: { service: ServiceModel }
    ) {}

    OrderingServiceForm = new FormGroup({
        dateFrom: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        dateTo: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        description: new FormControl<string>('', {
            nonNullable: true,
        }),
    });

    closeModal() {
        this.modalRef.close();
    }

    ngOnInit(): void {
        this.userService.getUserData().subscribe(data => {
            this.userData = data;
        });
        this.service = this.data.service;
    }
    orderSubmit() {
        if (this.OrderingServiceForm.valid) {
            this.servicesService
                .orderService({
                    specialistId: this.service.userId,
                    consumerId: this.userData?.id,
                    specialistPricing: this.service?.minPrice,
                    specialistDescription: this.OrderingServiceForm.getRawValue().description,
                    startDate: this.OrderingServiceForm.getRawValue().dateFrom,
                    estimatedTime: 0,
                    finalPrice: this.service?.maxPrice,
                    endDate: this.OrderingServiceForm.getRawValue().dateTo,
                })
                .subscribe({
                    next: () => {
                        this.snackBar.open('Zamówienie zostało wysłane', 'Close', {
                            duration: 3000,
                        });
                        this.closeModal();
                    },
                });
        } else {
            if (this.OrderingServiceForm.get('dateFrom')?.invalid) {
                this.snackBar.open('Wprowadź poprawnie datę początkową', 'Close', {
                    duration: 3000,
                });
            } else if (this.OrderingServiceForm.get('dateTo')?.invalid) {
                this.snackBar.open('Wprowadź poprawnie datę końcową', 'Close', {
                    duration: 3000,
                });
            }
        }
    }
}
