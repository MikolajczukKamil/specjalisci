import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMobileComponent } from './home-mobile.component';

describe('HomeMobileComponent', () => {
  let component: HomeMobileComponent;
  let fixture: ComponentFixture<HomeMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMobileComponent]
    });
    fixture = TestBed.createComponent(HomeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
