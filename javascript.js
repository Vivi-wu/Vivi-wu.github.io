function uploadFiles() {
  var inputElement = document.getElementById("atchfile");
  var filesToUpload = document.getElementById("filesToUpload");
  var txt = "";

  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    var fileList = this.files;
    var l = fileList.length;
    if (l) {
      for (var i = 0; i < l; i++) {
        txt += "<div class='outerbox'><span></span>" + fileList[i].name + "</div>";
      }
      filesToUpload.style.display = "block";
      filesToUpload.innerHTML = txt;
    }
    else {
      // filesToUpload.style.display = "none";
      return false;
    }
  }
}
/* 
  Safari not support H5 form validation (input required attribut)
  This function will be ignored by Chorme and Firefox
*/
function checkRequiredInput() {
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
  // Support is required
  var checkboxList = document.querySelectorAll("#ast-checkbox [type='checkbox']:checked")
  if (!checkboxList.length) {
    alert("Please select at least one required Assistance.");
    return false;
  }
}

function validateForm() {
  document.getElementById("brief-form").addEventListener("submit", checkRequiredInput);
}

window.onload = function() {
  uploadFiles();
  validateForm();
};
