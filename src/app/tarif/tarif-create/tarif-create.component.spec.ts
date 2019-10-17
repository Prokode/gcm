import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifCreateComponent } from './tarif-create.component';

describe('TarifCreateComponent', () => {
  let component: TarifCreateComponent;
  let fixture: ComponentFixture<TarifCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
