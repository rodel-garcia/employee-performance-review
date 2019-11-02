import { Component, OnInit } from '@angular/core';

import { Employee } from '../model/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe(response => {
        this.employees = response;
      }, error => {
        console.log(error);
      });
  }
}
