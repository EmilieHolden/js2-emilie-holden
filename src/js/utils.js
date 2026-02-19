export function validateForm(form) {
    let valid = true;

    // Remove old errors
    form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
    form.querySelectorAll(".error-text").forEach(el => el.remove());

    // Validate each field
    form.querySelectorAll("input, textarea, select").forEach(input => {
        // Custom email validation
        if (input.id === "email") {
            const emailRegex = /^[^@]+@stud\.noroff\.no$/;
            if (input.value && !emailRegex.test(input.value)) {
                valid = false;
                input.classList.add("input-error");

                const errorMessage = document.createElement("p");
                errorMessage.classList.add("error-text");
                errorMessage.textContent = "Email must be a valid stud.noroff.no address.";

                input.insertAdjacentElement("beforebegin", errorMessage);
                return;
            }
        }

        if (!input.checkValidity()) {
            valid = false;
            input.classList.add("input-error");

            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error-text");

            // Custom password message
            if (input.id === "password" && input.value.length < 8) {
                errorMessage.textContent = "Password must be at least 8 characters." || "This field is invalid.";
            } else {
                errorMessage.textContent = input.validationMessage;
            }

            input.insertAdjacentElement("beforebegin", errorMessage);
        }
        // Custom title message
        if (input.name === "title" && input.value.trim().length === 0) {
            valid = false;
            input.classList.add("input-error");

            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error-text");
            errorMessage.textContent = "Title is required."
            input.insertAdjacentElement("beforebegin", errorMessage);
            return;
        } if (input.name === "title" && input.value.trim().length > 1) {
            valid = true;

            const errorMessage = document.createElement("p")
            errorMessage.textContent = "Post is published."
            errorMessage.classList.add("success-text")

            input.insertAdjacentElement("beforebegin", errorMessage);
            return;
        }

    })

    return valid;

}