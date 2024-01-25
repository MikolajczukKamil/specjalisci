import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-service-ordering',
  templateUrl: './service-ordering.component.html',
  styleUrls: ['./service-ordering.component.css'],
})
export class ServiceOrderingComponent {

  send = false;



  constructor(
    public modalRef: MatDialogRef<ServiceOrderingComponent>,
    private snackBar: MatSnackBar) {}



  OrderingServiceForm = new FormGroup({
    dateFrom: new FormControl<string>('', {
        nonNullable: true,
        validators: [
            Validators.required
        ],
    }),
    dateTo: new FormControl<string>('', {
        nonNullable: true,
        validators: [
            Validators.required
        ],
    }),
    description: new FormControl<string>('', {
        nonNullable: true,
    }),
});

  closeModal() {
    this.modalRef.close();
  }

  ngOnInit(): void {}

  orderSubmit(){
    if (this.OrderingServiceForm.valid) {
      //operacja wysylania zamowienia

  } else {
      if (this.OrderingServiceForm.get('dateFrom')?.invalid) {
          this.snackBar.open('Wprowadź poprawnie datę początkową', 'Close', {
              duration: 3000,
          });
      }
      else if (this.OrderingServiceForm.get('dateTo')?.invalid) {
          this.snackBar.open('Wprowadź poprawnie datę końcową', 'Close', {
              duration: 3000,
          });
      }
    }
  }

  setSend() {
    this.send = !this.send;
    if (!this.send) this.closeModal();
  }

}


