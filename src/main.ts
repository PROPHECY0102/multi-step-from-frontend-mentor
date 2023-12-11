// Defining Types and Initialising Props

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
  option: string;
  planName: string;
  monthly: number;
  yearly: number;
};

type PlanType = "monthly" | "yearly";

const Plans: Plan[] = [
  {
    option: "1",
    planName: "Arcade",
    monthly: 9,
    yearly: 90,
  },
  {
    option: "2",
    planName: "Advance",
    monthly: 12,
    yearly: 120,
  },
  {
    option: "3",
    planName: "Pro",
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

// Utility Functions

function removeClassList(
  elements: NodeListOf<HTMLElement>,
  classList: string[]
) {
  elements.forEach((el) => {
    el.classList.remove(...classList);
  });
}

function addClassList(elements: NodeListOf<HTMLElement>, classList: string[]) {
  elements.forEach((el) => {
    el.classList.add(...classList);
  });
}

// Step 1 Form Functionality

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

// Step 2 Form Functionality

const everyPlanButtons =
  document.querySelectorAll<HTMLButtonElement>(".plan-buttons");

function resetPlanButtonSelection(
  everyPlanButtons: NodeListOf<HTMLButtonElement>
) {
  everyPlanButtons.forEach((button) => {
    button.removeAttribute("data-selected-plan");
  });
}

function addPlanButtonEventListener(
  everyPlanButtons: NodeListOf<HTMLButtonElement>
) {
  everyPlanButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetPlanButtonSelection(everyPlanButtons);
      button.setAttribute("data-selected-plan", "");
    });
  });
}

const planTypeToggle =
  document.querySelector<HTMLButtonElement>(".plan-type-toggle");
const planTypeLabel =
  document.querySelectorAll<HTMLParagraphElement>(".plan-type-text");

function toggleElementsAttribute(
  elements: NodeListOf<HTMLElement>,
  dataAttribute: string
) {
  elements.forEach((el) => {
    el.toggleAttribute(dataAttribute);
  });
}

function getCurrentPlanType(planTypeToggle: HTMLButtonElement): PlanType {
  const currentPlanType = planTypeToggle.getAttribute(
    "data-current-type"
  ) as PlanType;
  return currentPlanType ?? "monthly";
}

function getTogglePlanType(planTypeToggle: HTMLButtonElement) {
  return planTypeToggle.getAttribute("data-current-type") === "monthly"
    ? "yearly"
    : "monthly";
}

const planPriceType =
  document.querySelectorAll<HTMLSpanElement>(".plan-price-type");
const planPromotionTexts = document.querySelectorAll<HTMLParagraphElement>(
  ".plan-promotion-text"
);

function swapPlanPriceType(
  planPriceType: NodeListOf<HTMLSpanElement>,
  planPromotionTexts: NodeListOf<HTMLParagraphElement>,
  planType: PlanType
) {
  const updatedPlanText = planType === "monthly" ? "mo" : "yr";
  planPriceType.forEach((span) => {
    span.innerText = updatedPlanText;
  });
  if (planType === "yearly") {
    removeClassList(planPromotionTexts, ["hidden"]);
  } else {
    addClassList(planPromotionTexts, ["hidden"]);
  }
}

function swapPlanPriceAmount(
  plans: Plan[],
  everyPlanButtons: NodeListOf<HTMLButtonElement>,
  planType: PlanType
) {
  everyPlanButtons.forEach((button) => {
    const plan =
      plans.find((plan) => {
        return plan.option === button.getAttribute("data-plan");
      }) ?? plans[0];
    const priceSpan =
      button.querySelector<HTMLSpanElement>(".plan-price-amount")!;
    priceSpan.innerText = String(plan[planType]);
  });
}

function addPlanTypeToggleEventListener(
  planTypeToggle: HTMLButtonElement | null
) {
  if (planTypeToggle) {
    planTypeToggle.addEventListener("click", () => {
      planTypeToggle.setAttribute(
        "data-current-type",
        getTogglePlanType(planTypeToggle)
      );
      toggleElementsAttribute(planTypeLabel, "data-selected");
      swapPlanPriceType(
        planPriceType,
        planPromotionTexts,
        getCurrentPlanType(planTypeToggle)
      );
      swapPlanPriceAmount(
        Plans,
        everyPlanButtons,
        getCurrentPlanType(planTypeToggle)
      );
    });
  }
}

// Form Submission and Transition Functionality

// Unique Forms Submission Functions
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

function stepTwoSubmit() {}

// Functionality for Transitioning to Next Step Form

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

// Update Form Title

const formTitle = document.querySelector<HTMLHeadingElement>("#form-title");
const formDesc = document.querySelector<HTMLHeadingElement>("#form-desc");

function updateTextContent(element: HTMLElement | null, text: string) {
  if (element) {
    element.innerText = text;
  }
}

function renderStepTitle(stepProp: Step | undefined) {
  if (stepProp) {
    updateTextContent(formTitle, stepProp.title);
    updateTextContent(formDesc, stepProp.desc);
  }
}

// Swapping Index Number for Steps Index on Side Panel UI

const sidePanelStepIndex = document.querySelectorAll<HTMLHeadingElement>(
  ".inner-steps-number"
);

function resetAttribute(
  elements: NodeListOf<HTMLElement>,
  dataAttribute: string
) {
  elements.forEach((element) => {
    element.removeAttribute(dataAttribute);
  });
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
  sidePanelStepIndex: NodeListOf<HTMLHeadingElement>
) {
  if (stepProp) {
    resetAttribute(sidePanelStepIndex, "data-selected");
    const currentIndex = document.querySelector<HTMLHeadingElement>(
      `[data-step='${stepProp.step}']`
    );
    addAttribute(currentIndex, "data-selected", "");
  }
}

// Swapping Current Step Form into View

const everyStepForms = document.querySelectorAll<HTMLDivElement>(
  ".form-input-container"
);

type FormProp = {
  currentForm: HTMLDivElement;
  otherForms: HTMLDivElement[];
};

function getFormsProp(
  everyStepForms: NodeListOf<HTMLDivElement>,
  stepProp: Step | undefined
): FormProp | undefined {
  if (stepProp) {
    const formArray = Array.from(everyStepForms);
    return {
      currentForm:
        formArray.find((form) => {
          return form.getAttribute("data-form") === stepProp.step;
        }) ?? formArray[0],
      otherForms: formArray.filter((form) => {
        return form.getAttribute("data-form") !== stepProp.step;
      }),
    };
  }
}

function renderForm(formProp: FormProp | undefined) {
  if (formProp) {
    formProp.currentForm.classList.remove("hidden");
    formProp.otherForms.forEach((form) => {
      form.classList.add("hidden");
    });
  }
}

// Submission and Revert Buttons Functionality

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
    const formProp = getFormsProp(everyStepForms, stepProp);
    renderStepTitle(stepProp);
    renderForm(formProp);
    renderBtnPrevious(btnPrevious, stepProp);
    updateStepIndex(stepProp, sidePanelStepIndex);
  }
});

btnPrevious?.addEventListener("click", () => {
  const previousStep = decrementStep(
    btnProceed?.getAttribute("data-curr") ?? "1"
  );
  const stepProp = getCurrentStepProp(previousStep);
  const formProp = getFormsProp(everyStepForms, stepProp);
  renderStepTitle(stepProp);
  renderForm(formProp);
  renderBtnPrevious(btnPrevious, stepProp);
  updateStepIndex(stepProp, sidePanelStepIndex);
});

(function init() {
  addPlanButtonEventListener(everyPlanButtons);
  addPlanTypeToggleEventListener(planTypeToggle);
})();
