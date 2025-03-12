document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const messageCounter = document.getElementById("messageCounter");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents form from refreshing
        let isValid = true;

        console.log("Form submission attempt...");

        // **NAME VALIDATION**
        let name = nameInput.value.trim();
        let namePattern = /^[A-Za-z\s]+$/;

        if (name === "") {
            nameError.innerText = "Name is required!";
            nameInput.classList.add("error-border");
            isValid = false;
        } else if (!namePattern.test(name)) {
            nameError.innerText = "Only alphabets and spaces allowed!";
            nameInput.classList.add("error-border");
            isValid = false;
        } else {
            nameError.innerText = "";
            nameInput.classList.remove("error-border");
        }

        // **EMAIL VALIDATION**
        let email = emailInput.value.trim();
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.innerText = "Email is required!";
            emailInput.classList.add("error-border");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.innerText = "Invalid email format!";
            emailInput.classList.add("error-border");
            isValid = false;
        } else {
            emailError.innerText = "";
            emailInput.classList.remove("error-border");
        }

        // **MESSAGE VALIDATION**
        let message = messageInput.value.trim();

        if (message === "") {
            messageError.innerText = "Message is required!";
            messageInput.classList.add("error-border");
            isValid = false;
        } else if (message.length > 2000) {
            messageError.innerText = "Max 2000 characters allowed!";
            messageInput.classList.add("error-border");
            isValid = false;
        } else {
            messageError.innerText = "";
            messageInput.classList.remove("error-border");
        }

        console.log("Validation result:", isValid);

        // **SHOW SUCCESS MESSAGE IF VALID**
        if (isValid) {
            showSuccessMessage();
            form.reset(); // Reset form
            messageCounter.innerText = "0 / 2000"; // Reset counter
            removeErrorBorders();
        }
    });

    // **MESSAGE CHARACTER COUNTER**
    messageInput.addEventListener("input", function () {
        let messageLength = this.value.length;
        messageCounter.innerText = `${messageLength} / 2000`;

        if (messageLength > 2000) {
            messageCounter.style.color = "red";
        } else {
            messageCounter.style.color = "white";
        }
    });

    // **SHOW SUCCESS MESSAGE POPUP**
    function showSuccessMessage() {
        let successBox = document.createElement("div");
        successBox.innerHTML = `<div class="success-popup">
                                    <p>✅ Thank you for contacting us! Your message has been sent successfully.</p>
                                    <button onclick="this.parentElement.style.display='none'">OK</button>
                                </div>`;
        document.body.appendChild(successBox);
    }

    // **REMOVE ERROR BORDERS**
    function removeErrorBorders() {
        nameInput.classList.remove("error-border");
        emailInput.classList.remove("error-border");
        messageInput.classList.remove("error-border");
    }
});
