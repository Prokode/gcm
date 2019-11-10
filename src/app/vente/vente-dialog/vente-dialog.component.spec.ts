import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDialogComponent } from './vente-dialog.component';

describe('VenteDialogComponent', () => {
  let component: VenteDialogComponent;
  let fixture: ComponentFixture<VenteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
