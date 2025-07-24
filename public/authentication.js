const users = [
  { username: "buyer", password: "1234", role: "buyer" },
  { username: "seller", password: "1234", role: "seller" }
];

const getElement =(elem)=> document.querySelector(elem);

const form = getElement('#loginForm');
const error = getElement('#error');

form.addEventListener('submit', function (e) {
  e.preventDefault();


  const username = getElement('#username').value.trim();
  const password = getElement('#password').value.trim();
console.log("Username input:", username);
console.log("Password input:", password);
  const user = users.find((u) => u.username == username && u.password == password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "buyer") {
      window.location.href = "/index.html";

    } else if (user.role === "seller") {
      window.location.href = "../pages/sellerPage.html";
   //   alert('seller');
    }
  } else {
    error.textContent = "Invalid username or password";
  }

});

