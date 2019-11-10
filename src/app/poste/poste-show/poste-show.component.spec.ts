import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteShowComponent } from './poste-show.component';

describe('PosteShowComponent', () => {
  let component: PosteShowComponent;
  let fixture: ComponentFixture<PosteShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
