import { JsonPipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Employee } from "../../types/employee.type";
import { CStepName, EStepName, Step } from "../../types/step.type";
import { EmployeeExp } from "../../types/employee-exp.type";
import { EmployeeSkills } from "../../types/employee-skills.type";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "a-employee",
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor, NgIf, JsonPipe],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.scss",
})
export class EmployeeComponent implements OnInit {
  empForm!: FormGroup;
  empSkillsForm!: FormGroup;
  // empSkillsArray!: FormArray;
  empExp!: FormGroup;

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
    empExpId: 0,
    empId: 0,
    companyName: " ",
    startDate: "",
    endDate: "",
    designation: "",
    projectsWorkedOn: "",
  };

  skillObj: EmployeeSkills = {
    empSkillId: 0,
    empId: 0,
    skill: "",
    totalYearExp: 0,
    lastVersionUsed: "",
  };
  // STEP
  setActiveStep(step: any) {
    this.activeStep = step;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initEmpForm();
  }

  initEmpForm() {
    this.empForm = this.fb.group({
      empName: ["", [Validators.required, Validators.minLength(4)]],
      empEmailId: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      empDesignationId: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
      empContactNo: ["", Validators.required],
      empPersonalEmailId: ["", Validators.required],
      empAltContactNo: ["", Validators.required],
      empExpTotalYear: ["", Validators.required],
      empExpTotalMonth: ["", Validators.required],
      empCity: ["", Validators.required],
      empState: ["", Validators.required],
      empPinCode: ["", Validators.required],
      empAddress: ["", Validators.required],
      empPerCity: ["", Validators.required],
      empPerState: ["", Validators.required],
      empPerPinCode: ["", Validators.required],
      empPerAddress: ["", Validators.required],
      // empSkills: this.fb.array([{
      //   skill: ["", Validators.required],
      //   totalYearExp: ["", Validators.required],
      //   lastVersionUsed: ["", Validators.required],
      // }])
    });

    // Array
    this.empSkillsForm = this.fb.group({
      empSkillsArray: this.fb.array([]),
    });

    this.empExp = this.fb.group({
      companyName: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      designation: ["", Validators.required],
      projectsWorkedOn: ["", Validators.required],
    });
  }

  get empSkillsArray(): FormArray {
    return this.empSkillsForm.get("empSkillsArray") as FormArray;
  }

  get buildGroup() {
    console.log('[get buildGroup]');
    return this.fb.group({
      skill: ["Skill", Validators.required],
      totalYearExp: ["10", Validators.required],
      lastVersionUsed: ["2", Validators.required],
    })
  }

  addSkills() {
    console.log(":Add Skills:");

    // this.empSkills.push();
    this.empSkillsArray.push(
      this.fb.group({
          skill: ["Skill", Validators.required],
          totalYearExp: ["10", Validators.required],
          lastVersionUsed: ["2", Validators.required],
      })
    );

    // console.dir(this.empSkillsForm);
    // console.dir(this.empSkillsArray);
    console.dir(this.empSkillsArray.controls);
    // console.log("ConrolsAr:", this.empSkillsArray.controls);
  }

  addExp() {
    const expObj: EmployeeExp = {
      empExpId: 0,
      empId: 0,
      companyName: " ",
      startDate: "",
      endDate: "",
      designation: "",
      projectsWorkedOn: "",
    };
    this.employeeObj.ermEmpExperiences.unshift(expObj);

    console.log(':EMPLOYEE FORM:');
    console.dir(this.empExp);
  }
}
