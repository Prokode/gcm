import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteCodeComponent } from './poste-code.component';

describe('PosteCodeComponent', () => {
  let component: PosteCodeComponent;
  let fixture: ComponentFixture<PosteCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
