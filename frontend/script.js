

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const upbutton = document.getElementById('upbutton');
const container = document.getElementById('container');

signUpButton.addEventListener('click', async () => {
  container.classList.add('right-panel-active');
});

upbutton.addEventListener('click', async () => {
  let name =  document.getElementById("name").value
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const data = {
    name,
    email,
    password
  }
  console.log(data) 
  // Example: Sending a signup request to the server
  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {    
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(
      data
    ),    
})
console.log(response); }
);



signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});
