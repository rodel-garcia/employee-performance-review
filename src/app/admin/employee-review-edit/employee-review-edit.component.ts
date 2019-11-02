import { Component, OnInit, ViewChild } from '@angular/core';
import { PerformanceReviewService } from 'src/app/services/performance-review.service';
import { ReviewFactor, PerformanceReviewEdit } from '../model/performance-review';
import { ADMIN_ID, RATINGS } from '../../app.constants';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-review-edit',
  templateUrl: './employee-review-edit.component.html',
  styleUrls: ['./employee-review-edit.component.scss'],
  providers: [DatePipe]
})
export class EmployeeReviewEditComponent implements OnInit {

  employeeId: number;
  ratings = RATINGS;
  reviewerId: number;
  reviews: PerformanceReviewEdit[];
  reviewFactors: ReviewFactor[];
  pageTitle = "Add Performance Review";
  backLink = '../../';

  @ViewChild("reviewFactorForm", { static: false }) form: NgForm;

  constructor(private performanceReviewService: PerformanceReviewService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {}

  ngOnInit() {
    this.getReviewFactors();
    this.route.params.subscribe((params: Params) => {
      params.id && (this.employeeId = +params.id);
      if (params.id && params.reviewer_id) {
        this.reviewerId = +params.reviewer_id;
        this.backLink = '../';
        this.getPerformanceReview();
      }
    });

  }

  onSubmit() {
    if (!this.reviewerId) {
      this.addNewReview();
    } else {
      this.updateReview();
    }
  }

  private updateReview() {
    const reviewData = this.setUpdateReviewData();
    this.performanceReviewService.updatePerformanceReview(this.employeeId, this.reviewerId, reviewData)
      .subscribe(response => {
        response && this.router.navigate(['../'], { relativeTo: this.route });
      }, error => {
        console.log(error);
      });
  }

  private setUpdateReviewData() {
    const formValues = this.form.value;
    let reviewData = [];
    Object.keys(formValues).forEach((key, i) => {
        const performanceReviewData = {
          id: this.reviews[i].id,
          rating: formValues[key],
          factor_id: +key.split('').pop(),
        }
        reviewData.push(performanceReviewData);
    });
    return reviewData;
  }

  private getPerformanceReview() {
    this.performanceReviewService.getPerformanceReviewEdit(this.employeeId, this.reviewerId)
      .subscribe(reviews => {
        this.reviews = reviews;
        reviews.forEach(review => {
          this.form.controls['factor'+ review.factor_id].setValue(review.rating);
        });
      }, error => {
        console.log(error);
      });
  }

  private addNewReview() {
    const reviewData = this.setAddReviewData();
    this.performanceReviewService.addReview(this.employeeId, reviewData)
      .subscribe(response => {
        if (response) { this.router.navigate(['../../'], { relativeTo: this.route }); }
      }, error => {
        console.log(error);
      });
  }

  private getReviewFactors() {
    this.performanceReviewService.getReviewFactors()
      .subscribe(response => {
        if (response.length) { this.reviewFactors = response; }
      }, error => {
        console.log(error);
      })
  }

  private setAddReviewData() {
    const formValues = this.form.value;
    let reviewData = [];
    Object.keys(formValues).forEach(key => {
      const value = formValues[key],
        performanceReviewData = [
          ADMIN_ID, // reviewer_id
          this.employeeId,
          +key.split('').pop(), // factoryId
          value, // rating
          this.datePipe.transform(new Date(), 'yyyy-MM-dd')
        ];
        reviewData.push(performanceReviewData);
    });
    return reviewData;
  }
}
