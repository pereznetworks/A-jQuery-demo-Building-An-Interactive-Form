
$(document).ready(function() {

// CONSTANT variables ------------------------------

  // array for tracking input for all signup form fields
  const signUpRegistration = [];
  signUpRegistration.paymentInfo = {};

  // array for selected activities object
  const selectedActivities = [];

  // select input field, #name
  const $nameInput = $('#name');

  // select shirt color options, #color
  const $colorOptions = $('#color');

  let otherJobTitleSelected = false;
  // build other Job Role input field
  const otherJobRoleInput = document.createElement("input");
  otherJobRoleInput.type = "text";
  otherJobRoleInput.id = "other-title";
  otherJobRoleInput.placeholder = "Your Job Role";

  // build shirt color opt groups
  const jsPunsOptGrp = document.createElement('optgroup');
  jsPunsOptGrp.id = 'js_puns';
  const jsShirtOnlyOptGrp = document.createElement('optgroup');
  jsShirtOnlyOptGrp.id = 'heart_js';
  const blankOptGrp = document.createElement('optgroup');
  blankOptGrp.id = "blank";
  const blankOption = document.createElement('option');
  blankOption.value = "notheme";
  blankOption.textContent = "<--- Please select a theme";
  blankOptGrp.append(blankOption);

  // select payment options thru parent of element with id 'payment'
  const paymentFieldset = document.getElementById('payment').parentNode.children;
  const paymentOptions = document.createElement('div');

  // total amt of activities signing up for
  let totalAmt = 0;
  // build a legend element to display total
  const total = document.createElement('legend');
  total.id = "total";

  // building credit card info err msg elements
      const CCerrInfoDiv = document.createElement('div');
      CCerrInfoDiv.setAttribute('id', 'CCerrInfoDiv');
      CCerrInfoDiv.style='width:38em;height:10em;';

      const ccNumErrDiv = document.createElement('div');
      ccNumErrDiv.setAttribute('class', 'col-6 col');
      ccNumErrDiv.style='width:19em;';
      const ccNumPgh = document.createElement('p');
      ccNumPgh.style = 'text-align:right;color:red;margin: 0 .5em .5em .5em;';
      ccNumPgh.setAttribute('id', 'ccNum-ErrMsg');
      ccNumPgh.textContent = '';
      ccNumErrDiv.append(ccNumPgh);

      const zipErrDiv = document.createElement('div');
      zipErrDiv.setAttribute('class', 'col-3 col');
      zipErrDiv.style='width:9em;';
      const zipPgh= document.createElement('p');
      zipPgh.style = 'text-align:right;color:red;margin: 0 .5em .5em .5em;';
      zipPgh.setAttribute('id', 'zipCode-ErrMsg');
      zipPgh.textContent = '';
      zipErrDiv.append(zipPgh);

      const cvvErrDiv = document.createElement('div');
      cvvErrDiv.setAttribute('class', 'col-3 col');
      cvvErrDiv.style='width:6em;';
      const cvvPgh= document.createElement('p');
      cvvPgh.style = 'text-align:right;color:red;margin: 0 .5em .5em .5em;';
      cvvPgh.setAttribute('id', 'cvv-ErrMsg');
      cvvPgh.textContent = '';
      cvvErrDiv.append(cvvPgh);

   //credit card, err msg div/pgh eleements are added to main Credit Card err msg div
      CCerrInfoDiv.append(ccNumErrDiv);
      CCerrInfoDiv.append(zipErrDiv);
      CCerrInfoDiv.append(cvvErrDiv);

// FUNCTIONS declarations-----------------------------------

  // function to put focus on the first form field, name, input field
  const focusOnFirstField = function($node) {
    $node.focus();
  }; // end focusOnFirstField function

  // function to move shirt color options under 2 const html node opt groups
  const getOptElements = function(){
    $('#color').children().each(function(i){
        if ($(this)[0].textContent.includes('JS Puns')) {
          let optionValue = $(this)[0].value;
          $(this)[0].class = 'js_puns';
          $(this)[0].textContent = optionValue;
          jsPunsOptGrp.append($(this)[0]);
        }
        if ($(this)[0].textContent.includes('JS shirt only')){
          let optionValue = $(this)[0].value;
          $(this)[0].class = 'js_shirt_only';
          $(this)[0].textContent = optionValue;
          jsShirtOnlyOptGrp.append($(this)[0]);
        }
      }); // end $()each

  }; // end getOptElements function

  // function to add shirt color optGroups to #color <select> element
  // if matching shirt theme is selected
  // triggered by change on design <select> element
  const displayColorOptGroups = function($node, shirtThemeOption){

    // getting shirt theme that was selected
    let optFlag = "";
    if (shirtThemeOption){
      optFlag = shirtThemeOption;
    }

    // before displaying colors that match selected design theme
      // making sure shirt current displayed color options are stored in matching optgroups
    if ( $('#color option')[0].value === 'notheme' ){
      $('#color').children().each(function(){
        blankOptGrp.append($(this)[0]);
      });
    } else if ( $('#color option')[0].class === 'js_puns' ){
      $('#color').children().each(function(){
        jsPunsOptGrp.append($(this)[0]);
      });
    } else if ( $('#color option')[0].class === 'js_shirt_only' ){
      $('#color').children().each(function(){
        jsShirtOnlyOptGrp.append($(this)[0]);
      });
    }

    // read shirt color options from matching optgroup
      // display color options as child element of #color element
    if (optFlag === 'js puns'){
          $node.append(jsPunsOptGrp.children);
    } else if (optFlag === 'heart js'){
          $node.append(jsShirtOnlyOptGrp.children);
    } else if (optFlag === 'notheme'){
          $node.append(blankOptGrp.children);
    }

  }; // end addColorOptGroups function

  // simple function to display total cost of activites
  const displayTotal = function(totalAmt){
    total.textContent = `Total: $${totalAmt}`;
    $('.activities').append(total);
  } // end displayTotal() function

  const displayPaymentOptions = function($optionValue){
    $('#payment option:selected').each(function(){
      if ($optionValue === 'credit card') {
        $('#payment').parent()[0].append(paymentOptions.children.namedItem('credit-card'));
      } else if ($optionValue === 'paypal') {
        $('#payment').parent()[0].append(paymentOptions.children.namedItem('paypal'));
      } else if ($optionValue === 'bitcoin') {
        $('#payment').parent()[0].append(paymentOptions.children.namedItem('bitcoin'));
      } // end if
    }); // end #payment options
  }

  // function to move each payment options elements into separate const html nodes
  const getPayOptions = function(){

    $('#payment').children().each(function(){
      paymentOptions.append(paymentFieldset[5]);
      paymentOptions.children[0].setAttribute('id', 'bitcoin')
      paymentOptions.append(paymentFieldset[4]);
      paymentOptions.children[1].setAttribute('id', 'paypal')
      paymentOptions.append(paymentFieldset[3]);
    });

    //$('#payment').parent().children().append( paymentOptions.children.namedItem('credit-card') );
    $('#payment').parent().children()[2].value = "credit card";
    displayPaymentOptions("credit card");
    signUpRegistration.paymentInfo.type = "credit card";

    // only get CC payment info IF payment type = credit card
    if (signUpRegistration.paymentInfo.type === "credit card"){
      getCCPaymentInfo();
     }
  };

  // function to add event listeners to capture payment info
  const getCCPaymentInfo = function(){

    // capture Credit Card number input
      signUpRegistration.paymentInfo.ccNum = document.getElementById('cc-num').value;

    // capture CVV payment input
        signUpRegistration.paymentInfo.cvv = document.getElementById('cvv').value;

    // capture Credit Card payment input
        signUpRegistration.paymentInfo.zip = document.getElementById('zip').value;

    // capture expiration month selected
        signUpRegistration.paymentInfo.expMonth = document.getElementById('exp-month').value;

    // capture expiration year selected
        signUpRegistration.paymentInfo.expYear = document.getElementById('exp-year').value;

  }; // end getCCPaymentInfo function

  const buildErrMsgElement = function(errMsgText){
    const errMsgElement = document.createElement('p');
    errMsgElement.style = 'color:red;padding-bottom:.8em;'
    errMsgElement.setAttribute('id', 'test');
    errMsgElement.textContent = errMsgText;
    return errMsgElement;
  };

  const displayFormErrMsg = function(errMsg){

    // select fieldset for name, email and job role fields
    const basicInfoFieldSet = document.getElementById('name').parentNode;

    // add err msg for Name field
    if (errMsg.nameErr) {
      const nameInputField = document.getElementById('name');
      const emailLabel = basicInfoFieldSet.children[3];
      const nameBlankMsg = 'Please, fill in your name';
      nameInputField.style = 'margin-bottom:0;';
      basicInfoFieldSet.insertBefore(buildErrMsgElement(nameBlankMsg), emailLabel);
    } else {
      // remove err msg for Name field
      nameInputErrMsgElement = basicInfoFieldSet.children[3];
      nameInputErrMsgElement.remove('*');
      nameInputField.style = 'padding-bottom:.8em;';
    }

      // add err msg for Email field blank
    if (errMsg.emailBlankErr) {
      const emailInputField = document.getElementById('mail');
      const titleLabel = document.getElementById('title').previousElementSibling;
      emailInputField.style = 'margin-bottom:0;';
      const emailBlankMsg = 'Please, fill in your email address';
      basicInfoFieldSet.insertBefore(buildErrMsgElement(emailBlankMsg), titleLabel);
    } else if (errMsg.emailFormatInvalid) {
      // add err msg for Email input invalid
      const emailInputField = document.getElementById('mail');
      const titleLabel = document.getElementById('title').previousElementSibling;
      emailInputField.style = 'margin-bottom:0;';
      const emailInvalidMsg = 'Oops, we need a valid email address to verify your registration';
      basicInfoFieldSet.insertBefore(buildErrMsgElement(emailInvalidMsg), titleLabel);
    } else {
      // remove err msg for Email field
      const emailBlankMsgElement = basicInfoFieldSet.children[5];
      emailBlankMsgElement.remove('*');
      emailInputField.style = 'padding-bottom:.8em;';
    }

    // select activites FieldSet
    const shirtFieldSet = document.getElementsByClassName('shirt')[0];

    // add err msg for Activities
    if (errMsg.noShirtSelectionErr){
      const noShirtSelectionErrMsg = "Don't forget to choose a shirt size, design and color";
      noShirtErrMsgElmnt = buildErrMsgElement(noShirtSelectionErrMsg);
      noShirtErrMsgElmnt.setAttribute('id', 'noShirtErrMsg');
      noShirtErrMsgElmnt.style = 'color:red;padding-bottom:.8em;float:left;display:block;width:100%';
      shirtFieldSet.append(noShirtErrMsgElmnt);
    } else if ( document.getElementById('noShirtErrMsg') !== null ) {
      // remove err msg for Activities
      document.getElementById('noShirtErrMsg').remove('*');
    }

    // select activites Fieldset
    const activitesFieldSet = document.getElementsByClassName('activities')[0];

    // add err msg for Activities
    if (errMsg.activitesErr){
      const activitesErrMsg = 'Please choose from the activiies';
      const noActErrMsgElmnt = buildErrMsgElement(activitesErrMsg);
      noActErrMsgElmnt.setAttribute('id', 'noActErrMsgElmnt');
      activitesFieldSet.append(noActErrMsgElmnt);
    } else if ( document.getElementById('noActErrMsgElmnt') !== null){
      // remove err msg for Activities
      document.getElementById('noAct-ErrMsgElmnt').remove('*');
    }

    // select Payment Info fieldset
    paymentInfoFieldset = document.getElementById('payment').parentNode.children;
     // add err msg for no payment selected
    if (errMsg.noPaymentTypeErr) {
      const paymntTypeErrMsgText = 'Please select a payment type';
      const paymentTypeErrMsgElement = buildErrMsgElement(paymntTypeErrMsgText);
      paymentTypeErrMsgElement.setAttribute('id', 'paymentType-ErrMsg')
      paymentFieldset.append();
    } else if (document.getElementById('paymentType-ErrMsg') !== null ){
      // remove err msg
      document.getElementById('paymentType-ErrMsg').remove('*');
    } // end display form err msgs

    // select activites Fieldset
    const creditCardFieldSet = document.getElementsByClassName('credit-card')[0];

    // CCerrInfoDiv created above, has a set width and hieght
    // contains 3 child div elements, for each field of credit card info
    // child div contains a paragragh element with set width

    if (errMsg.ccNumErr || errMsg.zipCodeErr || errMsg.cvvErr) {
      // if any errors on Credit Card input, add credit card err msg Div to html Page
      creditCardFieldSet.insertBefore(CCerrInfoDiv, document.getElementsByClassName('credit-card')[0].children[3] );
    } else if ( document.getElementById('CCerrInfoDiv') !== null ) {
      $('#CCerrInfoDiv').remove('*');
    // if no credit card input field errors, remove the CCerrInfoDiv
    }

    // now, simply add/remove the textContent to/from err msg pgh elements as needed

    if (errMsg.ccNumErr){
      $('#ccNum-ErrMsg')[0].textContent = 'invalid credit-card num';
      // err msg for credit-card num input field
    } else {
      $('#ccNum-ErrMsg').textContent = '';
    }

    if (errMsg.zipCodeErr){
      $('#zipCode-ErrMsg')[0].textContent = 'invalid zip code';
      // err msg for zipCode input field
    } else {
      $('#zipCode-ErrMsg').textContent = '';
    }

    if (errMsg.cvvErr){
      $('#cvv-ErrMsg')[0].textContent = 'invalid cvv';
      // err msg for cvv input field
    } else {
      $('#cvv-ErrMsg').textContent = '';
    }

  } // end displayFormErrMsg function

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
      console.log("you forgot to fill in your name");
      formValid = false;

    } else {
      console.log('name input valid');
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
      console.log("you forgot to fill in your email address");
      formValid = false;

    } else if (!signUpRegistration.mail.match(emailFilter)){
      // show appropriate msg
      errMsg.emailFormatInvalid = true;
      console.log("we need a valid email address to verify your registration");
      formValid = false;

    } else {
      console.log('email input valid');
    }


    // check for valid shirt selection
    if (!signUpRegistration.shirtDesign) {
      // show appropriate msg
      errMsg.noShirtSelectionErr = true;
      console.log("don't forget to select your shirt design, size and color");
      formValid = false;
    } else {
      console.log('shirt selection valid');
    }

    // check for selection of activities
    if (!signUpRegistration.activities){
      errMsg.activitesErr = true;
      console.log('no activities selected');
      formValid = false;
    } else {
      console.log('activities input valid');
    }


    // regExp filters for checking cc payment input
    const atLeast13numbersFilter = /[0-9]{13}/;
    const atLeast16numbersFilter = /[0-9]{16}/;
    const zipCodeFilter = /[0-9]{5}/;
    const cvvFilter = /[0-9]{3}/;

    // checking for valid payment type selection
    if (signUpRegistration.paymentInfo.type === 'select_method'){
      errMsg.noPaymentTypeErr = true;
      console.log('please select a payment type')
    } else {
      console.log('payment type valid');
    }

    // if credit card payment type = credit card, then check for valid cc payment info
    if (document.getElementById('credit-card') !== null){

      // check for valid cc number
      if ( parseInt(signUpRegistration.paymentInfo.ccNum).toString() === 'NaN'){
        errMsg.ccNumErr = true;
        console.log('credit card number must be numbers only, at least 13 or at least 16 digits');
      } else if (parseInt(parseInt(signUpRegistration.paymentInfo.ccNum).toString().length < 13 || signUpRegistration.paymentInfo.ccNum).toString().length < 16){
        errMsg.ccNumErr = true;
        console.log("please fill out a valid credit card number")
        formValid = false;
      } else {
        console.log('Credit Card num input valid');
      }

      // check for valid zipcode
      if ( parseInt(signUpRegistration.paymentInfo.zipCode).toString() === 'NaN'){
       errMsg.zipCodeErr = true;
       console.log('zip code must be 5 digits, numbers only');
      } else if ( parseInt(signUpRegistration.paymentInfo.zipCode).toString().length != 5 ){
        errMsg.zipCodeErr = true;
        console.log("please fill out the zip code associated with your credit card");
        formValid = false;
      } else {
        console.log('Zipcode input valid');
      }

      // check for valid CVV code
      if ( parseInt(signUpRegistration.paymentInfo.cvv).toString() === 'NaN'){
       errMsg.cvvErr = true;
       console.log('cvv must be 3 digits, numbers only');
      } else if ( parseInt(signUpRegistration.paymentInfo.cvv).toString().length != 3){
        errMsg.cvvErr = true;
        console.log("please fill out the cvv number");
        formValid = false;
      } else {
        console.log('Credit Card CVV info input valid');
      }
    } // end if payment type = credit card
    displayFormErrMsg(errMsg);
    return formValid;

    // else if (signUpRegistration.paymentInfo.ccNum.match(signUpRegistration.paymentInfo.ccNum).length !== 1 || signUpRegistration.paymentInfo.ccNum.match(atLeast16numbersFilter).length !== 1 ) {
    //   console.log("please fill out a valid credit card number");
    //   formValid = false;
    // }

  }; //end form validation function


// EVENT LISTENERS ----------------------------

  // event listener for name field input
    $('#name').change(function(){
      signUpRegistration.name = document.getElementById('name').value;
    });

  // event listener for email field input
    $('#mail').change(function(){
      signUpRegistration.mail = document.getElementById('mail').value;
    });

  // event listener for job title select value change
    // if job title changed to 'other' display other Job Role input field
    $('#title').change(function() {

     if ($(this).val() === 'other') {
          document.getElementById('title').parentNode.append(otherJobRoleInput);
          otherJobTitleSelected = true;
        // event listener for other-title field input
          // captures as text input to field changes
          $('#other-title').change(function(){
          signUpRegistration.title = document.getElementById('other-title').value;
        });
      } else if (otherJobTitleSelected) {
             $('#other-title').remove('*');
             otherJobTitleSelected = false;
      } else {
        signUpRegistration.title = document.getElementById('title').value;
      }
    });  // end job title addEventListener

  // event listener for change in shirt design value
    // displaying only shirt colors that go with Shirt design theme
    $('#design').change(function() {
      $('#design option:selected').each(function(){
        if ($(this).val() === 'heart js') {
          displayColorOptGroups( $colorOptions, $(this).val() );
        } else if ($(this).val() === 'js puns') {
          displayColorOptGroups( $colorOptions, $(this).val() );
        } else {
          displayColorOptGroups( $colorOptions, 'notheme' );
        }  // end if ('js puns')
      }); // end #design options
    }) // end shirt design addEventListener

  // event listener for shirt color value
    // capture shirt size, design and color
    $('#color').change(function(){
      signUpRegistration.shirtSize = document.getElementById('size').value;
      signUpRegistration.shirtDesign = document.getElementById('design').value;
      signUpRegistration.shirtColor = document.getElementById('color').value;
    });

  // forEach activity label function
    // set up eventlistener for each activity input
      // when an activity input is selected, capture, filter out activity details
    document.querySelectorAll('.activities input').forEach(function(item, index){

      // used to track selected activiies,
        // scoped to activities label input function
      const selection = {};

      item.addEventListener('click', function(e){
        // each activity label/input gets it's own event listener

          // for matching and parsing dollar amt from activity description string
          let amtString = '';
          let dollarAmt = 0;

          // for matching and parsing time of day and day of week
          let timeOfDayString = '';
          const timeOfDayFilter = /\d\w*-\w*/;
          let dayString = '';
          const dayofWeekFilter = /\w*day\b/;

          // const var used to test if duplicate selected , (means already selected once, so deselected)
          let duplicate = false;
          let dupItemIndex = 0;

          // get dollarAmt of activity from activity description
                // match part of string starting with '$' followed by numbers
          const dollarAmtFilter = /\$\d+/;
          let dollarAmtString = e.target.parentNode.textContent.match(dollarAmtFilter);
          // assign to selection array, key value of cost
            if (dollarAmtString) {
              amtString = dollarAmtString[0].slice(1);
              dollarAmt = parseInt(amtString);
              selection.cost = dollarAmt;
            }

          selectedActivities.forEach(function(item, index){
            if (e.target.parentNode.textContent === item.activity) { // if duplicate, then..
              duplicate = true;       // set duplicate bolean to true
              dupItemIndex = index;   // save index of duplicate item
            }
          });

          if (duplicate){ // if item being de-selected
            // re-enable activity that was de-selected
            $('.activities label').each(function(index, item){
                if (index !== 0 && selection.day === this.textContent.match(dayofWeekFilter)[0] ){
                  if (selection.time === this.textContent.match(timeOfDayFilter)[0] ){
                    $('.activities label')[index].removeAttribute('style', 'color:grey;background-color:silver;');
                    $('.activities input')[index].disabled = false;
                  }
                }
            });
              // subtract cost of activity from total
                totalAmt -= dollarAmt;
              // display updated total
                displayTotal(totalAmt);

                selectedActivities.splice(dupItemIndex, 1);

            } else {  // else item is being selected

              // get day of week for activity selected
              // match part of string ending in day and a word boundary
                // assing to array selection, key value of day
                dayString = e.target.parentNode.textContent.match(dayofWeekFilter);
              if (dayString){
                selection.day = dayString[0];
              }

              // get time period for activity selected
                // match part of string that begins with a number 0-9, all alphanumerical a dash then alphanumerical up to word boundary
                  // assing to array selection, key value of time
                timeOfDayString = e.target.parentNode.textContent.match(timeOfDayFilter);
              if (timeOfDayString) {
                selection.time = timeOfDayString[0];
              }

              // add activity description to selection array
                selection.activity = e.target.parentNode.textContent;

              // add activity to array
                selectedActivities.push(selection);

              // add cost of activity to total
                totalAmt += dollarAmt;
              // display updated total
                displayTotal(totalAmt);

              // disable activites that conflict with current selected activity
              // make sure to enable any that no longer conflict
              $('.activities label').each(function(index, item){
                if (index !== 0 && selection.activity !== this.textContent ) {
                  if (selection.day === this.textContent.match(dayofWeekFilter)[0] ){
                    if (selection.time === this.textContent.match(timeOfDayFilter)[0] ){
                      $('.activities label')[index].setAttribute('style', 'color:grey;background-color:silver;');
                      $('.activities input')[index].disabled = true;
                    } // end if matches timeOfDayFilter
                  } // end if matched dayofWeekFilter
                } // end if selecting actvity with day and time schedule
              }); // end activities label each loop

            } // end if/else : handling deseleciton or selection of activiies

          // read actvities selection to signUpRegistration object
          signUpRegistration.totalCost = totalAmt;
          signUpRegistration.activities = selectedActivities;

      }); // end activities input eventlistener


    }); // end activiies label for each function

  // event listener for change in shirt design value
    // displaying only shirt colors that go with Shirt design theme
    $('#payment').change(function() {

    // move current payment methods back to paymentOptions html collection node
      paymentOptions.append( $('#payment').parent().children()[3] );

    // display selected payment options
      displayPaymentOptions( $(this).val() );

    // capture payment choice
      signUpRegistration.paymentInfo.type = $(this).val();

    // only get CC payment info IF payment type = credit card
    if (signUpRegistration.paymentInfo.type === "credit card"){
      getCCPaymentInfo();
     }

  }); // end #payment addEventListener

// Function calls
  // move payment options to paymentOptions html node
    getPayOptions();

  // move Shirt Color Option Elements to shirt color optgroups
    getOptElements();

  // display ONLY the blank option opt Group
    $colorOptions.append(blankOptGrp.children);

  // set focus on first element field
    focusOnFirstField($nameInput);

// FORM SUBMIT
// triggers anonymous form submit action
   document.getElementsByTagName('form')[0].addEventListener('click', function(e){

     e.preventDefault();

     // only sumbit if formValidation funciton returns TRUE
     let allInputValid = formValidation(signUpRegistration);

   });



});
