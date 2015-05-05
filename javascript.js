/* 
  Safari not support H5 form validation (input required attribut)
  This function will be ignored by Chorme and Firefox
*/
function formValidation() {
  var uName, uEmail, pName;
  // Client Name is required
  uName = document.getElementById("usrname").value;
  if (uName === null || uName === "") {
    alert("Your name is REQUIRED.");
    return false;
  }
  // Contact(email) is required
  uEmail = document.getElementById("usrmail").value;
  if (uEmail === null || uEmail === "") {
    alert("Your email is REQUIRED.");
    return false;
  }
  // Project name is required
  pName = document.getElementById("prjname").value;
  if (pName === null || pName === "") {
    alert("Project name is REQUIRED.");
    return false;
  }
}

window.onload = function() {
  document.getElementById("brief-form").onsubmit = function() {
    formValidation();
    // Support is required
    var checkboxList = document.querySelectorAll("#ast-checkbox [type='checkbox']:checked")
    if (!checkboxList.length) {
      alert("Please select at least one required Assistance.");
      return false;
    }
  };
};
