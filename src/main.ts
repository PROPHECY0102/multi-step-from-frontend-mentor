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
  {
    step: "3",
    title: "Pick add-ons",
    desc: "Add-ons help enhance your gaming experience.",
  },
  {
    step: "4",
    title: "Finishing Up",
    desc: "Double-check everything looks OK before confirming.",
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

type AddOn = {
  option: string;
  addOnName: string;
  monthly: number;
  yearly: number;
};

const AddOns: AddOn[] = [
  {
    option: "1",
    addOnName: "Online Services",
    monthly: 1,
    yearly: 10,
  },
  {
    option: "2",
    addOnName: "Larger Storage",
    monthly: 2,
    yearly: 20,
  },
  {
    option: "3",
    addOnName: "Customizable Storage",
    monthly: 2,
    yearly: 20,
  },
];

type formData = {
  userInfo: UserInfo;
  planType: PlanType;
  planChoice: Plan;
  addOns: AddOn[];
};

const InputFormData: formData = {
  userInfo: userInfo,
  planType: "monthly",
  planChoice: {
    option: "1",
    planName: "Arcade",
    monthly: 9,
    yearly: 90,
  },
  addOns: [],
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

function getSelectedPlanOnSubmit(
  plans: Plan[],
  planTypeToggle: HTMLButtonElement | null,
  everyPlanButtons: NodeListOf<HTMLButtonElement>
) {
  if (planTypeToggle) {
    return {
      planType: getCurrentPlanType(planTypeToggle),
      planChoice:
        plans.find((plan) => {
          return (
            plan.option ===
            Array.from(everyPlanButtons)
              .find((button) => {
                return button.hasAttribute("data-selected-plan");
              })
              ?.getAttribute("data-plan")
          );
        }) ?? plans[0],
    };
  }
}

function validatePlan(
  choosenPlan: { planType: PlanType; planChoice: Plan } | undefined
) {
  if (choosenPlan) {
    InputFormData.planType = choosenPlan.planType;
    InputFormData.planChoice = choosenPlan.planChoice;
    swapAddOnPriceType(choosenPlan.planType);
    return true;
  }
  return false;
}

// Step 3 Functionality

const everyAddOnOptions =
  document.querySelectorAll<HTMLButtonElement>(".each-add-on");
const addOnPriceType =
  document.querySelectorAll<HTMLSpanElement>(".add-on-price-type");

function changeAddOnPrice(
  planType: PlanType,
  everyAddOnOptions: NodeListOf<HTMLButtonElement>,
  addOns: AddOn[]
) {
  everyAddOnOptions.forEach((addOnOption) => {
    const addOn =
      addOns.find((addOn) => {
        return addOn.option === addOnOption.getAttribute(".data-add-on");
      }) ?? addOns[0];
    const priceSpan = addOnOption.querySelector<HTMLSpanElement>(
      ".add-on-price-amount"
    );
    if (priceSpan) {
      priceSpan.innerText = String(addOn[planType]);
    }
  });
}

function changeAddOnPriceType(
  planType: PlanType,
  addOnPriceType: NodeListOf<HTMLSpanElement>
) {
  const updatedAddOnPriceType = planType === "monthly" ? "mo" : "yr";
  addOnPriceType.forEach((priceType) => {
    priceType.innerText = updatedAddOnPriceType;
  });
}

function swapAddOnPriceType(planType: PlanType) {
  changeAddOnPriceType(planType, addOnPriceType);
  changeAddOnPrice(planType, everyAddOnOptions, AddOns);
}

function addOnEventListener(everyAddOnOptions: NodeListOf<HTMLButtonElement>) {
  everyAddOnOptions.forEach((addOnOption) => {
    addOnOption.addEventListener("click", () => {
      if (addOnOption.hasAttribute("data-selected-add-on")) {
        addOnOption.removeAttribute("data-selected-add-on");
        return;
      }
      addOnOption.setAttribute("data-selected-add-on", "");
    });
  });
}

function getSelectedAddonSubmit(
  everyAddOnOptions: NodeListOf<HTMLButtonElement>
) {
  return Array.from(everyAddOnOptions)
    .filter((option) => {
      return option.hasAttribute("data-selected-add-on");
    })
    .map((selected) => {
      return selected.getAttribute("data-add-on") as string;
    });
}

function setUserSelectedAddon(
  selectedAddons: string[],
  addons: AddOn[],
  InputFormData: formData
) {
  InputFormData.addOns = [];
  selectedAddons.forEach((selectedAddon) => {
    addons.forEach((addon) => {
      if (addon.option === selectedAddon) {
        InputFormData.addOns.push(addon);
      }
    });
  });
  if (InputFormData.addOns.length > 0) {
    buildSummaryUi(InputFormData);
    return true;
  }
  return false;
}

// Step 4 Summary

const summaryContainer =
  document.querySelector<HTMLDivElement>(".summary-container");
const summaryPlan = document.querySelector<HTMLSpanElement>(".user-plan");
const summaryPlanType =
  document.querySelector<HTMLSpanElement>(".user-plan-type");
const summaryPlanPriceAmount = document.querySelector<HTMLSpanElement>(
  ".user-plan-price-amount"
);
const summaryPlanPriceType = document.querySelector<HTMLSpanElement>(
  ".user-plan-price-type"
);

function firstToUpper(string: string) {
  const charArray = string.split("");
  charArray[0] = charArray[0].toUpperCase();
  return charArray.join("");
}

function setSummaryPlan(InputFormData: formData) {
  const planType = firstToUpper(InputFormData.planType);
  const priceType = InputFormData.planType === "monthly" ? "mo" : "yr";
  if (summaryPlan) {
    summaryPlan.innerText = InputFormData.planChoice.planName;
  }
  if (summaryPlanType) {
    summaryPlanType.innerText = planType;
  }
  if (summaryPlanPriceAmount) {
    summaryPlanPriceAmount.innerText = String(
      InputFormData.planChoice[InputFormData.planType]
    );
  }
  if (summaryPlanPriceType) {
    summaryPlanPriceType.innerText = priceType;
  }
}

function resetSummaryAddOn() {
  document
    .querySelectorAll<HTMLDivElement>(".user-add-on-container")
    .forEach((addOnContainer) => {
      addOnContainer.remove();
    });
}

function createSummaryAddOnUi(
  addOnName: string,
  addOnPrice: string,
  priceType: string
) {
  const summaryAddOnContainer = document.createElement("div");
  const summaryAddOn = document.createElement("h2");
  const summaryAddOnPrice = document.createElement("p");
  summaryAddOnContainer.classList.add("user-add-on-container");
  summaryAddOn.classList.add("user-add-on");
  summaryAddOnPrice.classList.add("user-add-on-price");
  summaryAddOn.innerText = addOnName;
  summaryAddOnPrice.innerText = `+$${addOnPrice}/${priceType}`;
  summaryAddOnContainer.appendChild(summaryAddOn);
  summaryAddOnContainer.appendChild(summaryAddOnPrice);
  if (summaryContainer) {
    summaryContainer.appendChild(summaryAddOnContainer);
  }
}

function setSummaryAddOn(InputFormData: formData) {
  const priceType = InputFormData.planType === "monthly" ? "mo" : "yr";
  resetSummaryAddOn();
  InputFormData.addOns.forEach((addOn) => {
    const addOnName = addOn.addOnName;
    const addOnPrice = String(addOn[InputFormData.planType]);
    createSummaryAddOnUi(addOnName, addOnPrice, priceType);
  });
}

const summaryTotalLabelType = document.querySelector<HTMLSpanElement>(
  ".total-price-label-type"
);
const summaryTotalPriceAmount = document.querySelector<HTMLSpanElement>(
  ".total-price-amount"
);
const summaryTotalPriceType =
  document.querySelector<HTMLSpanElement>(".total-price-type");

function setSummaryTotal(InputFormData: formData) {
  const priceType = InputFormData.planType === "monthly" ? "mo" : "yr";
  let entries: number[] = [];
  entries.push(InputFormData.planChoice[InputFormData.planType]);
  InputFormData.addOns.forEach((addOn) => {
    entries.push(addOn[InputFormData.planType]);
  });
  const total = entries.reduce((accu, entry) => {
    return accu + entry;
  }, 0);
  if (summaryTotalLabelType) {
    summaryTotalLabelType.innerText = InputFormData.planType.replace("ly", "");
  }
  if (summaryTotalPriceAmount) {
    summaryTotalPriceAmount.innerText = String(total);
  }
  if (summaryTotalPriceType) {
    summaryTotalPriceType.innerText = priceType;
  }
}

function buildSummaryUi(InputFormData: formData) {
  setSummaryPlan(InputFormData);
  setSummaryAddOn(InputFormData);
  setSummaryTotal(InputFormData);
}

// Form Submission and Transition to Next Step Functionality

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

function stepTwoSubmit() {
  return validatePlan(
    getSelectedPlanOnSubmit(Plans, planTypeToggle, everyPlanButtons)
  );
}

function stepThreeSubmit() {
  const selectedAddons = getSelectedAddonSubmit(everyAddOnOptions);
  return setUserSelectedAddon(selectedAddons, AddOns, InputFormData);
}

// Functionality for Transitioning to Next Step Form

function getCurrentStepProp(currentStep: string) {
  return steps.find((each) => {
    return each.step === currentStep;
  });
}

function incrementStep(currentStep: string) {
  let numCurrentStep = Number(currentStep);
  return String(++numCurrentStep);
}

function processStepSubmission(currentStep: string) {
  if (currentStep === "1") {
    return stepOneSubmit();
  }
  if (currentStep === "2") {
    return stepTwoSubmit();
  }
  if (currentStep === "3") {
    return stepThreeSubmit();
  }
  return false;
}

function proceedNextStep(
  btnProceed: HTMLButtonElement,
  currentStep: string,
  isSubmitted: boolean
) {
  if (isSubmitted) {
    const nextStep = incrementStep(currentStep);
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

function confirmEvent() {
  const mainPanelContainer = document.querySelector<HTMLDivElement>(
    ".main-panel-container"
  );
  const submittedPanelContainer = document.querySelector<HTMLDivElement>(
    ".submitted-panel-container"
  );
  mainPanelContainer?.classList.add("hidden");
  submittedPanelContainer?.classList.remove("hidden");
}

function addConfirmEvent(btnConfirm: HTMLButtonElement | null) {
  btnConfirm?.addEventListener("click", confirmEvent);
}

function removeConfirmEvent(btnConfirm: HTMLButtonElement | null) {
  btnConfirm?.removeEventListener("click", confirmEvent);
}

function switchSubmitButton(currentStep: string | undefined) {
  const numStep = Number(currentStep) ?? 1;
  const btnConfirm = document.querySelector<HTMLButtonElement>(".confirm");
  if (numStep >= 4) {
    btnProceed?.classList.add("hidden");
    btnConfirm?.classList.remove("hidden");
    addConfirmEvent(btnConfirm);
  } else {
    btnProceed?.classList.remove("hidden");
    btnConfirm?.classList.add("hidden");
    removeConfirmEvent(btnConfirm);
  }
}

btnProceed?.addEventListener("click", () => {
  const currentStep = btnProceed.getAttribute("data-curr");
  if (currentStep) {
    const isSubmitted = processStepSubmission(currentStep);
    const stepProp = proceedNextStep(btnProceed, currentStep, isSubmitted);
    const formProp = getFormsProp(everyStepForms, stepProp);
    renderStepTitle(stepProp);
    renderForm(formProp);
    renderBtnPrevious(btnPrevious, stepProp);
    updateStepIndex(stepProp, sidePanelStepIndex);
    switchSubmitButton(stepProp?.step);
  }
});

btnPrevious?.addEventListener("click", () => {
  const previousStep = decrementStep(
    btnProceed?.getAttribute("data-curr") ?? "1"
  );
  btnProceed?.setAttribute("data-curr", previousStep);
  const stepProp = getCurrentStepProp(previousStep);
  const formProp = getFormsProp(everyStepForms, stepProp);
  renderStepTitle(stepProp);
  renderForm(formProp);
  renderBtnPrevious(btnPrevious, stepProp);
  updateStepIndex(stepProp, sidePanelStepIndex);
  switchSubmitButton(stepProp?.step);
});

(function init() {
  addPlanButtonEventListener(everyPlanButtons);
  addPlanTypeToggleEventListener(planTypeToggle);
  addOnEventListener(everyAddOnOptions);
})();
