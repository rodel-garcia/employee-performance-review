import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { EmployeeDetailComponent } from './admin/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './admin/employee-edit/employee-edit.component';
import { EmployeeService } from './services/employee.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmployeeReviewComponent } from './admin/employee-review/employee-review.component';
import { EmployeeReviewEditComponent } from './admin/employee-review-edit/employee-review-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    SpinnerComponent,
    EmployeeReviewComponent,
    EmployeeReviewEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
