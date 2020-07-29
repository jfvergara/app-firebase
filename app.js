function registrar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('contrasena').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      verificar();
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function ingreso() {
    var email2 = document.getElementById('email2').value;
    var password2 = document.getElementById('contrasena2').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      console.log("User is active");
      aparece(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(emailVerified);
      // ...
    } else {
      // User is signed out.
      console.log("User is not active");
      // ...
    }
  });
}

observador();

function aparece(user) {
  var user = user;
  var contenido = document.getElementById('contenido');
  if(user.emailVerified){
    contenido.innerHTML = `
    <p>Welcome</p>
    <button onclick="cerrar()">Cerrar sesion</button>
    `;
  }
  
}

function cerrar() {
  firebase.auth().signOut().then(function() {
    console.log("Saliendo...");
    // Sign-out successful.
  }).catch(function(error) {
    console.log(error);
    // An error happened.
  });
}

function verificar() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("Enviando correo...");
  }).catch(function(error) {
    // An error happened.
    console.log(error);
});
}