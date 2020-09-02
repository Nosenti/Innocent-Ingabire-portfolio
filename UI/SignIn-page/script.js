const BASE_URL = "https://mybrand-innocentingabire.herokuapp.com/api";

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const signIn = document.getElementById("sign-in");

const signInWithEmailFunction = () => {
  const username = usernameField.value;
  const password = passwordField.value;

  try {
    const credentials = {
      email: username,
      password: password,
    };
    axios.post(`${BASE_URL}/user/login`, credentials).then((res) => {
      localStorage.setItem("token", res.data.token);

      console.log(res.data.token);
      window.location.href = "./../Admin-Manageblogs/index.html";
    });
  } catch (error) {
    console.log(error);
  }
};

signIn.addEventListener("click", signInWithEmailFunction);
