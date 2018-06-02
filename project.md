# PROJECT 3 REQUIREMENTS

# DONE : Set focus on the first text field

	•	When the page loads, give focus to the first text field
 
		# ”Job Role” section of the form:

	•	Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
	•	Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
 
# DONE : ”T-Shirt Info” section of the form:

	•	For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
	•	If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
	•	If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
 
# DONE : ”Register for Activities” section of the form:

	•	Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
	•	When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
	•	As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
 
# TODO : Payment Info section of the form:

	•	Display payment sections based on the payment option chosen in the select menu.
	•	The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
	•	When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
	•	When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
		NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.  
		# Form validation:

	•	If any of the following validation errors exist, prevent the user from submitting the form:
	•	Name field can't be blank.
	•	Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
	•	User must select at least one checkbox under the "Register for Activities" section of the form.
	•	If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
	•	Credit Card field should only accept a number between 13 and 16 digits.
	•	The Zip Code field should accept a 5-digit number.
	•	The CVV should only accept a number that is exactly 3 digits long.
		NOTE: Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.  

# TODO : Form validation messages:

	•	Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or even better for the user would be if a red text message appeared near the field.
	•	The following fields should have some obvious form of an error indication:
	•	Name field
	•	Email field
	•	Register for Activities checkboxes (at least one must be selected)
	•	Credit Card number (Only if Credit Card payment method is selected)
	•	Zip Code (Only if Credit Card payment method is selected)
	•	CVV (Only if Credit Card payment method is selected)
 
		# When JavaScript is disabled or unavailable:
	•	The user should still have access to all form fields and payment information if JS isn't working for whatever reason. For example, the “Other” text field in the "Job Role" menu should be visible on the page when JavaScript is switched off, and all information for Bitcoin, PayPal or Credit Card payments should be visible.
 
		Before you submit your project for review:
	•	Make sure you can check off all of the items on the Student Project Submission Checklist. The checklist is designed to help you make sure you’ve met the grading requirements and that your project is complete and ready to be submitted!

# TODO : EXTRA CREDIT

To get an "exceeds" rating, you can expand on the project in the following ways:

# TODO : T Shirt Section

	•	Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
 
# TODO : Conditional Error Message

	•	Program at least one of your error messages so that more information is provided depending on the error. For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is between 13 and 16 digits long.”
 

# TODO : Real-time Error Messages

	•	Program your form so that it provides a real-time validation error message for at least one text input field. Rather than providing an error message on submit, your form should check for errors and display messages as the user begins typing inside a text field. For example, if the user enters an invalid email address, the error appears as the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address. You must accomplish this will your own JavaScript code. Do not rely on HTML5's built-in email validation.
		NOTE: If you implement the above exceeds requirements in your form, make sure you detail in your submission notes which input will have different error messages depending on the error, and which input will have "real time" validation messages, so your reviewer won't miss them by accident.  
