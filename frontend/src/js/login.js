document.addEventListener("DOMContentLoaded", () => {

    const signUpLink = document.getElementsByClassName("signUpLink")[0];
    const loginBtn = document.getElementsByClassName("loginBtn")[0];

    signUpLink.onclick = () => {
        console.log("clicked");
        window.location.href = "./signUp.html";
    }

    loginBtn.onclick = () => {
        let userEmailValue = document.getElementById("userEmail").value;
        let userPasswordValue = document.getElementById("userPassword").value;

        // Replace it with Backend Connection
        userDummyCredentials = [{
            userEmail: "anoopgeorge418@gmail.com",
            userPassword: "47426951",
        }];

        if (userEmailValue === userDummyCredentials[0].userEmail && userPasswordValue === userDummyCredentials[0].userPassword) {
            console.log(`Email and Password Matched Logging In!`);
            window.location.href = './dashboard.html';
        } else {
            console.log("Oops No Account Found! Redirecting to Sign Up.");
            window.location.href = './signUp.html';
        };
    }
});
