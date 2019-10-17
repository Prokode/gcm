import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifShowComponent } from './tarif-show.component';

describe('TarifShowComponent', () => {
  let component: TarifShowComponent;
  let fixture: ComponentFixture<TarifShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
