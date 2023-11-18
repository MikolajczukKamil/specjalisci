import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocalisationComponent } from './map-localisation.component';

describe('MapLocalisationComponent', () => {
  let component: MapLocalisationComponent;
  let fixture: ComponentFixture<MapLocalisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapLocalisationComponent]
    });
    fixture = TestBed.createComponent(MapLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
