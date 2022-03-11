import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveConfigComponent } from './save-config.component';

describe('SaveConfigComponent', () => {
  let component: SaveConfigComponent;
  let fixture: ComponentFixture<SaveConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
