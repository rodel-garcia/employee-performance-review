import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { Employee } from '../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceReviewService } from '../../services/performance-review.service';
import { TotalRating } from '../model/performance-review';
import { RATINGS, ADMIN_ID } from '../../app.constants';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  providers: [DecimalPipe]
})
export class EmployeeDetailComponent implements OnInit {

  employeeId: number;
  employee: Employee;
  canAddReview: boolean = true;
  ratings: string;
  reviews: TotalRating[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private performanceReviewService: PerformanceReviewService,
              private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.getCurrentEmployee();
  }

  private getCurrentEmployee() {
    this.route.params.subscribe((params: Params) => {
      this.employeeId = +params.id;
      this.employeeService.getEmployee(this.employeeId)
        .subscribe(response => {
          if (!response) { this.router.navigate(['/employees']); }
          this.employee = response;
          this.getEmployeePerformanceReview();
        }, error => {
          console.log(error);
        });
    });
  }

  private getEmployeePerformanceReview() {
    this.performanceReviewService.getPerformanceReviews(this.employeeId)
      .subscribe(response => {
        if (response.length) {
          this.canAddReview = response.filter(res => res.reviewer_id === ADMIN_ID).length < 1;
          this.reviews = this.formatReviewRatings(response);
        }
      }, error => {
        console.log(error);
      });
  }

  private formatReviewRatings(reviews: TotalRating[]) {
    let newReviews = []
    reviews.map(review => {
      review.total_rating = RATINGS[this.decimalPipe.transform(review.total_rating-1, '1.0-0')];
      newReviews.push(review);
    });
    return newReviews;
  }
}
