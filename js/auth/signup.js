//implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("BtnValidationInscription");
const formInscription = document.getElementById("formulaireInscription");


inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);
btnValidation.addEventListener("click", InscrireUtilisateur);

//fonction permettant de valider tout le formulaire
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPrenom);
    const mailOk = validateMail(inputEmail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirm = validateConfirmationPassword(inputPassword, inputValidatePassword);

    if (nomOk && prenomOk && mailOk && passwordOk && passwordConfirm) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}
//vérification du champ non vide
function validateRequired(input) {
    if (input.value != '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
//vérification du champ Email
function validateMail(input) {
    //définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//vérification du champ Mot de passe
function validatePassword(input) {
    //définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {

    if (inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

function InscrireUtilisateur() {
    let dataform = new FormData(formInscription);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "firstName": dataform.get("nom"),
        "lastName": dataform.get("prenom"),
        "email": dataform.get("email"),
        "password": dataform.get("mdp")
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/registration", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Erreur lors de l'inscription");
            }

        })
        .then(result => {
            alert("Bravo " + dataform.get("prenom") + "! Inscription réussie ");
            document.location.href = "/signin";
        })
        .catch(error => console.log('error', error));
}