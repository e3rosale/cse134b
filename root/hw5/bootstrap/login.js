var registered_users = localStorage;
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var db = firebase.firestore();

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
      firebase.auth().signInWithEmailAndPassword(login_email, login_password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
      registered_users.setItem("current_user", login_email);
      // print out all of the contents from firestore
      var docRef = db.collection("cities").doc("SF");

      docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
      window.location.replace("https://hw2-cse134b-3ffd9.firebaseapp.com/hw5/bootstrap/dashboardBootstrap.html");
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
