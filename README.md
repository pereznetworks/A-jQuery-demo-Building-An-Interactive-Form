# TD-Project3  Build Interactive Form

# PROJECT 3 Summary

      requirements:
                all requirements completed and documented below by form section.

      exceeds :
                all 3 exceeds features completed and documented below by form section.
                the email input field gets conditional error messages.
                the email input field also gets real-time error msgs

      html:
                An input element, id of 'other-title',
                    placeholder of 'Your Job Role' is added to the index.html.  

      css:          
                I added styles for form validation error message elements

      javaScript:
                the file, exp-signup.js, contains all my JavaScript for this project.
                using code comments I separated it into 3 sections:
                  // Constant variables, // Functions // Event Listeners

                the code should be commented fairly well
                I'll go over the client-side signUpRegistration array and formValidation objects
                as well as meets and exceeds expectations requirements below

# client-side form data and validation  

    signUpRegistration array:

        As text is entered into input fields and selector choices are made,
           these are read as object/key values into the signUpRegistration array.

        The credit-card input fields and expiration date and year data
           are read into the signUpRegistration.paymentInfo array

    formValidation object and object methods:

        Each input field and selector fieldset has it's own formValidation method.

        The signUpRegistration array values are read by the formValidation object methods.
          Any errors are tracked to a formValidation object

        The $('Name').change event,
        the $('mail').change event
        and the $('.activities input') click event...
          call their respective formValidation object methods for real-time formValidation.

        All formValidation object methods are called by the $('form').submit event.

     displayFormErrMsg function:  

        Is called by the formValidation object methods.
          formValidation error objects are name after specific errors
             i.e., emailBlankErr, invalidEmailFormat
                these are tested for true or false
           displays appropriate errors under the appropriate input field or selector

      on Submit, a formValidation.inValidReqFields value is tested if 0,
         if not 0, the form is not submitted and the errors are displayed.

      for this project, the submit action of the form simply resets the form.

# Basic Info

    Entire form, all input fields, t-shirt color drop-down menu choices,
        including the 'other-title' job role input field,
        are available and/or displayed when JavaScript is disabled.

    1:  Name input field, gets focus when the page first loads

        form validation:
              on submit, verifies name input is not blank
              brown text error msg appears when name input is blank

    2:  Email input field

        form validation:
              on submit, email format is verified to contain all three sections
                alias@somedomain.com, org, edu, etc..
              a brown text error message appears if email input is blank or is not properly formatted

        exceeds:  
              conditional error messages:
              on submit,
              a 'blank' error msg appears when email input in blank
              an 'oops, invalid format' error msg appears when the email input is not properly formatted
              the conditional error messages

              real-time error message, as the user types in the email input field
              a "checking for valid email address format" appears
              the error goes away once the email input is valid

    3:  Job Role Selection

        when selecting 'other' job role, an input field with id of 'other-title' appears
        the 'other-title' input field disappears when another job-role is selected
        the 'other-title' input field is present when JavaScript is disabled

# T-Shirt selection

        when selecting t-shirt design and color,
           shows only the t-shirt colors available with that design theme

        the option 'Select Theme' is disabled
           so it serves only as a label, and is not selectable

        all t-shirt colors are available when JavaScript is disabled

        form validation:
              on submit, an error appears when
                no t-shirt size, design theme or color is selected

        exceeds:  hidden drop-down menu
                  the t-shirt color drop down menu appears only when...
                    a t-shirt design theme is selected

# Activities

        a total cost, 'Total: $600', of selected activities
           appears at the bottom of this section.
           the 'Total' is updated as activities are selected or deselected

        As activities are selected,
            activities with conflicting schedules are
              'disabled', greyed out and not selectable.

        form validation:
                on submit, an error appears when no activities are selected


# Payment Info

        when the page loads
           the credit-card payment type is selected
            and the credit-card input fields and Expiration date drop menu appear,

        as other payment options are chosen, only that payment type is displayed

        form validation:
                on submit,

                credit-card number is verified to be between 13 to 16 digits, numbers only

                zip-code is verified to be 5 digits and numbers only

                cvv is verified to be 3 digits and numbers only

                if above input requirements are not met
                   a brown text error appear directly under each field

# Exceeds:

      1: T-Shirt hidden drop-down menu

        the t-shirt color drop down menu appears only when a t-shirt design theme is selected

      2: Condition Error messages

        the email input fields gets 2 different conditional error messages
        a 'Oops, please, fill in your email address' error msg appears when email input in blank
        an 'invalid format' error msg appears when the email is not properly formatted

      3: Real-Time error messages

        as the user types in the email field
          a message appears, "checking for correctly formatted email address"
