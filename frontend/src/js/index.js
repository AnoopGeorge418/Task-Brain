document.addEventListener("DOMContentLoaded", () => {
    const navLoginBtn = document.getElementsByClassName("loginBtn1")[0];
    const navSignUpBtn = document.getElementsByClassName("signUpBtn1")[0];
    const navLogo = document.getElementsByClassName("logo")[0];
    const getStartedBtn = document.getElementsByClassName("ctaLoginBtn")[0];
    const toGithubProfile = document.getElementsByClassName("linktoGithub")[0];
    const currentDateTimeYear = document.getElementById("year");

    redirectToPages = [
        { element: navLoginBtn, url: "./pages/login.html" },
        { element: navSignUpBtn, url: "./pages/signUp.html" },
        { element: navLogo, url: "./index.html" },
        { element: getStartedBtn, url: "./pages/login.html" },
        { element: toGithubProfile, url: "https://github.com/AnoopGeorge418" },
    ];

    redirectToPages.forEach( ({element, url}) => {
        if (element) {
            element.addEventListener("click", () => {
                window.location.href = url;
            });
        };
    });

    // Current Year
    currentDateTimeYear.textContent = new Date().getFullYear();

});
