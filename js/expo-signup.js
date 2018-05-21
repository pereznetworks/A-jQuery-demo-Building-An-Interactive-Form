$(document).ready(function() {

  const focusOnFirstField = function() {

    document.getElementById("name").focus();
  };


  document.getElementById('title').addEventListener("change", function() {

    const otherJobRoleInput = document.createElement("input");
    otherJobRoleInput.type = "text";
    otherJobRoleInput.id = "other-title";
    otherJobRoleInput.placeholder = "Your Job Role";

    if ($(this).val() === 'other') {
      document.getElementById('title').parentNode.append(otherJobRoleInput);
    }
  });

  focusOnFirstField();

});
