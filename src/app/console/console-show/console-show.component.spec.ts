import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleShowComponent } from './console-show.component';

describe('ConsoleShowComponent', () => {
  let component: ConsoleShowComponent;
  let fixture: ComponentFixture<ConsoleShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
