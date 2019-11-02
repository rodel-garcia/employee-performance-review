import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SERVER_DOMAIN } from '../app.constants';
import { TotalRating, ReviewFactor, PerformanceReviewIds, PerformanceReviewEdit } from '../admin/model/performance-review';

@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {

  constructor(private http: HttpClient) { }

  getPerformanceReviews(employeeId: number) {
    const apiUrl = SERVER_DOMAIN + '/employees/' + employeeId + '/reviews';
    return this.http.get<TotalRating[]>(apiUrl);
  }

  getPerformanceReview(employeeId: number, reviewerId: number) {
    const apiUrl = SERVER_DOMAIN + '/employees/' + employeeId + '/reviews/' + reviewerId;
    return this.http.get<TotalRating[]>(apiUrl);
  }

  getPerformanceReviewEdit(employeeId: number, reviewerId: number) {
    const apiUrl = SERVER_DOMAIN + '/employees/' + employeeId + '/reviews/' + reviewerId + '/edit';
    return this.http.get<PerformanceReviewEdit[]>(apiUrl);
  }

  updatePerformanceReview(employeeId: number, reviewerId: number, putData: PerformanceReviewIds[]) {
    const apiUrl = SERVER_DOMAIN + '/employees/' + employeeId + '/reviews/' + reviewerId + '/edit';
    return this.http.put(apiUrl, putData);
  }

  getReviewFactors() {
    const apiUrl = SERVER_DOMAIN + '/employees/review/factors';
    return this.http.get<ReviewFactor[]>(apiUrl);
  }

  addReview(employeeId: number, postData: PerformanceReviewIds[]) {
    const apiUrl = SERVER_DOMAIN + '/employees/' + employeeId + '/reviews/add'
    return this.http.post(apiUrl, postData);
  }

}
