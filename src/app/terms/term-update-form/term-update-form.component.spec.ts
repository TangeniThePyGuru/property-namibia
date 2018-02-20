import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermUpdateFormComponent } from './term-update-form.component';

describe('TermUpdateFormComponent', () => {
  let component: TermUpdateFormComponent;
  let fixture: ComponentFixture<TermUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
