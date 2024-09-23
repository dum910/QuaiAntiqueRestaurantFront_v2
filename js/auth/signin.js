const mailInput = document.getElementById('EmailInput');
const passwordInput = document.getElementById('PasswordInput');
const btnSignin = document.getElementById('BtnSignin');
const signinForm = document.getElementById('signinForm');

btnSignin.addEventListener('click', checkCredentials);

function checkCredentials() {
    let dataform = new FormData(signinForm);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataform.get("email"),
        "password": dataform.get("mdp")
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl + "login", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                mailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");
            }
        })
        .then(result => {
            const token = result.apiToken;
            setToken(token);
            //Placer ce token en cookie
            setCookie(roleCookieName, result.roles[0], 7)
            window.location.replace("/");
        })
        .catch(error => console.log('error', error));

}