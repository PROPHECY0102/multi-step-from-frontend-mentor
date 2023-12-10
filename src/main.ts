type UserInfo = {
  name: string | null;
  email: string | null;
  phone: string | null;
};

const userInfo: UserInfo = {
  name: null,
  email: null,
  phone: null,
};

type Step = {
  step: string;
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    step: "1",
    title: "Personal Info",
    desc: "Please provide your name, email address and phone number.",
  },
  {
    step: "2",
    title: "Select Your Plan",
    desc: "You have the option of monthly or yearly billing.",
  },
];

type Plan = {
  plan: string;
  monthly: number;
  yearly: number;
};

const Plans: Plan[] = [
  {
    plan: "Arcade",
    monthly: 9,
    yearly: 90,
  },
  {
    plan: "Advance",
    monthly: 12,
    yearly: 120,
  },
  {
    plan: "Pro",
    monthly: 15,
    yearly: 150,
  },
];

type formData = {
  userInfo: UserInfo;
  planChoice: Plan | null;
};

const InputFormData: formData = {
  userInfo: userInfo,
  planChoice: null,
};

function getEmptyForms(inputs: HTMLInputElement[]) {
  const emptyInputs = inputs.filter((input) => {
    return input.value === "";
  });
  return emptyInputs;
}

function renderError(emptyForms: HTMLInputElement[]) {
  if (emptyForms.length === 0) return false;
  emptyForms.forEach((input) => {
    input.setAttribute("data-empty", "");
    const labelContainer = document.querySelector<HTMLDivElement>(
      `[data-label=${input.getAttribute("name")}]`
    );
    const errorLabel = document.createElement("p");
    errorLabel.classList.add("error-label");
    errorLabel.setAttribute("data-error", input.getAttribute("name") ?? "");
    errorLabel.innerText = "This Field is Required";
    labelContainer?.append(errorLabel);
  });
  removeErrorOnKeydown(emptyForms);
  return true;
}

function removeErrorOnKeydown(inputs: HTMLInputElement[]) {
  inputs.forEach((input) => {
    input.addEventListener("keydown", () => {
      input.removeAttribute("data-empty");
      document
        .querySelector(`[data-error=${input.getAttribute("name")}]`)
        ?.remove();
    });
  });
}

function resetErrorOnSubmit(inputs: HTMLInputElement[]) {
  inputs.forEach((input) => {
    input.removeAttribute("data-empty");
    document
      .querySelector(`[data-error=${input.getAttribute("name")}]`)
      ?.remove();
  });
}

const inputFieldName = document.querySelector<HTMLInputElement>("#input-name");
const inputFieldEmail =
  document.querySelector<HTMLInputElement>("#input-email");
const inputFieldPhone =
  document.querySelector<HTMLInputElement>("#input-phone");

const inputs: HTMLInputElement[] = [
  inputFieldName,
  inputFieldEmail,
  inputFieldPhone,
] as HTMLInputElement[];

function stepOneSubmit() {
  resetErrorOnSubmit(inputs);
  if (!renderError(getEmptyForms(inputs))) {
    userInfo.name = inputFieldName?.value as string;
    userInfo.email = inputFieldEmail?.value as string;
    userInfo.phone = inputFieldPhone?.value as string;
    return true;
  }
  return false;
}

function getCurrentStepProp(currentStep: string) {
  return steps.find((each) => {
    return each.step === currentStep;
  });
}

function incrementStep(currentStep: string, submitted: boolean) {
  let numCurrentStep = Number(currentStep);
  if (submitted) {
    numCurrentStep++;
  }
  return String(numCurrentStep);
}

function determineCurrentStep(currentStep: string) {
  let isSubmitted = false;
  if (currentStep === "1") {
    isSubmitted = stepOneSubmit();
  }
  return isSubmitted;
}

function proceedNextStep(
  btnProceed: HTMLButtonElement,
  currentStep: string,
  isSubmitted: boolean
) {
  if (isSubmitted) {
    const nextStep = incrementStep(currentStep, isSubmitted);
    btnProceed?.setAttribute("data-curr", nextStep);
    return getCurrentStepProp(nextStep);
  }
  return getCurrentStepProp(currentStep);
}

function updateTextContent(element: HTMLElement | null, text: string) {
  if (element) {
    element.innerText = text;
  }
}

const formTitle = document.querySelector<HTMLHeadingElement>("#form-title");
const formDesc = document.querySelector<HTMLHeadingElement>("#form-desc");

function renderStepTitle(stepProp: Step | undefined) {
  if (stepProp) {
    updateTextContent(formTitle, stepProp.title);
    updateTextContent(formDesc, stepProp.desc);
  }
}

const sidePanelStepIndex = document.querySelectorAll<HTMLHeadingElement>(
  ".inner-steps-number"
);

function resetAttribute(
  elements: NodeListOf<HTMLElement> | null,
  dataAttribute: string
) {
  if (elements) {
    elements.forEach((element) => {
      element.removeAttribute(dataAttribute);
    });
  }
}

function addAttribute(
  element: HTMLElement | null,
  dataAttribute: string,
  value: string
) {
  if (element) {
    element.setAttribute(dataAttribute, value);
  }
}

function updateStepIndex(
  stepProp: Step | undefined,
  sidePanelStepIndex: NodeListOf<HTMLHeadingElement> | null
) {
  if (stepProp && sidePanelStepIndex) {
    resetAttribute(sidePanelStepIndex, "data-selected");
    const currentIndex = document.querySelector<HTMLHeadingElement>(
      `[data-step='${stepProp.step}']`
    );
    addAttribute(currentIndex, "data-selected", "");
  }
}

const btnProceed = document.querySelector<HTMLButtonElement>(".proceed");
const btnPrevious = document.querySelector<HTMLButtonElement>(".previous");

function decrementStep(step: string | null) {
  if (step) {
    const numStep = Number(step) - 1;
    return String(numStep);
  }
  return "1";
}

function renderBtnPrevious(
  btnPrevious: HTMLButtonElement | null,
  stepProp: Step | undefined
) {
  if (btnPrevious && stepProp) {
    if (stepProp.step !== "1") {
      btnPrevious.classList.remove("hide");
    } else {
      btnPrevious.classList.add("hide");
    }
  }
}

btnProceed?.addEventListener("click", () => {
  const currentStep = btnProceed.getAttribute("data-curr");
  if (currentStep) {
    const isSubmitted = determineCurrentStep(currentStep);
    const stepProp = proceedNextStep(btnProceed, currentStep, isSubmitted);
    renderStepTitle(stepProp);
    renderBtnPrevious(btnPrevious, stepProp);
    updateStepIndex(stepProp, sidePanelStepIndex);
  }
});

btnPrevious?.addEventListener("click", () => {
  const previousStep = decrementStep(
    btnProceed?.getAttribute("data-curr") ?? "1"
  );
  console.log(previousStep);
  const stepProp = getCurrentStepProp(previousStep);
  renderStepTitle(stepProp);
  renderBtnPrevious(btnPrevious, stepProp);
  updateStepIndex(stepProp, sidePanelStepIndex);
});
