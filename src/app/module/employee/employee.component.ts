import { NgClass, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Employee } from "../../types/employee.type";
import { CStepName, EStepName, Step } from "../../types/step.type";
import { EmployeeExp } from "../../types/employee-exp.type";
import { EmployeeSkills } from "../../types/employee-skills.type";
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "a-employee",
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.scss",
})
export class EmployeeComponent implements OnInit {
  empForm!: FormGroup;
  empSkills!: FormGroup;

  stepsList: Step[] = [
    { stepName: EStepName.BasicDetails, isComplete: false },
    { stepName: EStepName.Skills, isComplete: false },
    { stepName: EStepName.Experience, isComplete: false },
  ];
  activeStep = this.stepsList[0];
  designationList: any = [{ designationId: 1, designation: "designation" }];



  employeeObj: Employee = {
    roleId: 0,
    empId: 0,
    empName: "",
    empEmailId: "",
    empDesignationId: 0,
    empContactNo: "",
    empAltContactNo: "",
    empPersonalEmailId: "",
    empExpTotalYear: 0,
    empExpTotalMonth: 0,
    empCity: "",
    empState: "",
    empPinCode: "",
    empAddress: "",
    empPerCity: "",
    empPerState: "",
    empPerPinCode: "",
    empPerAddress: "",
    password: "",
    erpEmployeeSkills: [],
    ermEmpExperiences: [],
  };

  expObj: EmployeeExp = {
    "empExpId": 0,
    "empId": 0,
    "companyName": " ",
    "startDate": "",
    "endDate": "",
    "designation": "",
    "projectsWorkedOn": ""
  };

  skillObj: EmployeeSkills = {
    "empSkillId": 0,
    "empId": 0,
    "skill": "",
    "totalYearExp": 0,
    "lastVersionUsed": ""
  };
  // STEP
  setActiveStep(step: any) {
    this.activeStep = step;
  }

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    
  }

  initEmpForm() {
    this.empForm = this.fb.group({
      empName: ['', [Validators.required, Validators.minLength(4)]],
      empEmailId: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      empDesignationId: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      empContactNo: ['', Validators.required],
      empPersonalEmailId: ['', Validators.required],
      empAltContactNo: ['', Validators.required],
      empExpTotalYear: ['', Validators.required],
      empExpTotalMonth: ['', Validators.required],
      empCity: ['', Validators.required],
      empState: ['', Validators.required],
      empPinCode: ['', Validators.required],
      empAddress: ['', Validators.required],
      empPerCity: ['', Validators.required],
      empPerState: ['', Validators.required],
      empPerPinCode: ['', Validators.required],
      empPerAddress: ['', Validators.required],
    });

    this.empSkills = this.fb.group({
      empPerAddress: ['', Validators.required],
    })
    
  }
}
