import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCurrentComponent } from './vente-current.component';

describe('VenteCurrentComponent', () => {
  let component: VenteCurrentComponent;
  let fixture: ComponentFixture<VenteCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
