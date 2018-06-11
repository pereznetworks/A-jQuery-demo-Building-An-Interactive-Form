

// function to perform validation on required form fields
const formValidation = function(signUpRegistration){

  const errMsg = {};
  // flag that gets returned as FALSE if any fields not valid
  let formValid = true;

  // check for valid name input
   // regExp for checking proper noun input
   // const nameFilter = /[A-Z][A-Za-z' -]+/;
    // probably will not need to check format of name input, i.e. Pronoun-like format,
     //but just in case, keeping this regExp
      // for now, just checking that something was typed in this field

  if (!signUpRegistration.name) {
    // show appropriate msg
    errMsg.nameErr = true;
    formValid = false;
  }

  // regExp for checking email input
    // taken from MDN articler on form validation
      // - modified to return a match ONLY IF all three parts of email address are present
        // an alias (to left of @, the @ itself, any kind of domain name, and something following a '.'  )
          // however, not actually checking for real top-level domain like .com., org, .edu, .gov, etc...
  const emailFilter = /^[[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)]*$/;

  // check for email input then for valid email input

  if (!signUpRegistration.mail) {
    // show appropriate msg
    errMsg.emailBlankErr = true;
    formValid = false;

  } else if (!signUpRegistration.mail.match(emailFilter)){
    // show appropriate msg
    errMsg.emailFormatInvalid = true;
    formValid = false;
  }


  // check for valid shirt selection
  if (!signUpRegistration.shirtDesign) {
    // show appropriate msg
    errMsg.noShirtSelectionErr = true;
    formValid = false;
  }

  // check for selection of activities
  if (!signUpRegistration.activities){
    errMsg.activitesErr = true;
    formValid = false;
  }


  // regExp filters for checking cc payment input
  const atLeast13numbersFilter = /[0-9]{13}/;
  const atLeast16numbersFilter = /[0-9]{16}/;
  const zipCodeFilter = /[0-9]{5}/;
  const cvvFilter = /[0-9]{3}/;

  // checking for valid payment type selection
  if (signUpRegistration.paymentInfo.type === 'select_method'){
    errMsg.noPaymentTypeErr = true;
  }

  // if credit card payment type = credit card, then check for valid cc payment info
  if (document.getElementById('credit-card') !== null){

    // check for valid cc number
    if ( parseInt(signUpRegistration.paymentInfo.ccNum).toString() === 'NaN'){
      errMsg.ccNumErr = true;
    } else if (parseInt(parseInt(signUpRegistration.paymentInfo.ccNum).toString().length < 13 || signUpRegistration.paymentInfo.ccNum).toString().length > 16){
      errMsg.ccNumErr = true;
      formValid = false;
    }

    // check for valid zipcode
    if ( parseInt(signUpRegistration.paymentInfo.zipCode).toString() === 'NaN'){
     errMsg.zipCodeErr = true;
    } else if ( parseInt(signUpRegistration.paymentInfo.zipCode).toString().length != 5 ){
      errMsg.zipCodeErr = true;
      formValid = false;
    }

    // check for valid CVV code
    if ( parseInt(signUpRegistration.paymentInfo.cvv).toString() === 'NaN'){
     errMsg.cvvErr = true;
    } else if ( parseInt(signUpRegistration.paymentInfo.cvv).toString().length != 3){
      errMsg.cvvErr = true;
      formValid = false;
    }

  } // end if payment type = credit card
  displayFormErrMsg(errMsg);
  return formValid;

  // else if (signUpRegistration.paymentInfo.ccNum.match(signUpRegistration.paymentInfo.ccNum).length !== 1 || signUpRegistration.paymentInfo.ccNum.match(atLeast16numbersFilter).length !== 1 ) {
  //   console.log("please fill out a valid credit card number");
  //   formValid = false;
  // }

}; //end form validation function
