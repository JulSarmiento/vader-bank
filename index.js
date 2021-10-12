// buttons
const signInBtn = document.getElementById('signin');
const logIn = document.getElementById('login');
const deleteBtn = document.getElementById('delete');
// const TRANSFER = document.getElementById('transfer');

// tags for print the information
const BALANACE = document.getElementById('balance');
const TRANSACTIONS = document.getElementById('transactions');
const USER_NAME = document.getElementById('user-name');

// Money formater
const OPTION = {style : 'currency', currency: 'COP'}; 
const MONEY_FORMAT = new Intl.NumberFormat('es-CO', OPTION); 
  

function deleteU(){
  const userToFind = prompt('Ingrese el numero de cedula:')

  if(userToFind === null || !userToFind){
    return
  }

  UserFactory.deleteUser(userToFind)
  console.log(UserFactory.users);
}

function loginUser(){
  const askDni = parseInt(prompt('Ingrese su dni:'));
  const askPassword = prompt('Ingrse su contraseña:');

  if(!askDni || !askPassword){
    return
  } 
  
  AuthFactory.login(askDni, askPassword);
 }

// // Button's events
window.addEventListener('load', () => {
  signInBtn.addEventListener('click', UserFactory.addNewUser);
  logIn.addEventListener('click', loginUser);
  deleteBtn.addEventListener('click', deleteU );
  // TRANSFER.addEventListener('click', transaction);
} )






