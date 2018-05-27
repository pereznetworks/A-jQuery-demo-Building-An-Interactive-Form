$(document).ready(function() {

// CONSTANT VALUES ------------------------------

  // select input field, #name
  const $nameInput = $('#name');

  // select shirt color options, #color
  const $colorOptions = $('#color');

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

  // used to tracking selected activiies
  let selection = 'no selected activities';
  const selectedActivities = [];
  selectedActivities.push(selection);
  // total amt of activities signing up for
  let totalAmt = 0;
  // build a legend element to display total
  const total = document.createElement('legend');
  total.id = "total";

// FUNCTIONS -----------------------------------

  // function to put focus on the first form field, name, input field
  const focusOnFirstField = function($node) {
    $node.focus();
  }; // end focusOnFirstField function

  // function to move shirt colro options under 2 opt groups
  const getOptElements = function(){
    $('#color').children().each(function(i){

          if ($(this)[0].textContent.includes('JS Puns')) {
            let optionValue = $(this)[0].value;
            $(this)[0].class = 'js_puns';
            $(this)[0].textContent = optionValue;
            jsPunsOptGrp.append($(this)[0]);
            // $(this).remove('*');
          }
          if ($(this)[0].textContent.includes('JS shirt only')){
            let optionValue = $(this)[0].value;
            $(this)[0].class = 'js_shirt_only';
            $(this)[0].textContent = optionValue;
            jsShirtOnlyOptGrp.append($(this)[0]);
            // $(this).remove('*');
          }
      }); // end $()each

  };

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

// EVENT LISTENERS ----------------------------

  // event listener for other job title
    // if job title changed to 'other' display other Job Role input field
  $('#title').change(function() {
    if ($(this).val() === 'other') {
      document.getElementById('title').parentNode.append(otherJobRoleInput);
    }
  });  // end job title addEventListener

  // event listener for shirt design
    // displaying only shirt colors that go with Shirt design theme
  $('#design').change(function() {
    $('#design option:selected').each(function(){
      if ($(this).val() === 'heart js') {
        displayColorOptGroups( $colorOptions, $(this).val() );
      }  else if ($(this).val() === 'js puns') {
        displayColorOptGroups( $colorOptions, $(this).val() );
      }  else {
        displayColorOptGroups( $colorOptions, 'notheme' );
      }  // end if ('js puns')
    }); // end #design options
  }) // end shirt design addEventListener

  // eventlistener for
    // activity labels
      //when an activity is selected, capture, filter out dollarAmt
        // and keep running total; add, subtract and display updated total as needed
          // ... more to do
  $('.activities input').click(function(){

    // capture textContent of selected activities label element
    selection = $(this)[0].parentNode.textContent;

    // get dollarAmt of activity from activity description
    const dollarAmtFilter = /\$\d+/;
    let dollarAmtString = selection.match(dollarAmtFilter);
    let amtString = dollarAmtString[0].slice(1);
    let dollarAmt = parseInt(amtString);
    let duplicate = false;
    let dupItemIndex = 0;

    // simply keeping running total, based on selection
    // add and subtract as needed

    // test if duplicate, (means already selected once, so being deselected)
    selectedActivities.forEach(function(item, index){
      if (selection === item) { // if duplicate, then..
        duplicate = true;       // set duplicate bolean to true
        dupItemIndex = index;   // save index of duplicate item
      }
    });

    if (duplicate){ // if item being de-selected
        // subtract cost of activity from total
          totalAmt -= dollarAmt;
        // display updated total
          displayTotal(totalAmt);
        // remove item from array
          selectedActivities.splice(dupItemIndex);
      } else {  // else item is being selected
      // add activity to array
        selectedActivities.push(selection);
      // add cost of activity to total
        totalAmt += dollarAmt;
      // display updated total
        displayTotal(totalAmt);
      }

  }); // end activities label input eventlistener

// FUNCTION CALLS

  // move Shirt Color Option Elements to shirt color optgroups
    getOptElements();

  // display ONLY the blank option opt Group
    $colorOptions.append(blankOptGrp.children);

  // set focus on first element field
    focusOnFirstField($nameInput);

});

// TODO: TRACK and dsiable the activities whose schedule conflict,

// TODO: create JSON of entire expo sign up form
  // running totals as needed using objectarray
  // add object,
    // array with key/values:
      // num of activities
      // and total
  // add object,
      // array with key/values pair for each selected Activity
      // activity description
      // activity cost
