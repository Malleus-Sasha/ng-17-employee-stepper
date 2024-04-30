import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Designation } from "../types/designation.type";
import { EmployeeRole } from "../types/employee-role.type";
import { EmployeeAll } from "../types/employee-all.type";
import { Employee } from "../types/employee.type";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}


  getAllEmployees() {
    return this.http.get<{data: EmployeeAll[]}>("https://freeapi.gerasim.in/api/EmployeeApp/GetAllEmployee");
  }

  getDesignations() {
    return this.http.get<{data: Designation[]}>("https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation");
  }

  getRoles() {
    return this.http.get<{data: EmployeeRole[]}>("https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles");
  }

  saveEmployee(employee: any): any {
    return this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee", employee);
  }

  updateEmployee(employeeObj: Employee) {
    return this.http.put("https://freeapi.gerasim.in/api/EmployeeApp/UpdateEmployee", employeeObj);
  }

  getEmployee(employeeId: number) {
    return this.http.get<{data: Employee}>("https://freeapi.gerasim.in/api/EmployeeApp/GetEmployeeByEmployeeId?id=" + employeeId);
  }

  deleteEmployee(id: number) {
    return this.http.delete("https://freeapi.gerasim.in/api/EmployeeApp/DeleteEmployeeByEmpId?empId="+id);
  }

}
