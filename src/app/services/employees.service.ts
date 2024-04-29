import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Designation } from "../types/designation.type";
import { EmployeeRole } from "../types/employee-role.type";
import { EmployeeAll } from "../types/employee-all.type";

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

  saveEmployee(employee: any) {
    return this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee", employee);
  }

}
