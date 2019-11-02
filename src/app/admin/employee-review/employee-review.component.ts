import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { TotalRating } from '../model/performance-review';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { PerformanceReviewService } from 'src/app/services/performance-review.service';
import { RATINGS } from '../../app.constants';

@Component({
  selector: 'app-employee-review',
  templateUrl: './employee-review.component.html'
})
export class EmployeeReviewComponent implements OnInit {

  employee: Employee;
  reviews: TotalRating[];
  ratings = RATINGS;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private performanceReviewService: PerformanceReviewService) { }

  ngOnInit() {
    this.getCurrentEmployee();
  }

  onDelete() {
    if(confirm("Are you sure you want to delete this review?")) {

    }
  }

  private getCurrentEmployee() {
    this.route.params.subscribe((params: Params) => {
      this.employeeService.getEmployee(+params.id)
        .subscribe(response => {
          if (!response) { this.router.navigate(['../../'], { relativeTo: this.route }); }
          this.employee = response;
          this.getReview(+params.id, +params.reviewer_id);
        }, error => {
          console.log(error);
        });
    });
  }

  private getReview(employeeId: number, reviewerId: number) {
    this.performanceReviewService.getPerformanceReview(employeeId, reviewerId)
      .subscribe(response => {
        if (!response.length) { this.router.navigate(['../../'], { relativeTo: this.route }); }
        this.reviews = response;
      }, error => {
        console.log(error);
      });
  }
}
