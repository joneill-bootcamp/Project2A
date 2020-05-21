$(document).ready(function () {
  // Getting references to our form and input
  const signUpForm = $("form.sign");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");
  // When the signup button is clicked, we validate the username and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.username || !userData.password) {
      return;
    }
    // If we have an username and password, run the signUpUser function
    signUpUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, password) {
    $.post("/api/signup", {
      username: username,
      password: password,
    })
      .then(function (data) {
        window.location.replace("/graph");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(`${err.statusText} action, this user exists already`);
    $("#alert").fadeIn(500);
  }
});
