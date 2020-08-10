// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBL6YJVE6Pg6gABRWUL2g12iMDSxIld1EY",
  authDomain: "innocent-ingabire---portfolio.firebaseapp.com",
  databaseURL: "https://innocent-ingabire---portfolio.firebaseio.com",
  projectId: "innocent-ingabire---portfolio",
  storageBucket: "innocent-ingabire---portfolio.appspot.com",
  messagingSenderId: "583842392187",
  appId: "1:583842392187:web:2c9389562ce0f69a651ade",
  measurementId: "G-4YZ43XFW66",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const signIn = document.getElementById("sign-in");

const auth = firebase.auth();

const signInWithEmailFunction = () => {
  const username = usernameField.value;
  const password = passwordField.value;

  //Built in firebase function responsible for authentication
  auth
    .signInWithEmailAndPassword(username, password)
    .then(() => {
      window.location = "./../Admin-Manageblogs/index.html";
      console.log("You're successfully signed in !");
    })
    .catch((error) => {
      console.error(error);
    });
};

signIn.addEventListener("click", signInWithEmailFunction);
