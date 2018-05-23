$(document).ready(function() {

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
  blankOption.value = " ";
  blankOption.textContent = "<--- Please select a theme";
  blankOptGrp.append(blankOption);

  // move shirt options under respective opt groups
  $('#color').children().each(function(i){

        if ($(this)[0].textContent.includes('JS Puns')) {
          let optionValue = $(this)[0].value;
          $(this)[0].textContent = optionValue;
          jsPunsOptGrp.append($(this)[0]);
          // $(this).remove('*');
        }
        if ($(this)[0].textContent.includes('JS shirt only')){
          let optionValue = $(this)[0].value;
          $(this)[0].textContent = optionValue;
          jsShirtOnlyOptGrp.append($(this)[0]);
          // $(this).remove('*');
        }
    }); // end $()each

  // add ONLY the blank option opt Group
  $colorOptions.append(blankOptGrp);

  // functon to put focus on the first form field, name, input field
  const focusOnFirstField = function($node) {
    $node.focus();
  }; // end focusOnFirstField function

  // function to add shirt color optGroups to #color <select> element
  // if matching shirt theme is selected
  // triggered by change on design <select> element
  const displayColorOptGroups = function($node, shirtThemeOption){

    let optFlag = "";
    if (shirtThemeOption){
      optFlag = shirtThemeOption;
    }

    if (optFlag === 'js puns'){
          $('#color optgroup').remove();
          $('#color option').remove();
          $node.append(jsPunsOptGrp.children);

    } else if (optFlag === 'heart js'){
          $('#color optgroup').remove();
          $('#color option').remove();
          $node.append(jsShirtOnlyOptGrp.children);
    }

  }; // end addColorOptGroups function

  // if Job Title changed to 'other' display other Job Role input field
  $('#title').change(function() {

    if ($(this).val() === 'other') {
      document.getElementById('title').parentNode.append(otherJobRoleInput);
    }

  });  // end job title addEventListener

  // display only shirt colors that go with Shirt design theme
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

  focusOnFirstField($nameInput);


});
