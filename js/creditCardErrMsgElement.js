
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

 //credit card, err msg div/pgh eleements are given set width and height
    CCerrInfoDiv.append(ccNumErrDiv);
    CCerrInfoDiv.append(zipErrDiv);
    CCerrInfoDiv.append(cvvErrDiv);

// add credit card err msg Div to html Page
document.getElementsByClassName('credit-card')[0].insertBefore(CCerrInfoDiv, document.getElementsByClassName('credit-card')[0].children[3] )

// simply have add textContent to err msg pgh elements that need it
  // for example
  $('cvv-ErrMsg')[0].textContent = 'invalid cvv'
  // can be used by itself, will appear directly underneath cvv input field

  $('zipCode-ErrMsg')[0].textContent = 'invalid cvv'
  // will appear directly underneath zipCode input field

  $('ccNum-ErrMsg')[0].textContent = 'invalid credit-card num'
  // will appear directly underneath credit-card num input field

  // can use any combination of the above statement, as needed
