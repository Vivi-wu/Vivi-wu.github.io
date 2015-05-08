function uploadFiles() {
  var inputElement = document.getElementById("inputFile");
  var filesToUpload = document.getElementById("filesToUpload");
  var txt = "";
  var nBytes = 0;

  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    var fileList = this.files;
    var l = fileList.length;
    if (l) {
      for (var i = 0; i < l; i++) {
        txt += "<div class='outerbox'><span></span>" + fileList[i].name + "</div>";
        nBytes += fileList[i].size;
      }
      filesToUpload.style.display = "block";
      filesToUpload.innerHTML = txt;
    }
    else {
      // filesToUpload.style.display = "none";
      return false;
    }

    /* limit upload file size, Byte to MB */
    var nApprox = nBytes / (1024*1024);
    if (nApprox > 10) {
      alert("Files size is too big.");
    }
  }
}

/* 
  Safari dose not support H5 form validation (input required attribut)
  While uName, uEmail and pName check will be ignored by Chorme and Firefox
*/
function checkRequiredInput(event) {
  var uName, uEmail, pName, checkboxList;
  // Client Name is required
  uName = document.getElementById("usrname").value;
  if (uName === null || uName === "") {
    // returning false here won't be executed and the form will be submitted
    event.preventDefault();
    alert("Your name is REQUIRED.");
    return false;
  }

  // Contact(email) is required
  uEmail = document.getElementById("usrmail").value;
  if (uEmail === null || uEmail === "") {
    event.preventDefault();
    alert("Your email is REQUIRED.");
    return false;
  }

  // Project name is required
  pName = document.getElementById("prjname").value;
  if (pName === null || pName === "") {
    event.preventDefault();
    alert("Project name is REQUIRED.");
    return false;
  }

  // Support is required
  checkboxList = document.querySelectorAll("#ast-checkbox [type='checkbox']:checked")
  if (!checkboxList.length) {
    event.preventDefault();
    alert("Please select at least one required Assistance.");
    return false;
  }
}

function validateForm() {
  document.getElementById("brief-form").addEventListener("submit", checkRequiredInput, false);
}

window.onload = function() {
  uploadFiles();
  validateForm();
};
