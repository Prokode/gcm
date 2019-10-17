import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifFormComponent } from './tarif-form.component';

describe('TarifFormComponent', () => {
  let component: TarifFormComponent;
  let fixture: ComponentFixture<TarifFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
