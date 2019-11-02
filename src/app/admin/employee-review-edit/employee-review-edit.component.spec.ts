import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReviewEditComponent } from './employee-review-edit.component';

describe('EmployeeReviewEditComponent', () => {
  let component: EmployeeReviewEditComponent;
  let fixture: ComponentFixture<EmployeeReviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeReviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
