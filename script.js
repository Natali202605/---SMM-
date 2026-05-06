const leadForm = document.getElementById("leadForm");
const formStatus = document.getElementById("formStatus");

function isValidContact(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telegramPattern = /^@?[a-zA-Z0-9_]{4,32}$/;
  return emailPattern.test(value) || telegramPattern.test(value);
}

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leadForm);
  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !contact || !message) {
    formStatus.textContent = "Заполните все поля.";
    return;
  }

  if (!isValidContact(contact)) {
    formStatus.textContent = "Укажите корректный Telegram или Email.";
    return;
  }

  const payload = { name, contact, message, createdAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("leads") || "[]");
  existing.push(payload);
  localStorage.setItem("leads", JSON.stringify(existing));

  formStatus.textContent = "Заявка сохранена. Спасибо, скоро свяжусь с вами.";
  leadForm.reset();
});
