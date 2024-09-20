const mailInput = document.getElementById('EmailInput');
const passwordInput = document.getElementById('PasswordInput');
const btnSignin = document.getElementById('BtnSignin');

btnSignin.addEventListener('click', checkCredentials);

function checkCredentials() {
    //Ici, il faudra appelé l'API pour vérifier les identifiants en BDD

    if (mailInput.value === "test@mail.com" && passwordInput.value === "123") {
        //alert("Vous êtes connecté");
        //il faudra récupérer le vrai token de l'API
        const token = "fjnqevilrenbvlewhrbclwbqlerkvbnwlvisnd"
        setToken(token);
        //Placer ce token en cookie
        setCookie(roleCookieName, "client", 7)
        window.location.replace("/");
    } else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}