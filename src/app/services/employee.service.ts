import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Employee } from '../admin/model/employee';
import { SERVER_DOMAIN } from 'src/app/app.constants';

var EmployeeApiUrl = SERVER_DOMAIN + "/employees";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesUpdate = new Subject<Employee[]>();
  employees: Employee[];

  constructor(private http: HttpClient) {}

  private setEmployees(employees: Employee[]) {
    this.employees = employees;
    this.employeesUpdate.next(this.employees.slice());
  }

  getEmployees() {
    return this.http.get<Employee[]>(EmployeeApiUrl)
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(EmployeeApiUrl + '/' +  id);
  }

  updateEmployee(id: number, employee: Employee) {
    return this.http.put(EmployeeApiUrl + '/' +  id, employee);
  }

  addNewEmployee(employee: Employee) {
    return this.http.post(EmployeeApiUrl + '/add', employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(EmployeeApiUrl + '/' +  id);
  }

}
