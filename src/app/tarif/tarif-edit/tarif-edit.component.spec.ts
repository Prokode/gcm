import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifEditComponent } from './tarif-edit.component';

describe('TarifEditComponent', () => {
  let component: TarifEditComponent;
  let fixture: ComponentFixture<TarifEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
