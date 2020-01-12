var arr = [];
var mailflag = 0;
var mobileflag = 0;

function createtable() {
  var x = document.getElementsByClassName('entries');
  let y = [];
  for (let i = 0; i < x.length; i++) {
    y.push(x[i].value);
  }
  let z = y.filter(function (i) {
    return i != "";
  });
  console.log(z.length == y.length);
  if (z.length == y.length && mobileflag && mailflag) {
    var flag = 0;
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == x[0].value) {
          arr[i].name = x[1].value;
          arr[i].mobile = x[2].value;
          arr[i].email = x[3].value;
          flag = 1;
        }
      }
      if (flag == 0) {
        arr.push({
          id: x[0].value,
          name: x[1].value,
          mobile: x[2].value,
          email: x[3].value
        });
      }
    } else {
      arr.push({
        id: x[0].value,
        name: x[1].value,
        mobile: x[2].value,
        email: x[3].value
      });
    }
    var txt = "<h1>Employee details</h1><table id=\"dtable\" class=\"details\"><thead><th>Emp ID</th><th>Name</th><th>Email</th><th>Mobile</th><th>Action</th></thead>";
    for (let i = 0; i < arr.length; i++) {
      txt += "<tr id=\"dtable_row" + i + "\"><td  id=\"dtable_no" + i + "\">" + arr[i].id + "</td><td  id=\"dtable_name" + i + "\">" + arr[i].name + "</td><td  id=\"dtable_mob" + i + "\">" + arr[i].mobile + "</td><td  id=\"dtable_mail" + i + "\">" + arr[i].email + "</td>"
      txt += "<td align=\"center\"><button id=\"editBtn" + i + "\" type=\"button\" onclick=\"updateEntry(" + i + ")\"><i class=\"far fa-edit\"></i></button><button id=\"saveBtn" + i + "\" type=\"button\" style=\"display:none;\" onclick=\"saveEntry(" + i + ")\"><i class=\"far fa-save\"></i></button><button id=\"deleteBtn" + i + "\" type=\"button\" onclick=\"deleteEntry(this," + i + ")\"><i class=\"far fa-trash-alt\"></i></button></td></tr>"
    }
    txt += "</table>"
    document.getElementById("details").innerHTML = txt;
    document.getElementById('details').style.display = "block";
    resetFunction();

  } else {
    document.getElementById('allfield').style.display = "";
  }
}

function resetFunction() {
  document.getElementById("detailsform").reset();
  document.getElementById('allfield').style.display = "none";
  document.getElementById('mobsuccess').style.display = "none";
  document.getElementById('mobfailure').style.display = "none";
  document.getElementById('mailsuccess').style.display = "none";
  document.getElementById('mailfailure').style.display = "none";
}

function searchFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dtable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      var cell = td[j];
      if (cell) {
        txtValue = cell.textContent || cell.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } else {
          tr[i].style.display = "none";
        }
      }
    }

  }
}

function updateEntry(no) {
  document.getElementById('editBtn' + no).style.display = 'none';
  document.getElementById('saveBtn' + no).style.display = '';

  var empid = document.getElementById('dtable_no' + no);
  var name = document.getElementById('dtable_name' + no);
  var mobile = document.getElementById('dtable_mob' + no);
  var email = document.getElementById('dtable_mail' + no);

  var empid_data = empid.innerHTML;
  var name_data = name.innerHTML;
  var mobile_data = mobile.innerHTML;
  var email_data = email.innerHTML;

  empid.innerHTML = "<input type='text' id=\"entryno" + no + "\" value=\"" + empid_data + "\">";
  name.innerHTML = "<input type='text' id=\"entryname" + no + "\" value=\"" + name_data + "\">";
  mobile.innerHTML = "<input type='text' id=\"entrymob" + no + "\" value=\"" + mobile_data + "\">";
  email.innerHTML = "<input type='text' id=\"entrymail" + no + "\" value=\"" + email_data + "\">";

}

function saveEntry(no) {
  var empid_data = document.getElementById('entryno' + no).value;
  var name_data = document.getElementById('entryname' + no).value;
  var mobile_data = document.getElementById('entrymob' + no).value;
  var email_data = document.getElementById('entrymail' + no).value;

  arr[no].id = empid_data;
  arr[no].name = name_data;
  arr[no].mobile = mobile_data;
  arr[no].email = email_data;
  console.log(empid_data + name_data);

  document.getElementById('dtable_no' + no).innerHTML = empid_data;
  document.getElementById('dtable_name' + no).innerHTML = name_data;
  document.getElementById('dtable_mob' + no).innerHTML = mobile_data;
  document.getElementById('dtable_mail' + no).innerHTML = email_data;

  document.getElementById('saveBtn' + no).style.display = 'none';
  document.getElementById('editBtn' + no).style.display = 'inline';
}

function deleteEntry(r, no) {
  // document.getElementById("dtable_row" + no).outerHTML = "";
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("dtable").deleteRow(i);
  arr.splice(no, 1);
  let x = document.getElementById('details')
  let tbodyLength = x.getElementsByTagName('tbody')
  if (tbodyLength[0].childNodes.length == 0) {
    document.getElementById('details').style.display = 'none';
  }

}

function emailValidation(mailid) {
  if (mailid.match(/^\w+([\.-]?\w+)*@\w+\.\w{2,3}$/)) {
    console.log("Mail Vaild");
    document.getElementById('mailsuccess').style.display = "";
    document.getElementById('mailfailure').style.display = "none";
    mailflag = 1;
  } else {
    document.getElementById('mailsuccess').style.display = "none";
    document.getElementById('mailfailure').style.display = "";
    mailflag = 0;
  }
}

function mobValidation(mobno) {
  if (mobno.match(/^([+]?91[.-\s]?)?\d{10}$/)) {
    console.log("Mobile Vaild");
    document.getElementById('mobsuccess').style.display = "";
    document.getElementById('mobfailure').style.display = "none";
    mobileflag = 1;
  } else {
    document.getElementById('mobsuccess').style.display = "none";
    document.getElementById('mobfailure').style.display = "";
    mobileflag = 0;
  }
}