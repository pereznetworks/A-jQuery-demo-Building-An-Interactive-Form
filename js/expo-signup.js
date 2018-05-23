$(document).ready(function() {

// CONSTANT VALUES ------------------------------

  // build other Job Role input field
  const otherJobRoleInput = document.createElement("input");
  otherJobRoleInput.type = "text";
  otherJobRoleInput.id = "other-title";
  otherJobRoleInput.placeholder = "Your Job Role";

  // select options, #color
  const $colorOptions = $('#color');

  // first input field, #name
  const $nameInput = $('#name');

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

// FUNCTIONS -----------------------------------

  // move shirt options under respective opt groups
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

  // function to put focus on the first form field, name, input field
  const focusOnFirstField = function($node) {
    $node.focus();
  }; // end focusOnFirstField function

  // function to add shirt color optGroups to #color <select> element
  // if matching shirt theme is selected
  // triggered by change on design <select> element
  const displayColorOptGroups = function($node, shirtThemeOption){

    // getting shirt theme that was selected
    let optFlag = "";
    if (shirtThemeOption){
      optFlag = shirtThemeOption;
    }

    // making sure shirt color options are stored in matching optgroup
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
    if (optFlag === 'js puns'){
          $node.append(jsPunsOptGrp.children);
    } else if (optFlag === 'heart js'){
          $node.append(jsShirtOnlyOptGrp.children);
    }

  }; // end addColorOptGroups function

// EVENT LISTENERS ----------------------------

  // event listener for
    // if Job Title changed to 'other' display other Job Role input field
  $('#title').change(function() {

    if ($(this).val() === 'other') {
      document.getElementById('title').parentNode.append(otherJobRoleInput);
    }

  });  // end job title addEventListener

  // event listener for
    // displaying only shirt colors that go with Shirt design theme
  $('#design').change(function() {

    $('#design option:selected').each(function(){
      if ($(this).val() === 'heart js') {
        displayColorOptGroups( $colorOptions, $(this).val() );
      }  // end if ('heart js')

      if ($(this).val() === 'js puns') {
        displayColorOptGroups( $colorOptions, $(this).val() );
      }  // end if ('js puns')
    });

  }) // end shirt design addEventListener

// FUNCTION CALLS

  // move Shirt Color Option Elements to and store in optgroup html nodes
    getOptElements();

  // display ONLY the blank option opt Group
    $colorOptions.append(blankOptGrp.children);

  // set focus on first element field
    focusOnFirstField($nameInput);


});
