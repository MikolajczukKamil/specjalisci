import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderingComponent } from './service-ordering.component';

describe('ServiceOrderingComponent', () => {
  let component: ServiceOrderingComponent;
  let fixture: ComponentFixture<ServiceOrderingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceOrderingComponent]
    });
    fixture = TestBed.createComponent(ServiceOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
