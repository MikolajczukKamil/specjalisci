import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters } from './filters.model';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
    constructor(public modalRef: MatDialogRef<FiltersComponent>) {}

    size = new FormGroup({
        5: new FormControl(false),
        10: new FormControl(false),
        15: new FormControl(false),
        20: new FormControl(false),
    });

    work = new FormGroup({
        office: new FormControl(false),
        remote: new FormControl(false),
    });

    builder = new FormGroup({
        tiles: new FormControl(false),
        painting: new FormControl(false),
        bath: new FormControl(false),
        hydraulics: new FormControl(false),
    });

    it = new FormGroup({
        printer: new FormControl(false),
        laptop: new FormControl(false),
        phone: new FormControl(false),
        network: new FormControl(false),
        integration: new FormControl(false),
        desktop: new FormControl(false),
        mobile: new FormControl(false),
        cloud: new FormControl(false),
        cybersec: new FormControl(false),
        testing: new FormControl(false),
        www: new FormControl(false),
        server: new FormControl(false),
        website: new FormControl(false),
        data: new FormControl(false),
        design: new FormControl(false),
    });

    services = new FormGroup({
      sprzatanie: new FormControl(false),
      elektronika: new FormControl(false),
      opieka: new FormControl(false),
      finanse: new FormControl(false),
    });

    reset() {
        this.size.reset();
        this.work.reset();
        this.builder.reset();
        this.it.reset();
        this.services.reset();
    }

    save() {
        this.modalRef.close({
            size: this.getCorrespondingValues(this.size),
            work: this.getCorrespondingValues(this.work),
            builder: this.getCorrespondingValues(this.builder),
            it: this.getCorrespondingValues(this.it),
            services: this.getCorrespondingValues(this.services),
        } as Filters);
    }

    closeModal() {
        this.modalRef.close();
    }

    private getCorrespondingValues(group: FormGroup): any {
        const controls: string[] = [];
        Object.keys(group.controls)
            .filter(control => group.get(control)?.value === true)
            .map(control => controls.push(control));
        return controls;
    }
}
