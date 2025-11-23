const validationRules = {
  "worker-name": {
    regex: /^[a-zA-Z\s.'-]{2,50}$/,
    message:
      "Worker name must be 2–50 characters long and contain only letters.",
  },

  // "img-url": {
  //   regex: /^https?:\/\/.+\..+$/i,
  //   message: "Please enter a valid image URL.",
  // },

  "worker-email": {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address.",
  },

  "worker-phone": {
    regex: /^[+\d\s()-]{10,}$/,
    message: "Please enter a valid phone number with at least 10 digits.",
  },
};

function toggleError(field, show, message = "") {
  const errorDisplay = document.getElementById(`${field}-error`);
  const inputField = document.getElementById(field);

  if (show) {
    errorDisplay.textContent = message;
    errorDisplay.classList.remove("hidden");
    inputField.classList.add("border-red-500");
    inputField.classList.remove("border-green-500");
  } else {
    errorDisplay.classList.add("hidden");
    inputField.classList.remove("border-red-500");
    inputField.classList.add("border-green-500");
  }
}

function validateField(field, value) {
  const rule = validationRules[field];

  if (rule && !rule.regex.test(value)) {
    toggleError(field, true, rule.message);
    return false;
  } else if (rule) {
    toggleError(field, false);
    return true;
  }
  return true;
}

function validateForm() {
  let isValid = true;
  
  for (const field in validationRules) {
    const inputField = document.getElementById(field);
    if (inputField && !validateField(field, inputField.value)) {
      isValid = false;
    }
  }

  const fromDate = document.querySelector(".form_date");
  const toDate = document.querySelector(".to_date");
  const fromDateError = document.querySelector(".from-date-error");
  const toDateError = document.querySelector(".to-date-error");

  if (fromDate && toDate && fromDateError && toDateError) {
    if (!fromDate.value) {
      fromDateError.textContent = "Start date is required.";
      fromDateError.classList.remove("hidden");
      fromDate.classList.add("border-red-500");
      isValid = false;
    } else {
      fromDateError.textContent = "";
      fromDateError.classList.add("hidden");
      fromDate.classList.remove("border-red-500");
    }

    if (!toDate.value) {
      toDateError.textContent = "End date is required.";
      toDateError.classList.remove("hidden");
      toDate.classList.add("border-red-500");
      isValid = false;
    } else if (fromDate.value && toDate.value) {
      const startValue = new Date(fromDate.value);
      const endValue = new Date(toDate.value);

      if (endValue <= startValue) {
        toDateError.textContent = "End date must be greater than start date.";
        toDateError.classList.remove("hidden");
        toDate.classList.add("border-red-500");
        isValid = false;
      } else {
        toDateError.textContent = "";
        toDateError.classList.add("hidden");
        toDate.classList.remove("border-red-500");
        toDate.classList.add("border-green-500");
      }
    }
  }

  return isValid;
}

export { validateForm };