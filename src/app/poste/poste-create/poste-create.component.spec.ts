import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteCreateComponent } from './poste-create.component';

describe('PosteCreateComponent', () => {
  let component: PosteCreateComponent;
  let fixture: ComponentFixture<PosteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
