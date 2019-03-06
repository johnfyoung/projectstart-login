import Validator from 'validator';
import isEmpty from './is-empty';

const validateInstallInput = (data) => {
    let errors = {};

    data.appName = (!isEmpty(data.appName) ? data.appName : '');
    data.userFullName = (!isEmpty(data.userFullName) ? data.userFullName : '');
    data.userEmail = (!isEmpty(data.userEmail) ? data.userEmail : '');
    data.userPassword = (!isEmpty(data.userPassword) ? data.userPassword : '');
    data.userPassword2 = (!isEmpty(data.userPassword2) ? data.userPassword2 : '');

    if (!Validator.isLength(data.appName, {
        min: 2,
        max: 30
    })) {
        errors.appName = 'App name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.appName)) {
        errors.appName = 'App name field is required';
    }

    if (!Validator.isLength(data.userFullName, {
        min: 2,
        max: 30
    })) {
        errors.userFullName = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.userFullName)) {
        errors.userFullName = 'Name field is required';
    }

    if (!Validator.isEmail(data.userEmail)) {
        errors.userEmail = 'Email is invalid';
    }

    if (Validator.isEmpty(data.userEmail)) {
        errors.userEmail = 'Email field is required';
    }

    if (!Validator.isLength(data.userPassword, {
        min: 6,
        max: 30
    })) {
        errors.userPassword = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.userPassword)) {
        errors.userPassword = 'Password field is required';
    }

    if (!Validator.equals(data.userPassword, data.userPassword2)) {
        errors.userPassword2 = 'Passwords must match';
    }

    if (Validator.isEmpty(data.userPassword2)) {
        errors.userPassword2 = 'Confirm password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateInstallInput;