import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters } from './filters.model';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {

    @Input()
    currentFilters: Filters = { size: [], work: [], builder: [], it: [], services: []}

    constructor(public modalRef: MatDialogRef<FiltersComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentFilters = data?.currentFilters

      this.size = new FormGroup({
        5: new FormControl(this.findSizeByName('5')),
        10: new FormControl(this.findSizeByName('10')),
        15: new FormControl(this.findSizeByName('15')),
        20: new FormControl(this.findSizeByName('20')),
        50: new FormControl(this.findSizeByName('50')),
        100: new FormControl(this.findSizeByName('100')),
      });

      this.work = new FormGroup({
        office: new FormControl(this.findWorkByName('office')),
        remote: new FormControl(this.findWorkByName('remote')),
      });

      this.builder = new FormGroup({
        tiles: new FormControl(this.findBuilderByName('tiles')),
        painting: new FormControl(this.findBuilderByName('painting')),
        bath: new FormControl(this.findBuilderByName('bath')),
        hydraulics: new FormControl(this.findBuilderByName('hydraulics')),
      });

      this.it = new FormGroup({
        printer: new FormControl(this.findItByName('printer')),
        laptop: new FormControl(this.findItByName('laptop')),
        phone: new FormControl(this.findItByName('phone')),
        network: new FormControl(this.findItByName('network')),
        integration: new FormControl(this.findItByName('integration')),
        desktop: new FormControl(this.findItByName('desktop')),
        mobile: new FormControl(this.findItByName('mobile')),
        cloud: new FormControl(this.findItByName('cloud')),
        cybersec: new FormControl(this.findItByName('cybersec')),
        testing: new FormControl(this.findItByName('testing')),
        www: new FormControl(this.findItByName('www')),
        server: new FormControl(this.findItByName('server')),
        website: new FormControl(this.findItByName('website')),
        data: new FormControl(this.findItByName('data')),
        graphic: new FormControl(this.findItByName('graphic')),
      });

      this.services = new FormGroup({
        sprzatanie: new FormControl(this.findServiceByName('sprzatanie')),
        elektronika: new FormControl(this.findServiceByName('elektronika')),
        opieka: new FormControl(this.findServiceByName('opieka')),
        finanse: new FormControl(this.findServiceByName('finanse')),
      });
    }

    size : any

    work : any

    builder : any

    it : any

    services : any

    findServiceByName(name: string) {
      return this.currentFilters?.services?.includes(name)
    }

    findItByName(name: string) {
      return this.currentFilters?.it?.includes(name)
    }

    findBuilderByName(name: string) {
      return this.currentFilters?.builder?.includes(name)
    }

    findWorkByName(name: string) {
      return this.currentFilters?.work?.includes(name)
    }

    findSizeByName(name: string) {
      return this.currentFilters?.size?.includes(name)
    }

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
