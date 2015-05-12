var nFiles = []; // fileToUpload list
var nBytes = 0; // total size of attachments


function removeFile(elmnt) {
  var index = elmnt.getAttribute("data-file");

  // remove file from fileToUpload list
  for (var i = 0, l = nFiles.length; i < l; i++) {
    if (nFiles[i].name === index) {
      nBytes -= nFiles[i].size;
      nFiles.splice(i, 1);
      break;
    }
  }

  // remove file name tag from the view
  elmnt.parentNode.parentNode.removeChild(elmnt.parentNode);

  if (!nFiles.length) {document.getElementById("filesToUpload").style.display = "none";}
}


function checkSize() {
  var nApprox = nBytes / (1024 * 1024); // Convert Byte to MB
  if (nApprox > 10) {
    alert("Files' total size exceed the 10MB limit.");
    return false;
  }
}


function readFiles() {
  var filesToUpload = document.getElementById("filesToUpload");

  function handleFiles() {
    var fileList = this.files; // files is a FileList of File objects
    var l = fileList.length;
    var txt = "";

    if (l) {
      for (var i = 0; i < l; i++) {
        nFiles.push(fileList[i]);
        nBytes += fileList[i].size;
      }

      for (var j = 0, lth = nFiles.length; j < lth; j++) {
        txt += "<div class='outerbox'><span></span>" + nFiles[j].name + "<span data-file='" + nFiles[j].name + "' onclick='removeFile(this)'>X</span></div>";
      }
      filesToUpload.innerHTML = txt;
      filesToUpload.style.display = "block";
      checkSize();
    }
    else {
      return false;
    }
  }

  document.getElementById("inputFile").addEventListener("change", handleFiles, false);
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
    alert("Your email address is REQUIRED.");
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
    alert("Please select at least one: Consulting, UX/UI Design, Development or Marketing.");
    return false;
  }
}

function validateForm() {
  document.getElementById("brief-form").addEventListener("submit", checkRequiredInput, false);
}

window.onload = function() {
  /*
    iPhone & iPad don't support upload natively files(except Photos & Videos)
    to websites without an app
  */
  var usrAgent = navigator.userAgent.match(/iPhone|iPad/i)
  if (usrAgent) {document.getElementsByClassName("display-on-iPhone")[0].style.display = "inherit";}

  // Check for the various File API support
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    readFiles();
  } else {
    document.getElementsByClassName("display-on-iPhone")[0].style.display = "inherit";
  }
  validateForm();
};
