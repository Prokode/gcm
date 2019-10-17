import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReActivationComponent } from './re-activation.component';

describe('ReActivationComponent', () => {
  let component: ReActivationComponent;
  let fixture: ComponentFixture<ReActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
