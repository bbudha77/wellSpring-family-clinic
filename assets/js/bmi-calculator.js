// BMI Calculator
const form = document.getElementById("bmiForm");
const heightValue = document.getElementById("heightValue");
const heightUnit = document.getElementById("heightUnit");
const weight = document.getElementById("weight");
const heightErr = document.getElementById("heightErr");
const weightErr = document.getElementById("weightErr");
const resultLine = document.getElementById("bmiResult");
const resultWrap = document.getElementById("bmiResultWrap");

function setBadge(bmi) {
  let label = "",
    cls = "";
  if (bmi < 18.5) {
    label = "Underweight";
    cls = "badge--under";
  } else if (bmi < 25) {
    label = "Normal";
    cls = "badge--normal";
  } else if (bmi < 30) {
    label = "Overweight";
    cls = "badge--over";
  } else {
    label = "Obese";
    cls = "badge--obese";
  }
  return { label, cls };
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // reset errors & classes
  heightErr.textContent = "";
  weightErr.textContent = "";
  resultWrap.classList.remove("is-under", "is-normal", "is-over", "is-obese");

  const h = parseFloat(heightValue.value);
  const w = parseFloat(weight.value);
  const unit = heightUnit.value;

  let ok = true;
  if (!h || h <= 0) {
    heightErr.textContent = "Please enter a valid height.";
    ok = false;
  }
  if (!w || w <= 0) {
    weightErr.textContent = "Please enter a valid weight.";
    ok = false;
  }
  if (!ok) return;

  const meters = unit === "cm" ? h / 100 : h;
  if (meters <= 0 || meters > 3) {
    heightErr.textContent = "Height seems unrealistic.";
    return;
  }
  if (w > 500) {
    weightErr.textContent = "Weight seems unrealistic.";
    return;
  }

  const bmi = w / (meters * meters);
  const { label, cls } = setBadge(bmi);

  resultLine.innerHTML = `Your BMI is <strong>${bmi.toFixed(
    1
  )}</strong> <span class="badge ${cls}">${label}</span>`;
});
