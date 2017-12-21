function changeName(fromLocalStorage) {
  var name;
  if (fromLocalStorage) {
    if (null != localStorage.getItem('signatureName')) {
      name = localStorage.getItem('signatureName');
    } else {
      name = "Benoît Charles-Lavauzelle";
    }
    document.querySelector('input[name=name]').value = name;
  } else {
    name = document.querySelector('input[name=name]').value;
  }
  document.getElementById('signatureName').innerHTML = name;
  localStorage.setItem("signatureName", name);
}
function changeJob(fromLocalStorage) {
  var job;
  if (fromLocalStorage) {
    if (null != localStorage.getItem('signatureJob')) {
      job = localStorage.getItem('signatureJob');
    } else {
      job = "Cofounder";
    }
    document.querySelector('select[name=job]').value = job;
  } else {
    var e = document.querySelector('select[name=job]');
    job = e.options[e.selectedIndex].text;
  }
  document.getElementById('signatureJob').innerHTML = job;
  localStorage.setItem("signatureJob", job);
}
function hideCountry() {
  document.querySelector("#signatureFrTelGroup .country").style.display = "none"
  document.querySelector("#signatureUkTelGroup .country").style.display = "none"
  document.querySelector("#signatureMarocTelGroup .country").style.display = "none"
}

function formatTel(telNoSpace) {
  var formattedInput = '';
  for(var i = 0; i<telNoSpace.length; i++) {
    if((i % 2) === 1) {
      formattedInput += ' ';
    }
    formattedInput += telNoSpace.charAt(i);
  }
  return formattedInput;
}

function changeTel(fromLocalStorage) {
  var userInputFr, userInputUk, userInputMaroc;
  if (fromLocalStorage) {
    if (null != localStorage.getItem('signatureFrTel')) {
      userInputFr = localStorage.getItem('signatureFrTel');
    } else {
      userInputFr = "678901234";
    }
    if (null != localStorage.getItem('signatureUkTel')) {
      userInputUk = localStorage.getItem('signatureUkTel');
    } else {
      userInputUk = "";
    }
    if (null != localStorage.getItem('signatureMarocTel')) {
      userInputMaroc = localStorage.getItem('signatureMarocTel');
    } else {
      userInputMaroc = "";
    }
  } else {
    userInputFr = document.querySelector('input[name=frTel]').value;
    userInputMaroc = document.querySelector('input[name=marocTel]').value;
    userInputUk = document.querySelector('input[name=ukTel]').value;
  }


  var countries  = [];

  // french tel
  var frTelNoSpace = userInputFr.replace(/\D/g, '');
  localStorage.setItem('signatureFrTel', frTelNoSpace);
  var formattedInputFr = formatTel(frTelNoSpace);
  document.querySelector('input[name=frTel]').value = formattedInputFr;
  document.getElementById('signatureFrTel').innerHTML = '+33 ' + formattedInputFr;
  document.getElementById('signatureFrTel').setAttribute("href", "tel:+33" + frTelNoSpace);
  if (formattedInputFr.length > 0) {
    document.getElementById("signatureFrTelGroup").style.display = "block";
    countries.push('#signatureFrTelGroup');
  } else {
    document.getElementById("signatureFrTelGroup").style.display = "none";
  }

  // maroc tel
  var marocTelNoSpace = userInputMaroc.replace(/\D/g, '');
  localStorage.setItem('signatureMarocTel', marocTelNoSpace);
  var formattedInputMaroc = formatTel(marocTelNoSpace);
  document.querySelector('input[name=marocTel]').value = formattedInputMaroc;
  document.getElementById('signatureMarocTel').innerHTML = '+212 ' + formattedInputMaroc;
  document.getElementById('signatureMarocTel').setAttribute("href", "tel:+212" + marocTelNoSpace);
  if (formattedInputMaroc.length > 0) {
    document.getElementById("signatureMarocTelGroup").style.display = "block";
    countries.push('#signatureMarocTelGroup');
  } else {
    document.getElementById("signatureMarocTelGroup").style.display = "none";
  }

  // uk tel
  var ukTelNoSpace = userInputUk.replace(/\D/g, '');
  localStorage.setItem('signatureUkTel', ukTelNoSpace);
  document.querySelector('input[name=ukTel]').value = userInputUk;
  document.getElementById('signatureUkTel').innerHTML = '+44 ' + userInputUk;
  document.getElementById('signatureUkTel').setAttribute("href", "tel:+44" + ukTelNoSpace);
  if (ukTelNoSpace.length > 0) {
    document.getElementById("signatureUkTelGroup").style.display = "block";
    countries.push('#signatureUkTelGroup');
  } else {
    document.getElementById("signatureUkTelGroup").style.display = "none";
  }

  if (countries.length <= 1) {
    hideCountry();
  }

  if (countries.length > 1) {
    hideCountry();
    for (c in countries) {
      var country = countries[c];
      document.querySelector(country + ' .country').style.display = "initial";
    }
  }
}

function displayCode() {
  var code = document.getElementById("signature").innerHTML;
  code = code.replace(/&/g, '&amp;');
  code = code.replace(/</g, '&lt;');
  code = code.replace(/>/g, '&gt;');
  document.getElementById("signatureCode").innerHTML = code;
}

function selectContent(elId) {
  var el = document.getElementById(elId);
  var body = document.body, range, sel;
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(el);
    } catch (e) {
      range.selectNode(el);
    }
    sel.addRange(range);
    document.execCommand("copy");
  } else if (body.createTextRange) {
    range = body.createTextRange();
    range.moveToElementText(el);
    range.select();
    range.execCommand("Copy");
  }
}

// init values
changeName(true);
changeJob(true);
changeTel(true);