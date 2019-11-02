import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { EmployeeEditComponent } from './admin/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './admin/employee-detail/employee-detail.component';
import { EmployeeReviewComponent } from './admin/employee-review/employee-review.component';
import { EmployeeReviewEditComponent } from './admin/employee-review-edit/employee-review-edit.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: '/admin/employees' },
    { path: 'employees', component: EmployeesComponent },
    { path: 'employee', component: EmployeeComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/admin/employees' },
      { path: 'new', component: EmployeeEditComponent },
      { path: ':id', component: EmployeeDetailComponent },
      { path: ':id/edit', component: EmployeeEditComponent },
      { path: ':id/reviews/new', component: EmployeeReviewEditComponent },
      { path: ':id/reviews/:reviewer_id', component: EmployeeReviewComponent },
      { path: ':id/reviews/:reviewer_id/edit', component: EmployeeReviewEditComponent }
    ]},
  ]},
  { path: '**', pathMatch: 'full', redirectTo: '/admin/employees' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
