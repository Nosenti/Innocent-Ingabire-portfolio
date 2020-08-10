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

var geolocationRef = firebase.database().ref("geolocation");
if ("geolocation" in navigator) {
  // check if geolocation is supported/enabled on current browser

  navigator.geolocation.getCurrentPosition(
    function success(position) {
      // for when getting location is a success
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var loc = confirm("This site wants to know your location");
      if (loc == true) {
        var autoID = geolocationRef.push().key;
        geolocationRef.child(autoID).set({
          latitude: latitude,
          longitude: longitude,
        });
        console.log("latitude", latitude, "longitude", longitude);
      } else {
        console.log("Location access denied");
      }
    },
    function error(error_message) {
      // for when getting location results in an error
      console.error(
        "An error has occured while retrieving location",
        error_message
      );
    }
  );
} else {
  // geolocation is not supported
  // get your location some other way
  console.log("geolocation is not enabled on this browser");
}

// window.onload = function (latitude, longitude) {
//   var autoID = geolocationRef.push().key;
//   geolocationRef.child(autoID).set({
//     latitude: latitude,
//     longitude: longitude,
//   });
// };
// function saveLocation(longitude, latitude) {

//   return longitude;
// }
