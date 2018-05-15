export class ValidationService {
  static getValidatorErrorMessage(controlName: string, validatorName: string, validatorValue?: any) {
    let validation_messages = {
      'email':{
        required: 'Please enter email',
        email:'Please enter valid email'
      },
      'username': {
        required: 'Please enter Username',
      },
      'password': {
        required: 'Password is required.',
        minlength: `Password must be at least ${validatorValue.requiredLength} charactors`,
        maxlength:`Password maximum of ${validatorValue.requiredLength} character`
      },
      passwordConfirm:{
        required: 'Please enter confirm password.',
        MatchFields:"Password doesn't match",
      },
      'phone':{
        required: 'Please enter phone number.',
      },
      'client_name':{
        required: 'Please enter client name',
      },
      'client_website':{
        required: 'Please enter website',
      },
      'client_address_street':{
        required: 'Please enter address',
      },
      'client_address_city':{
        required: 'Please enter city',
      },
      'client_address_state':{
        required: 'Please enter state',
      },
      'client_address_country':{
        required: 'Please enter country',
      },

    }
    return validation_messages[controlName][validatorName];
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}
