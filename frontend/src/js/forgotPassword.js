import { showAlert, getDummyCreds, saveDummyCreds  } from "../components/reusableFunctions.js";

document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementsByClassName("submit")[0];
    let sixDigitOTP = Math.floor(100000 + Math.random() * 900000);
    const otpfield = document.getElementById("otp");
    const newPass = document.getElementById("newPass");
    const confirmedNew = document.getElementById("confirmPass")

    submitBtn.onclick = () => {
        const userEmailValue = document.getElementById("userEmail").value.trim().toLowerCase();
        const userOTPEntry = document.getElementById("otp").value.trim();
        const userNewPassword = document.getElementById("newPass").value.trim();
        const confirmedNewPass = document.getElementById("confirmPass").value.trim();
        
        let users = getDummyCreds();
        const isEmailFound = users.find(user => (
            user.userEmail === userEmailValue
        ));

        if (!userEmailValue) {
            showAlert("Email is required to send the otp!", "error");
            return;
        } else if (!isEmailFound) {
            showAlert("Email is not registered with us! Use the registered email to recieve the otp.", "error");
            return;
        } else {
            showAlert("Your OTP is available in the console", "success");
            console.log(`Your six digit OTP is: ${sixDigitOTP}`);
            otpfield.style.display = "block";
        };

        if (!userOTPEntry) {
            showAlert("Please enter the OTP recieved in your registered email address", "error");
            return;
        } else if (Number(userOTPEntry) !== sixDigitOTP) {
            showAlert("OTP not verified! Try again", "error");
            return;
        } else {
            showAlert("OTP verified!", "success");
            newPass.style.display = "block";
            confirmedNew.style.display = "block";
        };

        if (!userNewPassword || !confirmedNewPass) {
            showAlert("Please create a new password and confirm it for your account", "error");
            return;
        } else if (userNewPassword !== confirmedNewPass) {
            showAlert("Both the password should be matched", "error");
            return;
        } else if (userNewPassword) {
            isEmailFound.userPassword = userNewPassword;
            saveDummyCreds(users)
            // console.log("Updated users array:", users);

            showAlert("Password Resetted successfully!! Redirecting to login....", "success")
            setTimeout(() => {
                window.location.href = "./login.html";
            }, "500");
        }

    }
});