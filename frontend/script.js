
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const upbutton = document.getElementById('upbutton');
const inbutton = document.getElementById('inbutton');
const container = document.getElementById('container');

signUpButton.addEventListener('click', async () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', async () => {
  container.classList.remove('right-panel-active');
});

upbutton.addEventListener('click', async (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const data = {
    name,
    email,
    password
  }

  // Example: Sending a signup request to the server
  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });

  console.log(response);
});




console.log('Button:', inbutton);
inbutton.addEventListener('click', (event) => {
   // Redirect to a new page after successful login
   window.location.href = "home/Homepage.html";
});
  


  document.addEventListener('DOMContentLoaded', function () {
    // Function to validate password
    function validatePassword(password) {
        // Minimum length of 8 characters
        if (password.length < 8) {
            return false;
        }

        // Check if the password contains at least one special character
        var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacters.test(password)) {
            return false;
        }

        // Password is valid
        return true;
    }

    // Sign Up button click event
    document.getElementById('upbutton').addEventListener('click', function (event) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Validate password
        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long and contain special characters.');
            event.preventDefault(); // Prevent form submission
        }

        // Additional sign-up logic here
    });

    // Sign In button click event
    document.getElementById('inbutton').addEventListener('click', function (event) {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Additional sign-in logic here
    });

    // Toggle between Sign Up and Sign In panels
    document.getElementById('signIn').addEventListener('click', function () {
        document.getElementById('container').classList.remove('sign-up-mode');
    });

    document.getElementById('signUp').addEventListener('click', function () {
        document.getElementById('container').classList.add('sign-up-mode');
    });
});

async function signIn() {
   const email = document.getElementById("email").value;
   const password = document.getElementById("signInPassword").value;

   try {
      const response = await fetch('http://localhost:3000/api/signin', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
         // Authentication successful, check for the token
         if (data.token) {
            // Redirect to homepage or perform other actions
            window.location.href = "http://127.0.0.1:5500/home/Homepage.html";
         } else {
            // Handle the case where the token is not present
            console.error('Token not received');
         }
      } else {
         // Authentication failed, show error message
         alert('Credentials not found. Please check your email and password.');
      }
   } catch (error) {
      console.error('Error during sign in:', error);
   }
}
