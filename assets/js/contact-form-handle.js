// Contact form validation
const form = document.getElementById("contactForm");
const res = document.getElementById("contactResult");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
  subject: document.getElementById("subject"),
  phone: document.getElementById("phone"),
};
const errs = {
  name: document.getElementById("nameErr"),
  email: document.getElementById("emailErr"),
  message: document.getElementById("messageErr"),
};

function validEmail(v) {
  return /^\S+@\S+\.\S+$/.test(v);
}
function setError(field, msg) {
  fields[field].classList.add("invalid");
  errs[field].textContent = msg;
}
function clearError(field) {
  fields[field].classList.remove("invalid");
  errs[field].textContent = "";
}
["name", "email", "message"].forEach((k) =>
  fields[k].addEventListener("input", () => clearError(k))
);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
  if (!fields.message.value.trim()) {
    setError("message", "Please write a message.");
    ok = false;
  }
  if (!ok) {
    res.classList.add("err");
    res.textContent = "Please fillup the highlighted fields.";
    return;
  }

  res.textContent = "Sending…";
  try {
    await emailjs.send("service_code", "contact_template_code", {
      from_name: fields.name.value,
      from_email: fields.email.value,
      phone: fields.phone.value || "",
      subject: fields.subject.value || "Contact Form",
      message: fields.message.value,
    });
    res.classList.add("ok");
    res.textContent = "Thanks! Your message has been sent.";
    form.reset();
  } catch (err) {
    console.error(err);
    res.classList.add("err");
    res.textContent = "Sorry, something went wrong. Please try again later.";
  }
});
