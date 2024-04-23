import { EmployeeExp } from "./employee-exp.type";
import { EmployeeSkills } from "./employee-skills.type";

export type Employee = {
  roleId: number;
  empId: number;
  empName: string;
  empEmailId: string;
  empDesignationId: number;
  empContactNo: string;
  empAltContactNo: string;
  empPersonalEmailId: string;
  empExpTotalYear: number;
  empExpTotalMonth: number;
  empCity: string;
  empState: string;
  empPinCode: string;
  empAddress: string;
  empPerCity: string;
  empPerState: string;
  empPerPinCode: string;
  empPerAddress: string;
  password: string;
  erpEmployeeSkills: EmployeeSkills[];
  ermEmpExperiences: EmployeeExp[];
};
