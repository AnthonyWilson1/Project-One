
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdTZeeAEZWsCZdVRULlWzKHF62JF7l6K8",
    authDomain: "project1-383c1.firebaseapp.com",
    databaseURL: "https://project1-383c1.firebaseio.com",
    projectId: "project1-383c1",
    storageBucket: "",
    messagingSenderId: "178533881009"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
 

  $("#login-button").on("click", function() {
    event.preventDefault()
var email = $("#email-login").val()
var password = $("#password-login").val()
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  }
  if (errorCode === 'auth/wrong-email') {
    alert('Wrong Email')
  
  } else {
    alert(errorMessage);
  }
  console.log(error);
  // ...
});

})


$("#register-button").on("click", function(){

event.preventDefault()
var username = $("#username-register").val()
var email = $("#email-register").val()
var password = $("#password-register").val()
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
})
$("#button-logout").on("click", function() {


  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
})
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var logoutButton = $("#button-logout")
var loginButton = $("#button-login")
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("signed in")
      $("#id01").hide()
      loginButton.hide()
      logoutButton.show() 
      var userId = user.uid 
      var userEmail = user.email
      var example = $("#test-input").val()
 
      
     
      $("#selectTab").on("change", function() {
        console.log("I got here!");
        event.preventDefault()
        example=$("#example").val()                      
        database.ref("user").child(userId).set({
          user: userId, 
          state: "CAli",
          choice: example,
          email: userEmail,
        })

     
      //  database.ref().push({
      //   userID: {
      //    example: example
      //   }
    
    }) 
    
    database.ref("user").child(user.uid).on("value", function(snapshot){
      console.log(snapshot.val())
      $("#example-output").text(snapshot.val().choice)
      $("#example-output").show()
    })
    } else {
      console.log("signed out")
      logoutButton.hide()
      loginButton.show()
      $("#example-output").hide()
    }
  });
 
  // var firebaseExample = database.ref("user").child(user.uid)
  // firebaseExample.on("child_added", function(snapshot){
  //   console.log(snapshot.val())
  //   $("#example-output").text(snapshot.val())
  // })



