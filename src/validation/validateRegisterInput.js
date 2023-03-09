import validator from "validator";

const validateRegisterInput = (data) => {
let errors = {};

//object destructuring
const {username,email,password,password2} = data;

// to check for duplicate user 
if(localStorage.users){
    let lsUsers = localStorage.users;
    lsUsers = JSON.parse(lsUsers);
    let index = lsUsers.findIndex((user)=> user.username === username);
    if(index > -1){
        errors.username = "Username already exists";
    }
}

if(validator.isEmpty(username)){
    errors.username = "Username field is required";
}
if(validator.isEmpty(email)){
    errors.email = "Email field is required";
}

if(!validator.isEmail(email)){
    errors.email = "Valid email is required";
}

if(validator.isEmpty(password)){
    errors.password = "Password field is required";
}
if(!validator.equals(password,password2)){
    errors.password2 = "Password should match!";
}
if(validator.isEmpty(password2)){
    errors.password2 = "Confirm password field is required";
}

return{
    // to check input is valid or not
    isInvalid: Object.keys(errors).length > 0,
    errors: errors,
};


};
export default validateRegisterInput;

// npm i validator used for  validation