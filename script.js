const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll("form");
const wrapper = document.querySelector(".wrapper");

tabs[0].classList.add("active");
forms[0].classList.add("active");
let isFormValid =false; //перевірка чи форма валідна
let isFieldFilled = false; //перевірка чи поле заповнене


SwitchTab();
HideShowPasswords();
CheckedSignupFields();
CheckDataForLoginFromLocalStorage();

let formData = {};

const storedFormData = localStorage.getItem("formData");
console.log(storedFormData);

function HideShowPasswords(){
    const imageHideLogin = document.querySelector(".image-hide-password-login");
    const imageShowLogin = document.querySelector(".image-show-password-login");
    const imageHideSignup = document.querySelector(".image-hide-password-signup");
    const imageShowSignup = document.querySelector(".image-show-password-signup");
    const imageHideSignupConfirm = document.querySelector(".image-hide-password-signup-confirm");
    const imageShowSignupConfirm =document.querySelector(".image-show-password-signup-confirm");
    const inputPassowrdFieldLogin = document.querySelector('.login-input-password');
    const inputPassowrdFieldSignup = document.querySelector('.signup-input-password');
    const inputPassowrdFieldSignupConfirm = document.querySelector('.signup-input-confirm-password');
    ShowHidePassword(imageHideLogin, imageShowLogin,inputPassowrdFieldLogin);
    ShowHidePassword(imageHideSignup, imageShowSignup,inputPassowrdFieldSignup);
    ShowHidePassword(imageHideSignupConfirm, imageShowSignupConfirm,inputPassowrdFieldSignupConfirm);
}

function SwitchTab (){
    for (let tab of Array.from(tabs)) {
        tab.addEventListener("change", function() {
            let index = Array.from(tabs).indexOf(tab);
            for (let t of tabs) {
                t.classList.remove("active");
            }
            for (let f of forms) {
                f.classList.remove("active");
            }
            tab.classList.add("active");
            forms[index].classList.add("active");
    
            if (forms[index].classList.contains("active")) {  //зміна висоти врапера
                if (index === 0) {
                    wrapper.style.height = "380px";
                } else if (index === 1) {
                    wrapper.style.height = "530px";
                }
            }
    
        });
    }
}

function ShowHidePassword(imageHide, imageShow, inputField){
    imageHide.addEventListener('click', () =>{
        imageShow.style.display="block";
        imageHide.style.display="none";
        inputField.type="text";
    });

    imageShow.addEventListener('click', () =>{
        imageShow.style.display="none";
        imageHide.style.display="block";
        inputField.type="password";
    });
}


function CheckAllTheFieldsSignup(field) {
  const error = document.getElementById('errorUsername');
  const valid = document.getElementById('validUsername');
  const errorEmail = document.getElementById('errorEmail');
  const validEmail = document.getElementById('validEmail');
  const errorPassword = document.getElementById('errorPassword');
  const validPassword = document.getElementById('validPassword');
  const errorConfirmPassword = document.getElementById('errorConfirmPassword');
  const validConfirmPassword = document.getElementById('validConfirmPassword');

  const signup = document.getElementById('form-signup');
  const signupFormData = new FormData(signup);

  const inputUsernameSignupValue = signupFormData.get('username-signup');
  const inputUsername = document.querySelector('.signup-input-username');
  const inputEmailSignupValue = signupFormData.get('email-signup');
  const inputEmail = document.querySelector('.signup-input-email');
  const emailPattern = /.+@.+\..+/;
  const inputPasswordSignupValue = signupFormData.get('password-signup');
  const inputPassword = document.querySelector('.signup-input-password');
  const inputConfirmPasswordValue = signupFormData.get('password-confirm-signup');
  const inputConfirmPassword = document.querySelector('.signup-input-confirm-password');

  if(field === inputUsername){
    inputUsername.classList.add('error-input-signup');

    if (inputUsernameSignupValue === "") {
      inputUsername.classList.remove("valid-field-signup");
      error.textContent = "Enter username!";
      valid.textContent = "";
      isFormValid = false;
    } else if (inputUsernameSignupValue.length < 3) {
      inputUsername.classList.remove("valid-field-signup");
      error.textContent = "Username must be at least 3 characters!";
      valid.textContent = "";
      isFormValid = false;
    } else if (inputUsernameSignupValue.length > 15) {
      inputUsername.classList.remove("valid-field-signup");
      error.textContent = "Username must be no more 15 characters!";
      valid.textContent = "";
      isFormValid = false;
    } else {
      inputUsername.classList.remove("error-input-signup");
      inputUsername.classList.add("valid-field-signup");
      error.textContent = "";
      valid.textContent = "Good!";
    }
  }
  
  
  if(field === inputEmail){
    inputEmail.classList.add('error-input-signup');

    if (inputEmailSignupValue === "") {
      inputEmail.classList.remove("valid-field-signup");
      errorEmail.textContent = "Enter email!";
      validEmail.textContent = "";
      isFormValid = false;
    } else if (!emailPattern.test(inputEmailSignupValue)) {
      inputEmail.classList.remove("valid-field-signup");
      errorEmail.textContent = "Invalid email!";
      validEmail.textContent = "";
      isFormValid = false;
    } else {
      inputEmail.classList.remove("error-input-signup");
      inputEmail.classList.add("valid-field-signup");
      errorEmail.textContent = "";
      validEmail.textContent = "Good!";
    }
  }

  if(field === inputPassword ){
    inputPassword.classList.add('error-input-signup');

    if(inputPasswordSignupValue === ""){
      inputPassword.classList.remove("valid-field-signup");
      errorPassword.textContent = "Enter password!";
      validPassword.textContent = "";
      isFormValid = false;
    }
    else if(inputPasswordSignupValue.length < 6){
      inputPassword.classList.remove("valid-field-signup");
      errorPassword.textContent = "Password must be at least 6 characters!";
      validPassword.textContent = "";
      isFormValid = false;
    }
    else{
      inputPassword.classList.remove("error-input-signup");
      inputPassword.classList.add("valid-field-signup");
      errorPassword.textContent = "";
      validPassword.textContent = "Good!";
    }
  }

  if(field === inputConfirmPassword){
    inputConfirmPassword.classList.add('error-input-signup');

    if(inputConfirmPasswordValue === ""){
      inputConfirmPassword.classList.remove("valid-field-signup");
      errorConfirmPassword.textContent = "Enter password!";
      validConfirmPassword.textContent = "";
      isFormValid = false;
    }
    else if(inputConfirmPasswordValue !== inputPasswordSignupValue){
      inputConfirmPassword.classList.remove("valid-field-signup");
      errorConfirmPassword.textContent = "Passwords must match!";
      validConfirmPassword.textContent = "";
      isFormValid = false;
    }
    else{
      inputConfirmPassword.classList.remove("error-input-signup");
      inputConfirmPassword.classList.add("valid-field-signup");
      errorConfirmPassword.textContent = "";
      validConfirmPassword.textContent = "Good!";
    }
  }

}

function checkAllFieldsForEmpty() {
  isFormValid = false; 
  CheckAllTheFieldsSignup(document.querySelector('.signup-input-username'));
  CheckAllTheFieldsSignup(document.querySelector('.signup-input-email'));
  CheckAllTheFieldsSignup(document.querySelector('.signup-input-password'));
  CheckAllTheFieldsSignup(document.querySelector('.signup-input-confirm-password'));

  if (
    document.querySelector('.signup-input-username').classList.contains('valid-field-signup') &&
    document.querySelector('.signup-input-email').classList.contains('valid-field-signup') &&
    document.querySelector('.signup-input-password').classList.contains('valid-field-signup') &&
    document.querySelector('.signup-input-confirm-password').classList.contains('valid-field-signup')
  ) {
    isFormValid = true;
  }
}

function CheckedSignupFields() {
  const username = document.querySelector('.signup-input-username');
  const email = document.querySelector('.signup-input-email');
  const password = document.querySelector('.signup-input-password');
  const confirmPassword = document.querySelector('.signup-input-confirm-password');

  username.addEventListener('input', () => CheckAllTheFieldsSignup(username));
  email.addEventListener('input', () => CheckAllTheFieldsSignup(email));
  password.addEventListener('input', () => CheckAllTheFieldsSignup(password));
  confirmPassword.addEventListener('input', () => CheckAllTheFieldsSignup(confirmPassword));

  const signup = document.getElementById('form-signup');
  signup.addEventListener('submit', (event) => {
    checkAllFieldsForEmpty();
    if (!isFormValid) {
      event.preventDefault(); 
    }
  });
}

//Promise
function sendDataToServer(data) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve("Data successfully sent to server!");
      }, 1500);
  });
}

document.getElementById("form-signup").addEventListener("submit", function(event) {
  event.preventDefault(); 

  formData = {
    username: document.querySelector(".signup-input-username").value,
    email: document.querySelector(".signup-input-email").value,
    password: document.querySelector(".signup-input-password").value,
    confirmPassword: document.querySelector(".signup-input-confirm-password").value
  };

 if(isFormValid){
    showLoader();
    localStorage.setItem("formData", JSON.stringify(formData));
    
    sendDataToServer(formData)
        .then(response => {
            
            hideLoader();
            SuccessSignUp();
            console.log(response);
            
        })
        .catch(error => {
            
            hideLoader();
            console.error(error); 
            
        });
 }
  
});

function showLoader() {
  const buttonSignup = document.querySelector('.button-signup');
  buttonSignup.textContent="Loading..."
}

function hideLoader() {
  const buttonSignup = document.querySelector('.button-signup');
  buttonSignup.textContent="Signup"
}

function clearSignupForm() {
  document.querySelector('.signup-input-username').value = "";
  document.querySelector('.signup-input-email').value = "";
  document.querySelector('.signup-input-password').value = "";
  document.querySelector('.signup-input-confirm-password').value = "";

  document.getElementById('errorUsername').textContent = "";
  document.getElementById('validUsername').textContent = "";
  document.getElementById('errorEmail').textContent = "";
  document.getElementById('validEmail').textContent = "";
  document.getElementById('errorPassword').textContent = "";
  document.getElementById('validPassword').textContent = "";
  document.getElementById('errorConfirmPassword').textContent = "";
  document.getElementById('validConfirmPassword').textContent = "";

  const fields = document.querySelectorAll('.signup-input-username, .signup-input-email, .signup-input-password, .signup-input-confirm-password');
  fields.forEach(field => {
      field.classList.remove("error-input-signup");
      field.classList.remove("valid-field-signup");
  });
}



function SuccessSignUp() {
  const background = document.querySelector('.overlay');
  const blockSuccessSignup = document.getElementById('blockSuccess');
  background.style.display = "block";
  blockSuccessSignup.style.display = "block";
  const buttonClose = document.getElementById('closeWindowSuccess');
  buttonClose.addEventListener('click', () => {
      background.style.display = "none";
      blockSuccessSignup.style.display = "none";
      clearSignupForm();
  });
}


function CheckDataForLoginFromLocalStorage(){
  document.getElementById("form-login").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.querySelector(".login-input-username").value;
    const password = document.querySelector(".login-input-password").value;

    const userData = JSON.parse(localStorage.getItem("formData"));

    if (userData && userData.username === username && userData.password === password) {
       
      window.location.href = "index.html"; 
    } else {
      FailLogin();
    }
  });

}

function FailLogin(){
  const background = document.querySelector('.overlay');
  const blockFailLogin = document.getElementById('blockFailed');
  background.style.display = "block";
  blockFailLogin.style.display = "block";
  const buttonClose = document.getElementById('closeWindowFail');
  buttonClose.addEventListener('click', () => {
      background.style.display = "none";
      blockFailLogin.style.display = "none";
  });
}
