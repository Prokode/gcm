import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandByComponent } from './stand-by.component';

describe('StandByComponent', () => {
  let component: StandByComponent;
  let fixture: ComponentFixture<StandByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
