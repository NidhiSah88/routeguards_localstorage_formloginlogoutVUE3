import validator from "validator";

const validateLoginInput = (data) => {
let errors = {};

//object destructuring
const {username,password} = data;

if(validator.isEmpty(username)){
    errors.username = "Username field is required";
}

if(validator.isEmpty(password)){
    errors.password = "Password field is required";
}

return{
    // to check input is valid or not
    isInvalid: Object.keys(errors).length > 0,
    errors: errors,
};


};
export default validateLoginInput;

// npm i validator used for  validation