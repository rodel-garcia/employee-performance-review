import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../model/employee';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  providers: [DatePipe]
})
export class EmployeeEditComponent implements OnInit {

  employeeId: number
  editMode = false;
  pageTitle = '';
  employee = new Employee(0, '', '', '', '', '', '', '');
  employeeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params.id) {
            this.employeeId = params.id;
            this.editMode = true
            this.fetchFormData(+params.id);
          } else {
            this.buildForm(this.employee);
            this.pageTitle = "Add new employee";
          }
        }
      );
  }

  fetchFormData(employeeId: number) {
    this.employeeService.getEmployee(+employeeId)
      .subscribe(response => {
        this.buildForm(response);
        this.pageTitle = "Update Employee Detail";
      }, error => {
        console.log(error);
      });
  }

  buildForm(employee: Employee) {
    const date = this.datePipe.transform(employee.date_hired, 'yyyy-MM-dd');
    this.employeeForm = new FormGroup({
      'employee_number': new FormControl(employee.employee_number, Validators.required),
      'name': new FormControl(employee.name, Validators.required),
      'email': new FormControl(employee.email, [Validators.required, Validators.email]),
      'image_path': new FormControl(employee.image_path, Validators.required),
      'designation': new FormControl(employee.designation),
      'position': new FormControl(employee.position),
      'date_hired': new FormControl(date),
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.updateEmployeeDetail();
    } else {
      this.addNewEmployee();
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    if(confirm("Are you sure you want to delete employee?")) {
      this.employeeService.deleteEmployee(this.employeeId)
        .subscribe(response => {
          this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
          console.log(error);
        });
    }
  }

  updateEmployeeDetail() {
    this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value)
      .subscribe(response => {
        if (response) { this.router.navigate(['../'], { relativeTo: this.route }); }
      }, error => {
        console.log(error);
      });
  }

  addNewEmployee() {
    this.employeeService.addNewEmployee(this.employeeForm.value)
      .subscribe(response => {
        if (response) { this.router.navigate(['../'], { relativeTo: this.route }); }
      }, error => {
        console.log(error);
      });
  }
}
