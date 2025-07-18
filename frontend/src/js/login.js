import { getDummyCreds, saveDummyCreds, showAlert } from "../components/reusableFunctions.js";

document.addEventListener("DOMContentLoaded", () => {

    const signUpLink = document.getElementsByClassName("signUpLink")[0];
    const loginBtn = document.getElementsByClassName("loginBtn")[0];
    const forgotPassword = document.getElementsByClassName("forgotPass")[0];

    signUpLink.onclick = () => {
        setTimeout(() => {
            window.location.href = "./signUp.html";
        }, "500")
    }

    forgotPassword.onclick = () => {
        setTimeout(() => {
            window.location.href = "./forgotPassword.html";
        }, "500")
    }

    loginBtn.onclick = () => {
        let userEmailValue = document.getElementById("userEmail").value.toLowerCase().trim();
        let userPasswordValue = document.getElementById("userPassword").value.trim();

        const users = getDummyCreds();
        const foundUser = users.find(user =>
            user.userName.toLowerCase() === userEmailValue || 
            user.userEmail.toLowerCase() === userEmailValue
        );

        if (!userEmailValue) {
            showAlert("Email or userName is Required", "error")
            return;
        } else if (!userPasswordValue) {
            showAlert("Password is Required", "error")
            return;
        } else if (!foundUser) {
            showAlert("User not found! Try again or sign up.", "error");
            return;
        } else if (foundUser.userPassword !== userPasswordValue) {
            showAlert("Password didn't mached! Try again or Reset the password by clicking Forgot Password.", "error");
            return;
        } else {
            showAlert("Login successful!! Redirecting...", "success");
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, "1000");
        };

        // clearing inputs
        document.querySelectorAll("input").forEach(input => input.value = "");
    }
    
});


