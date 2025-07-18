import { getDummyCreds, saveDummyCreds, showAlert } from "../components/reusableFunctions.js";

document.addEventListener("DOMContentLoaded", () => {

    const redirectToLogin = document.getElementsByClassName("loginLink")[0];
    const signUpBtn = document.getElementsByClassName("signUpBtn")[0];

    redirectToLogin.onclick = () => {
        setTimeout(() => {
            window.location.href = './login.html';
        }, "500")
    }

    // Form Inputs handling
    signUpBtn.onclick = () => {
        
        const userNameValue = document.getElementById("userName").value.trim().toLowerCase();
        const userEmailValue = document.getElementById("userEmail").value.trim().toLowerCase();
        const userPasswordValue = document.getElementById("userPassword").value.trim();
        const confirmedUserPasswordValue = document.getElementById("confirmedUserPassword").value.trim();
       
        const totalLengthOfuserName = userNameValue.length;
        const hasLetter = /[a-zA-Z]/.test(userNameValue); // fixed a-zA-z typo
        const hasNumber = /\d/.test(userNameValue);
        const hasSymbol = /[^a-zA-Z0-9]/.test(userNameValue);

        const users = getDummyCreds();
        const isUserNameTaken = users.some(user => user.userName === userNameValue);
        const requiredDomain = "@gmail.com";
        const isUserEmailTaken = users.some(user => user.userEmail === userEmailValue);
        const totalPasswordLength = userPasswordValue.length;

        console.log(userNameValue, userEmailValue, userPasswordValue, confirmedUserPasswordValue);

        // === 1. UserName Validation ===
        if (!userNameValue) {
            showAlert("UserName required!", "error");
            return;
        } else if (totalLengthOfuserName < 5) {
            showAlert("UserName should not be less than 5 characters!", "error");
            return;
        } else if (!hasLetter || !hasSymbol || !hasNumber) {
            showAlert("UserName must include at least 1 number, 1 symbol, and letters.", "error");
            return;
        } else if (isUserNameTaken) {
            showAlert("UserName is already in use! Choose a different one.", "error");
            return;
        };

        // === 2. UserEmail Validation ===
        if (!userEmailValue) {
            showAlert("UserEmail is Required!", "error");
            return;
        } else if (!userEmailValue.endsWith(requiredDomain)) {
            showAlert("Please enter a valid Email address!", "error");
            return;
        } else if (isUserEmailTaken) {
            showAlert("UserEmail is already in Exist! Try Loggin in.", "error");
            return;
        };

        // === 3. UserPassword Validation ===
        if (!userPasswordValue) {
            showAlert("Please enter the password", "error");
            return;
        } else if (totalPasswordLength < 10) {
            showAlert("Password should be more than 10 character.");
            return;
        } else if (!hasLetter || !hasNumber || !hasSymbol) {
            showAlert("UserPassword must include at least 1 number, 1 symbol, and letters.", "error");
            return;
        };

        // === 4. Confirmed UserPassword Validation ===
        if (!confirmedUserPasswordValue) {
            showAlert("Please confirm the password", "error");
            return;
        } else if (confirmedUserPasswordValue !== userPasswordValue){
            showAlert("Both Passweords should be same!", "error");
            return;
        };

        // Pushing the fetched data to dummy creds
        saveDummyCreds({
            userName: userNameValue,
            userEmail: userEmailValue,
            userPassword: userPasswordValue,
        });

        // clearing inputs
        document.querySelectorAll("input").forEach(input => input.value = "");

        showAlert("Account created successful!! Redirecting...", "success");
        setTimeout(() => {
            window.location.href = './login.html';
        }, "1000");
    };

});
