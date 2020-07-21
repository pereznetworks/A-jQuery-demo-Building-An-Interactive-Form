# TD-Project3  Demonstrating Form Validation and Data Objects - Building An Interactive Form

- This project was originally built as part of TeamTreehouse, Tech Degree, Full Stack JavaScript

- Eventually, it will adapted to be a how-to tutorial

- this is a DEMO project only, the submit action of the form simply resets the form.

## Form Code Features

### html:
- html provided by TeamTreehouse
- An input element, id of 'other-title',
  - placeholder of 'Your Job Role' is added to the index.html.  

### css:
  - css provided by TeamTreehouse
  - I added styles for form validation error message elements

### javaScript:

#### all original code is in expo-signup.js,
  - contains the JavaScript for this project.
  - using code comments separated it into 3 sections:
  - // Constant variables, // Functions // Event Listeners

#### front-end stuff only
  - to a beginner, there seems to be lots of code here
  - however, all this is client-side form input and data validation only

#### signUpRegistration array:

  - As text is entered into input fields and selector choices are made,
    - these are read as object/key values into the signUpRegistration array.

  - The credit-card input fields and expiration date and year data
    - are read into the signUpRegistration.paymentInfo array


#### formValidation object and object methods:

  - Each input field and selector fieldset has it's own formValidation method.

  - The signUpRegistration array values are read by the formValidation object methods.
    - Any errors are tracked to a formValidation object

    - The $('Name').change event,
    - the $('mail').change event
    - and the $('.activities input') click event...
      -each call their respective formValidation object methods for real-time formValidation.

  - All formValidation object methods are called by the $('form').submit event.


#### displayFormErrMsg function:  

  - Is called by the formValidation object methods.
    - formValidation error objects are name after specific errors
      - i.e., emailBlankErr, invalidEmailFormat
      - these are tested for true or false
    - displays appropriate errors under the appropriate input field or selector

  - on Submit, a formValidation.inValidReqFields value is tested if 0,
    - if not 0, the form is not submitted and the errors are displayed.

  - this is a DEMO project only, the submit action of the form simply resets the form.
    - other best-practice stuff that should be part of the actual form code, there is no back-end server that receives submission
    - this is just a demo

# Form Interaction

## When JavaScript is disabled

  - When JavaScript is disabled everything is listed as non-interactive html
    - the entire form, all input fields, t-shirt color drop-down menu choices
    - including the 'other-title' job role input field

## When JavaScript is enabled

### Name input field, gets focus when the page first loads

- form validation:
  - on submit, verifies name input is not blank
  - brown text error msg appears when name input is blank

### Email input field

  - form validation:
    - on submit, email format is verified to contain all three sections
    - alias@somedomain.com, org, edu, etc..
    - a brown text error message appears if email input is blank or is not properly formatted

  - more advanced functionality:  
    - conditional and real-time error messages:

    - on submit and as entering text,

    - an 'opps, please enter your email address' error msg appears when email input is blank

    - an 'oops, invalid format' error msg
      appears when the email input is not properly formatted

    - these error msgs go away when input is finally validated

### Job Role Selection

  - when selecting 'other' job role, an input field with id of 'other-title' appears
  - the 'other-title' input field disappears when another job-role is selected
  - along with other choices, the 'other-title' choice is also displayed when JavaScript is disabled

### T-Shirt selection

- when selecting t-shirt design and color,
  - shows only the t-shirt colors available with that design theme

- the option 'Select Theme' is disabled
  - so it serves only as a label, and is not selectable

- all t-shirt colors are available when JavaScript is disabled

- form validation:
  - on submit, an error appears when
  - no t-shirt size, design theme or color is selected

- advanced functionality:  hidden drop-down menu
  - only when a t-shirt design theme is selected
    - will the t-shirt color drop down menu appear

### Activities

- a total cost, 'Total: $600', of selected activities
  - appears at the bottom of this section.
  - the 'Total' is updated as activities are selected or deselected

- As activities are selected,
  - activities with conflicting schedules are
  - 'disabled', greyed out and not selectable.

- form validation:
  - on submit, an error appears when no activities are selected

### Payment Info

- when the page loads
  - the credit-card payment type is selected
  - and the credit-card input fields and Expiration date drop menu appear,

- as other payment options are chosen, only that payment type is displayed

- form validation:
  - on submit,

  - credit-card number is verified to be between 13 to 16 digits, numbers only

  - zip-code is verified to be 5 digits and numbers only

  - cvv is verified to be 3 digits and numbers only

  - if above input requirements are not met
    - a brown text error appear directly under each field
