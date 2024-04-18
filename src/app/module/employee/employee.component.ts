import { Component } from '@angular/core';

@Component({
  selector: 'a-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  designationList: any = [
    { designationId: 1, designation: 'designation'}
  ];
}
