
export class Employee {
  id?: number;
  name: string;
  email: string;
  image_path: string;
  designation: string;
  position: string;
  employee_number: string;
  date_hired: string;

  constructor(id: number,
              name: string,
              email: string,
              image_path: string,
              designation: string,
              position: string,
              employee_number: string,
              date_hired: string) {

    this.id = id;
    this.name = name;
    this.email = email;
    this.image_path = image_path;
    this.designation = designation;
    this.position = position;
    this.employee_number = employee_number;
    this.date_hired = date_hired;
  }
}
