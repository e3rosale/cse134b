var registered_users = localStorage;

function login_user() {
  var login_email = document.querySelector('#Email').value;
  var login_password = document.querySelector('#Password').value;
  if (login_email == "" || login_password == "") {
    alert("complete all form fields");
  } else {
    var email_registered = false;
    var password_matched = false;
    for (users in registered_users) {
      if (users != "current_user") {
        var retrieved_user_object = registered_users.getItem(users);
        var user = JSON.parse(retrieved_user_object);
        if (user.email == login_email) {
          email_registered = true;
          if(user.password == login_password)
            password_matched = true;
          break;
        }
      }
    }
    if (email_registered && password_matched) {
      registered_users.setItem("current_user", login_email);
      window.location.replace("https://hw2-cse134b-3ffd9.firebaseapp.com/hw4/bootstrap/dashboardBootstrap.html");
    } else if (email_registered && !password_matched) {
      alert("password is incorrect");
    } else {
      alert("email does not exist, please register");
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#login_button').addEventListener('click', function() {login_user();}, false);
}, false);
