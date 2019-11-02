
export interface PerformanceReview {
  id?: number;
  name: string;
  description: string;
  rating: number;
  reviewer: string;
}

export interface PerformanceReviewEdit {
  id: number;
  reviewer_id: number;
  factor_id: string;
  review_date: Date;
  rating: number;
  reviewer: string;
}

export interface TotalRating {
  reviewer_id: number;
  reviewer: string;
  total_rating: number;
  review_date: Date;
}

export interface PerformanceReviewIds {
  reviewer_id: number;
  employee_id: number;
  factor_id: number;
  rating: number;
  review_date: Date;
}

export interface ReviewFactor {
  id?: number;
  name: string;
  description: string;
}
