// Set min date = today (local)
const dateEl = document.getElementById("date");
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
dateEl.min = `${yyyy}-${mm}-${dd}`;

// Form validation & UX
const form = document.getElementById("apptForm");
const res = document.getElementById("apptResult");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  date: document.getElementById("date"),
  message: document.getElementById("message"),
};
const errs = {
  name: document.getElementById("nameErr"),
  email: document.getElementById("emailErr"),
  date: document.getElementById("dateErr"),
  message: document.getElementById("messageErr"),
};

function setError(field, msg) {
  fields[field].classList.add("invalid");
  errs[field].textContent = msg;
}
function clearError(field) {
  fields[field].classList.remove("invalid");
  errs[field].textContent = "";
}
function validEmail(v) {
  return /^\S+@\S+\.\S+$/.test(v);
}

// Instant feedback on input
Object.keys(fields).forEach((k) => {
  fields[k].addEventListener("input", () => clearError(k));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Reset result
  res.className = "result";
  res.textContent = "";

  let ok = true;
  if (!fields.name.value.trim()) {
    setError("name", "Please enter your name.");
    ok = false;
  }
  if (!validEmail(fields.email.value.trim())) {
    setError("email", "Enter a valid email.");
    ok = false;
  }
  if (!fields.date.value) {
    setError("date", "Select a preferred date.");
    ok = false;
  }
  if (!fields.message.value.trim()) {
    setError("message", "Please add a short message.");
    ok = false;
  }

  if (!ok) {
    res.classList.add("err");
    res.textContent = "Please fillup the highlighted fields.";
    return;
  }

  // Success UI
  res.textContent = "Sending…";
  emailjs
    .send("service_5oupc9a", "template_wx4ylsp", {
      from_name: fields.name.value,
      from_email: fields.email.value,
      phone: document.getElementById("phone").value || "",
      date: fields.date.value,
      message: fields.message.value,
      origin: window.location.origin,
      time: new Date().toLocaleString(),
    })
    .then(() => {
      res.classList.add("ok");
      res.textContent = "Thanks! Your appointment request has been sent.";
      form.reset();
    })
    .catch(() => {
      res.classList.add("err");
      res.textContent = "Sorry, something went wrong. Please try again later.";
    });
});
