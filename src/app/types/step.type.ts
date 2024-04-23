export type Step = {
  stepName: EStepName;
  isComplete: false;
};

export type StepName = "Skills" | "Basic Details" | "Experience";

export type StepNames = {
  Skills: "Skills";
  BasicDetails: "Basic Details";
  Experience: "Experience";
}

export enum EStepName {
  Skills = "Skills",
  BasicDetails = "Basic Details",
  Experience = "Experience",
}

// Not Work
export const CStepName: StepNames = {
  Skills: "Skills",
  BasicDetails: "Basic Details",
  Experience: "Experience",
}

type NamesS = keyof StepNames;

type Tes1 = {
  names: NamesS;
}

let nms: Tes1 = { names: 'BasicDetails'}

// const stepsList: Step[] = [
//   { stepName: EStepName.BasicDetails, isComplete: false },
//   { stepName: CStepName.BasicDetails, isComplete: false },
//   { stepName: "Skills", isComplete: false },
//   { stepName: "Experience", isComplete: false },
// ];

