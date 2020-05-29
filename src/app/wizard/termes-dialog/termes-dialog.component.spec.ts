import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermesDialogComponent } from './termes-dialog.component';

describe('TermesDialogComponent', () => {
  let component: TermesDialogComponent;
  let fixture: ComponentFixture<TermesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
