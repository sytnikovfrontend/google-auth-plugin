const confirmBtn = document.querySelector(".confirm-btn");
const emailField = document.querySelector(".email");
const emailError = document.querySelector(".email-error");
const passwordField = document.querySelector(".password");
const passwordError = document.querySelector(".password-error");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailField.addEventListener("input", (event) => {
    const emailValue = event.target.value.trim();
    emailError.textContent = emailPattern.test(emailValue)
        ? ""
        : "Incorrect email";
});

passwordField.addEventListener("input", (event) => {
    const passwordValue = event.target.value.trim();
    passwordError.textContent =
        passwordValue.trim() === "" ? "The password cannot be empty" : "";
});

confirmBtn.addEventListener("click", async () => {
    if (!emailPattern.test(emailField.value.trim())) {
        emailError.textContent = "Incorrect email";
        return;
    }

    if (passwordField.value.trim() === "") {
        passwordError.textContent = "The password cannot be empty";
        return;
    }

    chrome.runtime.sendMessage({
        action: "addContentScript",
        email: emailField.value,
        password: passwordField.value,
    });
    window.close();
});
