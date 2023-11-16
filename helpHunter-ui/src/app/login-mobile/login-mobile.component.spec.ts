import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMobileComponent } from './login-mobile.component';

describe('LoginMobileComponent', () => {
  let component: LoginMobileComponent;
  let fixture: ComponentFixture<LoginMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMobileComponent]
    });
    fixture = TestBed.createComponent(LoginMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
