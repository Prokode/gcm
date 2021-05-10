import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentesNotFinishedComponent } from './ventes-not-finished.component';

describe('VentesNotFinishedComponent', () => {
  let component: VentesNotFinishedComponent;
  let fixture: ComponentFixture<VentesNotFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentesNotFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentesNotFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
