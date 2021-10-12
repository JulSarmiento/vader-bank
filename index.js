// buttons
const signInBtn = document.getElementById('signin');
const logInBtn = document.getElementById('login');
const logOutBtn = document.getElementById('logout');
const deleteBtn = document.getElementById('delete');
const transferBtn = document.getElementById('transfer');

// tags for print the information
const BALANACE = document.getElementById('balance');
const TRANSACTIONS = document.getElementById('transactions');
const USER_NAME = document.getElementById('user-name');

// Money formater
const OPTION = {style : 'currency', currency: 'COP'}; 
const MONEY_FORMAT = new Intl.NumberFormat('es-CO', OPTION); 
  
/**
 * This function validates before call the delete function in UserFactory Class
 */
function deleteU(){
  const userToFind = prompt('Ingrese el numero de cedula:')

  if(userToFind === null || !userToFind){
    return
  }

  UserFactory.deleteUser(userToFind)
  console.log(UserFactory.users);
}

/**
 * This function validates before call the login function in AuthFactory Class
 */
function loginUser(){
  const askDni = parseInt(prompt('Ingrese su dni:'));
  const askPassword = prompt('Ingrse su contraseña:');

  if(!askDni || !askPassword){
    return
  } 

  AuthFactory.login(askDni, askPassword);
 }

 /**
 * This function validates before call the logout function in AuthFactory Class
 */
 function logoutUser(){

  if(!loginUser){
    alert('No ha iniciado sesion.');
  } else{
    AuthFactory.logOut();
  
  }
 }


 function transaction(){

   const dniToTransfer = parseInt(prompt('Ingrese el DNI del usuario a transferir:'));
   const amount = parseInt(prompt('Ingrese el monto a transferir:'));

   if(!dniToTransfer || !amount){
     return
   } else{
    Transactions.transfer(dniToTransfer, amount);
   }

 }

// // Button's events
window.addEventListener('load', () => {
  signInBtn.addEventListener('click', UserFactory.addNewUser);
  logInBtn.addEventListener('click', loginUser);
  logOutBtn.addEventListener('click', logoutUser);
  deleteBtn.addEventListener('click', deleteU );
  transferBtn.addEventListener('click', transaction);
} )






