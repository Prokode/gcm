import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportResultComponent } from './raport-result.component';

describe('RaportResultComponent', () => {
  let component: RaportResultComponent;
  let fixture: ComponentFixture<RaportResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
