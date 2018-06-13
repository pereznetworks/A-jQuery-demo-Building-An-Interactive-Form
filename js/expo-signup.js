
$(document).ready(function() {

// CONSTANT variables ------------------------------

  // copy static #other-title job role input field
  const otherJobRoleInput = $('#other-title')[0];
  // remove static #other-title job role input
  $('#other-title').remove('*');

  // disable html's built in form Validation
  $('form').attr('novalidate', "novalidate");

  // disable 'select theme' option (for shirts), so serves only as a label
  $('#design').children()[0].disabled = true;
  // disable option 'select-payment', so it also serves only as a label
  $('#payment').children()[0].disabled = true;

  // array for tracking input for all form input fields and selected options
  const signUpRegistration = [];
  signUpRegistration.paymentInfo = {};

  // array for selected activities object
  const selectedActivities = [];

  // select input field, #name
  const $nameInput = $('#name');

  // select shirt color options, #color
  const $colorOptions = $('#color');

  let otherJobTitleSelected = false;

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

      const ccNumErrDiv = document.createElement('div');
      ccNumErrDiv.setAttribute('class', 'col-6 col');
      ccNumErrDiv.setAttribute('id', 'ccNumErrDiv');

      const ccNumPgh = document.createElement('p');
      ccNumPgh.setAttribute('id', 'ccNum-ErrMsg');
      ccNumPgh.textContent = '';
      ccNumErrDiv.append(ccNumPgh);

      const zipErrDiv = document.createElement('div');
      zipErrDiv.setAttribute('class', 'col-3 col');
      zipErrDiv.setAttribute('id', 'zipErrDiv');

      const zipPgh= document.createElement('p');
      zipPgh.setAttribute('id', 'zipCode-ErrMsg');
      zipPgh.textContent = '';
      zipErrDiv.append(zipPgh);

      const cvvErrDiv = document.createElement('div');
      cvvErrDiv.setAttribute('class', 'col-3 col');
      cvvErrDiv.setAttribute('id', 'cvvErrDiv');

      const cvvPgh= document.createElement('p');
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

      // hide shirt color label and drop-down menu
      $('#color').hide();
      document.getElementById('color').previousElementSibling.style='display:none;';

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

  const buildErrMsgElement = function(errMsgText, idName){
    const errMsgElement = document.createElement('p');
    errMsgElement.setAttribute('id', idName);
    errMsgElement.textContent = errMsgText;
    return errMsgElement;
  };

  const displayFormErrMsg = function(errMsg){

    // select fieldset for Basic Info section of form, parent of name input,
        const basicInfoFieldSet = document.getElementById('name').parentNode;

    // build error message for name input field
        const nameBlankMsg = 'Please, fill in your name';
        const nameBlankErrElmnt = buildErrMsgElement(nameBlankMsg, 'nameBlankErrElmnt');

    // build error message for email input field
        const emailBlankMsg = 'Please, fill in your email address';
        const emailBlankMsgElmnt = buildErrMsgElement(emailBlankMsg, 'emailBlankMsgElmnt');

        const emailInvalidMsg = 'Oops, we need a valid email address to verify your registration';
        const emailInvalidMsgElmnt = buildErrMsgElement(emailInvalidMsg, 'emailInvalidMsgElmnt');

    // select and build error message for t-shirt FieldSet
        const shirtFieldSet = document.getElementsByClassName('shirt')[0];

        const noShirtSelectionErrMsg = "Don't forget to choose a shirt size, design and color";
        noShirtErrMsgElmnt = buildErrMsgElement(noShirtSelectionErrMsg, 'noShirtErrMsg');

    // select and build eror message for activites Fieldset
        const activitesFieldSet = document.getElementsByClassName('activities')[0];

        const activitesErrMsg = 'Please choose from the activiies';
        const noActErrMsgElmnt = buildErrMsgElement(activitesErrMsg, 'noActErrMsgElmnt');

    // add err msg for Name field
    if (errMsg.nameErr && document.getElementById('nameBlankErrElmnt') === null) {
      const emailLabel = basicInfoFieldSet.children[3];
      document.getElementById('name').style = 'margin-bottom:0;';
      basicInfoFieldSet.insertBefore(nameBlankErrElmnt, emailLabel);
    } else if(!errMsg.nameErr && document.getElementById('nameBlankErrElmnt') !== null) {
      // remove err msg for Name field
      $('#nameBlankErrElmnt').remove('*');
      document.getElementById('name').style = 'padding-bottom:.8em;';
    }

      // add err msg for Email field blank
    if (errMsg.emailBlankErr && document.getElementById('emailBlankMsgElmnt') === null) {
      document.getElementById('mail').style = 'margin-bottom:0;';
      const titleLabel = document.getElementById('title').previousElementSibling;
      basicInfoFieldSet.insertBefore(emailBlankMsgElmnt, titleLabel);
    } else if (!errMsg.emailBlankErr && document.getElementById('emailBlankMsgElmnt') !== null){
      // remove err msg for blank Email field
      $('#emailBlankMsgElmnt').remove('*');
      document.getElementById('mail').style = 'padding-bottom:.8em;';
    }

    if (errMsg.emailFormatInvalid && document.getElementById('emailInvalidMsgElmnt') === null ) {
      // add err msg for Email input invalid
      document.getElementById('mail').style = 'margin-bottom:0;';
      const titleLabel = document.getElementById('title').previousElementSibling;
      basicInfoFieldSet.insertBefore(emailInvalidMsgElmnt, titleLabel);
    } else if (!errMsg.emailFormatInvalid && document.getElementById('emailInvalidMsgElmnt') !== null ){
      // remove err msg for invalid Email field
      $('#emailInvalidMsgElmnt').remove('*');
      document.getElementById('mail').style = 'padding-bottom:.8em;';
    }

    // add err msg for no T-Shirt selection
    if (errMsg.noShirtSelectionErr && document.getElementById('noShirtErrMsg') === null ){

      shirtFieldSet.append(noShirtErrMsgElmnt);
    } else if ( !errMsg.noShirtSelectionErr && document.getElementById('noShirtErrMsg') !== null ) {
      // remove err msg for Activities
      document.getElementById('noShirtErrMsg').remove('*');
    }

    // add err msg for no Activities selection
    if (errMsg.activitesErr && document.getElementById('noActErrMsgElmnt') === null){

      activitesFieldSet.append(noActErrMsgElmnt);
    } else if ( !errMsg.activitesErr && document.getElementById('noActErrMsgElmnt') !== null){
      // remove err msg for Activities
      document.getElementById('noActErrMsgElmnt').remove('*');
    }

    // if the credit-card payment div is displayed on the page....
    if (document.getElementsByClassName('credit-card')[0] !== null ){

      const creditCardDiv = document.getElementsByClassName('credit-card')[0];
      // CCerrInfoDiv created above, has a set width and hieght
      // contains 3 child div elements, for each field of credit card info
      // child div contains a paragragh element with set width

      if (errMsg.ccNumErr || errMsg.zipCodeErr || errMsg.cvvErr && document.getElementById('CCerrInfoDiv') === null) {
        // if any errors on Credit Card input, add credit card err msg Div to html Page
        creditCardDiv.insertBefore(CCerrInfoDiv, creditCardDiv.children[3] );
      } else if ( document.getElementById('CCerrInfoDiv') !== null ) {
        $('#CCerrInfoDiv').remove('*');
      // if no credit card input field errors, remove the CCerrInfoDiv
      }

      // now, simply add/remove the textContent to/from err msg pgh elements as needed

      if (errMsg.ccNumErr){
        $('#ccNum-ErrMsg')[0].textContent = 'invalid credit-card num';
        // err msg for credit-card num input field
      } else if ( document.getElementById('ccNum-ErrMsg') !== null ){
        document.getElementById('ccNum-ErrMsg').textContent = '';
      }

      if (errMsg.zipCodeErr){
        $('#zipCode-ErrMsg')[0].textContent = 'invalid zip code';
        // err msg for zipCode input field
      } else if ( document.getElementById('zipCode-ErrMsg') !== null ){
        document.getElementById('zipCode-ErrMsg').textContent = '';
      }

      if (errMsg.cvvErr){
        $('#cvv-ErrMsg')[0].textContent = 'invalid cvv';
        // err msg for cvv input field
      } else if ( document.getElementById('cvv-ErrMsg') !== null ){
        document.getElementById('cvv-ErrMsg').textContent = '';
      }

    };



  } // end displayFormErrMsg function

  // form validation object, flags and functions
  const formValidation = {

    errMsg:{}, //object to compile flagged input/field errs
    inValidReqFields:0,   // flag set to FALSE if any fields not valid
    verifyName:function(signUpRegistration){

        // check for valid name input
         // regExp for checking proper noun input
          // probably will not need to check format of name input, i.e. Pronoun-like format,
           // but just in case, keeping this regExp
            // const nameFilter = /[A-Z][A-Za-z' -]+/;
             // for now, just checking that something was typed in this field
      if (!signUpRegistration.name) {
        // if name field blank, set nameErr to true
        this.errMsg.nameErr = true;
      } else {
        // else nameErr is false
        this.errMsg.nameErr = false;
      }
      // if there is invalid input, display err msgs
      // or remove err msgs if needed
      this.inValidInputDisplayErrMsg();
    }, // end verifyName
    verifyEmail:function(signUpRegistration){

      // regExp for checking email input
        // taken from MDN articler on form validation
          // - modified to return a match ONLY IF all three parts of email address are present
            // an alias (to left of @, the @ itself, any kind of domain name, and something following a '.'  )
              // however, not actually checking for real top-level domain like .com., org, .edu, .gov, etc...
      const emailFilter = /^[[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)]*$/;

      // check for email input then for valid email input

      if (!signUpRegistration.mail) {
        // if email field is blank, set emailBlankErr to true
        this.errMsg.emailBlankErr = true;
        // clear the other email error flag just in case
        this.errMsg.emailFormatInvalid = false;
      } else {
        // else emailBlankErr is false
        this.errMsg.emailBlankErr = false;

        if (!signUpRegistration.mail.match(emailFilter)){
          // if email input is not valid format, emailFormatInvalid is true
          this.errMsg.emailFormatInvalid = true;
          // clear the other email error flag just in case
          this.errMsg.emailBlankErr = false;
        } else {
          // else emailFormatInvalid is false
          this.errMsg.emailFormatInvalid = false;
        }
      }
      // if there is invalid input, display err msgs
      // or remove err msgs if needed
      this.inValidInputDisplayErrMsg();
    }, // end verifyEmail
    verifyShirtSelection:function(signUpRegistration){

        // check for valid shirt selection
        if (!signUpRegistration.shirtDesign) {
          // if no selection, err is true
          this.errMsg.noShirtSelectionErr = true;
        } else {
          // else if there is selection, err is false
          this.errMsg.noShirtSelectionErr = false;
        }
        // if there is invalid input, display err msgs
        // or remove err msgs if needed
        this.inValidInputDisplayErrMsg();
     },
     verifyActivities:function(signUpRegistration){
        // check for selection of activities
        if (!signUpRegistration.activities || signUpRegistration.totalCost === 0){
          this.errMsg.activitesErr = true;
        } else {
          // if an activity selected, err is false
          this.errMsg.activitesErr = false;
        }
        // if there is invalid input, display err msgs
        // or remove err msgs if needed
        this.inValidInputDisplayErrMsg();
    }, // end verifyActivities
    verifyPaymentInfo:function(signUpRegistration){
        // regExp filters for checking cc payment input
        const atLeast13atmost16Filter = /^[0-9]{13,16}$/;
        const zipCodeFilter = /^[0-9]{5}$/;
        const cvvFilter = /^[0-9]{3}$/;

        // if credit card payment type = credit card, then check for valid cc payment info
        if (document.getElementById('credit-card') !== null){

          getCCPaymentInfo();

          // check for valid cc number

          if ( parseInt(signUpRegistration.paymentInfo.ccNum).toString() === 'NaN'){
            this.errMsg.ccNumErr = true; // if not a Number, err is true
            // parseInt(parseInt(signUpRegistration.paymentInfo.ccNum).toString().length < 13 || signUpRegistration.paymentInfo.ccNum).toString().length > 16
          } else if ( signUpRegistration.paymentInfo.ccNum.match(atLeast13atmost16Filter) === null){
            this.errMsg.ccNumErr = true; // if not correct length, err is true
          } else {
            this.errMsg.ccNumErr = false; // else no err
          }

          // check for valid zipcode
          if ( parseInt(signUpRegistration.paymentInfo.zip).toString() === 'NaN'){
            this.errMsg.zipCodeErr = true; // if not a Number, err is true
            // parseInt(signUpRegistration.paymentInfo.zip).toString().length !== 5
          } else if ( signUpRegistration.paymentInfo.zip.match(zipCodeFilter) === null ){
            this.errMsg.zipCodeErr = true; // if not correct length, err is true
          } else {
            this.errMsg.zipCodeErr = false; // else no err
          }

          // check for valid CVV code
          if ( parseInt(signUpRegistration.paymentInfo.cvv).toString() === 'NaN'){
            this.errMsg.cvvErr = true; // if not a Number, err is true
            // parseInt(signUpRegistration.paymentInfo.cvv).toString().length != 3
          } else if ( signUpRegistration.paymentInfo.cvv.match(cvvFilter) === null ){
            this.errMsg.cvvErr = true; // if not correct length, err is true
          } else {
            this.errMsg.cvvErr = false; // else no err
          }

        } // end if payment type = credit card

        // if there is invalid input, display err msgs
        this.inValidInputDisplayErrMsg();
    }, // end verifyPaymentInfo
    verifyAllRequiredFields:function(signUpRegistration){
      this.verifyName(signUpRegistration);
      this.verifyEmail(signUpRegistration);
      this.verifyActivities(signUpRegistration);
      this.verifyShirtSelection(signUpRegistration);
      this.verifyPaymentInfo(signUpRegistration);
      this.inValidReqFields = 0;
      if (this.errMsg.nameErr) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.emailBlankErr) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.emailFormatInvalid) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.noShirtSelectionErr) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.activitesErr) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.noPaymentTypeErr) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.ccNumErr) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.zipCodeErr) {
        this.inValidReqFields += 1;
      }
      if (this.errMsg.cvvErr) {
        this.inValidReqFields += 1;
      }
    }, // end verifyAllRequiredFields
    inValidInputDisplayErrMsg:function(){
        displayFormErrMsg(this.errMsg);
    } // end inValidInputDisplayErrMsg

  }; //end form validation object


// EVENT LISTENERS ----------------------------

  // event listener for name field input
    $('#name').focusout(function(e){
      signUpRegistration.name = document.getElementById('name').value;
      formValidation.verifyName(signUpRegistration);
    });

  // event listener for email field input
    $('#mail').focusout(function(e){
      signUpRegistration.mail = document.getElementById('mail').value;
      formValidation.verifyEmail(signUpRegistration);
    });

  // event listener for job title select value change
    // if job title changed to 'other' display other Job Role input field
    $('#title').change(function(e){
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
    $('#design').change(function(e){
      $('#design option:selected').each(function(){
        if ($(this).val() === 'heart js') {
          displayColorOptGroups( $colorOptions, $(this).val() );
          document.getElementById('color').previousElementSibling.removeAttribute('style','display:none;');
          $('#color').show();
        } else if ($(this).val() === 'js puns') {
          displayColorOptGroups( $colorOptions, $(this).val() );
          document.getElementById('color').previousElementSibling.removeAttribute('style','display:none;');
          $('#color').show();
        } else {
          displayColorOptGroups( $colorOptions, 'notheme' );
        }  // end if ('js puns')
      }); // end #design options
    }) // end shirt design addEventListener

  // event listener for shirt color value
    // capture shirt size, design and color
    $('#color').focusin(function(e){
      signUpRegistration.shirtSize = document.getElementById('size').value;
      signUpRegistration.shirtDesign = document.getElementById('design').value;
      signUpRegistration.shirtColor = document.getElementById('color').value;
      formValidation.verifyShirtSelection(signUpRegistration);
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

          formValidation.verifyActivities(signUpRegistration);

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
        } else {
          formValidation.errMsg.ccNumErr = false;
          formValidation.errMsg.zipCodeErr = false;
          formValidation.errMsg.cvvErr = false;
        }

      formValidation.verifyPaymentInfo(signUpRegistration);

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
  document.getElementsByTagName('form')[0].addEventListener("submit", function(e){
    formValidation.verifyAllRequiredFields(signUpRegistration);

    if (formValidation.inValidReqFields > 0){
      e.preventDefault();
    }
  }, false);

  // document.getElementsByTagName('button')[0].addEventListener('click', function(e){
  // });
}); // end document ready function
