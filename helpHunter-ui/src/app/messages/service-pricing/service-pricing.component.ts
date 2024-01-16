import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-service-pricing',
    templateUrl: './service-pricing.component.html',
    styleUrls: ['./service-pricing.component.css'],
})
export class ServicePricingComponent {
    form = new FormGroup({
        price: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(0)],
        }),
        estimatedExecutionTime: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        description: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    constructor(public modalRef: MatDialogRef<ServicePricingComponent>) {}

    closeModal() {
        this.modalRef.close();
    }
}
