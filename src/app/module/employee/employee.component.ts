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
import { EmployeeService } from "../../services/employees.service";
import { EmployeeRole } from "../../types/employee-role.type";
import { EmployeeAll } from "../../types/employee-all.type";

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
  activeStep: Step = this.stepsList[0];
  stepperCompletionValue:number = 8;

  designationList: any = [{ designationId: 1, designation: "designation" }];
  roleList: EmployeeRole[] = [];

  employeeList: any[] = [];

  isCreateView = false;

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

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.loadAllEmployees();
    this.loadDesignations();
    this.loadRoles();
    
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

    // STEP
  setActiveStep(step: any) {
    this.activeStep = step;
  }

  gotoStep2() {
    console.log(':gotoStep2:', this.empForm.getRawValue());

    const currentStep = this.stepsList.find(m => m.stepName == this.activeStep.stepName);
    currentStep!.isComplete = true;
    this.activeStep = this.stepsList[1];
    this.stepperCompletionValue = 50;
  };

  gotoStep3() {
    console.log(':gotoStep2:', this.empForm.getRawValue());

    const currentStep = this.stepsList.find(m => m.stepName == this.activeStep.stepName);
    currentStep!.isComplete = true;
    this.activeStep = this.stepsList[2];
    this.stepperCompletionValue = 100;
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

  addNew() {
    this.isCreateView = true;
  }

  onEdit(id: number) {
    this.employeesService.getEmployee(id).subscribe((res)=>{
      console.log(':GET:EDIT:EMP:', res);
      this.employeeObj = res.data;
      this.employeeObj.empId =  id;
      this.isCreateView = true;
    })
  }


  // *** HTTP
  loadDesignations() {
    // & async
    this.employeesService.getDesignations().subscribe((res: any) => {
      console.log('Load: Desgn: ', res);
      this.designationList = res.data;
    });
  }

  loadRoles() {
    this.employeesService.getRoles().subscribe((res:any)=>{
      console.log(':GET: Roles:', res);
      this.roleList = res.data;
    })
  }

  saveEmployee() {
    console.log(':SaveEmpl: ', this.empForm.getRawValue());
    this.employeesService.saveEmployee(this.empForm.getRawValue()).subscribe((res) => {
      if(res.result) {
        alert('Employee Created Success');
        this.loadAllEmployees();
        this.isCreateView = false;
      } else {
        alert(res.message)
      }
    })
  }

  loadAllEmployees() {
    this.employeesService.getAllEmployees().subscribe((res) => {
      console.log('ALL:EMPL: ', res);
      this.employeeList = res.data;
    })
  }

  updateEmployee() {
    this.employeesService.updateEmployee(this.empForm.getRawValue()).subscribe((res:any)=>{
      if(res.result) {
        alert('Employee Created Success')
        this.loadAllEmployees();
        this.isCreateView = false;
      } else {
        alert(res.message)
      }
    })
  }

  delete(id: number) {
    const isDelete = confirm("Are You sure want to delete");
    if(isDelete) {
      this.employeesService.deleteEmployee(id).subscribe((res:any)=>{
        if(res.result) {
          alert('Employee Deleted Success');
          this.loadAllEmployees();
        } else {
          alert(res.message)
        }
      })
    }
  }

  // **** OTHER
  empTrackBy(index: number, item: EmployeeAll) {
    return item.empCode;
  }
}
