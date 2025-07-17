document.addEventListener("DOMContentLoaded", () => {

    const redirectToLogin = document.getElementsByClassName("loginLink")[0];
    const signUpBtn = document.getElementsByClassName("signUpBtn")[0];

    // Replace it with Backend Connection
    const userDummyCredentials = [];

    redirectToLogin.onclick = () => {
        window.location.href = './login.html';
    }

    // form Inputs handling
    signUpBtn.onclick = () => {
        let userNameValue = document.getElementById("userName").value.trim().toLowerCase();
        const userEmailValue = document.getElementById("userEmail").value.trim().toLowerCase();
        const userPasswordValue = document.getElementById("userPassword").value.trim();
        const confirmedUserPasswordValue = document.getElementById("confirmedUserPassword").value.trim();

        // TODO: checking - remove it later
        console.log(userNameValue);
        console.log(userEmailValue);
        console.log(userPasswordValue);
        console.log(confirmedUserPasswordValue);
        
        // make sure to check all feilds met its requirements
            /* 
                1. userName:
                    - convert user inputs to small letters
                    - accepts letters, numbers and symbols
                    - check if this userName in dummy creds
                2. userEmail: 
                    - check if it is used in creds
                    - check if it is a valid email 
                    - give error message
                3. password:
                    - should be more than 12 in length
                    - should include numbers, letters(both small and capial atleast 1 both), and symbols.
                4. confirmed password:
                    - shuld be same as password

            */
        // every creds will be a seperate user - added to dummy creds as a sepearate user
        // push the user creds to dummy creds as seperate object itself.
        
        
        
        
    }
});
