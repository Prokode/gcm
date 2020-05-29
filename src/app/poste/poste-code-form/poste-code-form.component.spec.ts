import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteCodeFormComponent } from './poste-code-form.component';

describe('PosteCodeFormComponent', () => {
  let component: PosteCodeFormComponent;
  let fixture: ComponentFixture<PosteCodeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteCodeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
