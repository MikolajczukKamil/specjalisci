import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMobileComponent } from './register-mobile.component';

describe('RegisterMobileComponent', () => {
  let component: RegisterMobileComponent;
  let fixture: ComponentFixture<RegisterMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMobileComponent]
    });
    fixture = TestBed.createComponent(RegisterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
