
// used to track selected activiies, setting initial values
let selection = {};
selection.activity = 'no selected activity';

const selectedActivities = [];
// total amt of activities signing up for

let totalAmt = 0;
// build a legend element to display total
const total = document.createElement('legend');

total.id = "total";

// eventlistener for
  // activity labels
    //when an activity is selected, capture, filter out dollarAmt
      // and keep running total; add, subtract and display updated total as needed
        // ... more to do
$('.activities input').click(function(){

  // const values used to test if duplicate selected , (means already selected once, so deselected)
  let duplicate = false;
  let dupItemIndex = 0;

  // capture textContent of selected activities label element
  selection.activity = $(this)[0].parentNode.textContent;

  // get dollarAmt of activity from activity description
  const dollarAmtFilter = /\$\d+/;
  let dollarAmtString = selection.activity.match(dollarAmtFilter);
  let amtString = dollarAmtString[0].slice(1);
  let dollarAmt = parseInt(amtString);
  selection.cost = dollarAmt;

  // get day of week for activity selected
  const dayofWeekFilter = /day\B/;
  let dayString = selection.activity.match(dayofWeekFilter);
  selection.day = dayString;
  // get time period for activity selected
  const timeOfDayFilter = /m\B/;
  let timeOfDayString = selection.activity.match(timeOfDayFilter);
  selection.time = timeOfDayString;

  selectedActivities.forEach(function(item, index){
    if (selection.activity === item.activity) { // if duplicate, then..
      duplicate = true;       // set duplicate bolean to true
      dupItemIndex = index;   // save index of duplicate item
    }
  });

  // keep running total, based on selection
  // add and subtract as needed

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
